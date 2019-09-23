<?php
/**
 * Created by PhpStorm.
 * User: earedrodent
 * Date: 13.12.2018
 * Time: 12:13
 */

namespace app\modules\v1\controllers;

use app\models\DBUser;
use yii\web\ServerErrorHttpException;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use Yii;
use app\classes\NuxtRestApiController;

class UserManagerController extends NuxtRestApiController
{
    public $modelClass = 'app\modules\v1\models\User';
    protected $modifiedTables = [
        'default' => [
            'auth_assignment',
            'user'
        ]
    ];
    protected $ignoreModifiedTables = ['browse-users'];

    /**
     * @return array
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className()
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'rules' => [[
                'actions' => ['browse-users', 'update', 'delete'],
                'allow' => true,
                'roles' => ['API_V1_UserManager']
            ]
            ]
        ];
        return $behaviors;
    }

    /**
     * @return array
     */
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['update']);
        unset($actions['delete']);
        return $actions;
    }

    /**
     * @param $action yii\data\ActiveDataProvider
     * @param $result
     * @return mixed
     * @throws ServerErrorHttpException
     */
    public function actionBrowseUsers()
    {
        $usersBefore = DBUser::find()->all();
        $usersAfter = [];
        $roles = array_keys(Yii::$app->authManager->getRoles());

        foreach ($usersBefore as $user) {
            $userRoles = Yii::$app->authManager->getRolesByUser($user->id);
            if (!is_array($userRoles) && !(sizeof($userRoles) === 1)) {
                throw new ServerErrorHttpException('Roles > 1, user id ' . $user->id . '.');
            }
            $usersAfter[] = array_merge($user->getAttributes(), ['role' => array_keys($userRoles)[0]]);
        }
        return ['users' => $usersAfter, 'existingRoles' => $roles];
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function actionUpdate()
    {
        $data = Yii::$app->request->post();
        $newRole = Yii::$app->authManager->getRole($data['role']);
        unset($data['role']);
        $id = Yii::$app->request->get('id');
        $user = DBUser::findOne(['id' => $id]);
        $user->attributes = $data;
        if (!($user->save() && Yii::$app->authManager->revokeAll($user->id) && Yii::$app->authManager->assign($newRole, $user->id))) {
            throw new ServerErrorHttpException('Update failed.');
        }

        return array_merge($user->attributes, ['role' => $newRole->name]);
    }

    /**
     * @throws \yii\db\StaleObjectException
     * @throws \Throwable
     */
    public function actionDelete()
    {
        $userId = Yii::$app->request->get('id');
        $userRoles = Yii::$app->authManager->getRolesByUser($userId);
        $userRole = array_pop($userRoles);
        $user = DBUser::findOne(['id' => $userId]);
        if (!($user->delete() && Yii::$app->authManager->revoke($userRole, $userId))) {
            throw new ServerErrorHttpException('Delete failed.');
        }
    }
}