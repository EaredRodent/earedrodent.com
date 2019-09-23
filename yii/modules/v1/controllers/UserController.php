<?php
/**
 * Created by PhpStorm.
 * User: earedrodent
 * Date: 26.11.2018
 * Time: 14:44
 */

namespace app\modules\v1\controllers;

use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use \Yii;
use yii\web\ConflictHttpException;
use app\models\DBUser;
use yii\web\HttpException;
use yii\web\ServerErrorHttpException;
use app\classes\NuxtRestApiController;

/**
 * Class UserController
 * @package app\modules\v1\controllers
 */
class UserController extends NuxtRestApiController
{
    public $modelClass = 'app\modules\v1\models\DBUser';
    protected $modifiedTables = [
        'default' => [
            'auth_assignment',
            'user'
        ]
    ];
    protected $ignoreModifiedTables = ['bootstrap'];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'optional' => ['registration', 'login']
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['registration'],
                    'allow' => true,
                    'matchCallback' => function () {
                        if (array_key_exists('role', Yii::$app->request->post()) && !Yii::$app->user->can('API_V1_User_Create_RoleParamUsing')) {
                            return false;
                        }
                        return true;
                    },
                    'roles' => ['?', '@']
                ],
                [
                    'actions' => ['login'],
                    'allow' => true,
                    'roles' => ['?', '@']
                ],
                [
                    'actions' => ['bootstrap'],
                    'allow' => true,
                    'roles' => ['@']
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
        return $actions;
    }

    /**
     * @return array
     * @throws ConflictHttpException
     * @throws ServerErrorHttpException
     * @throws \Exception
     */
    public function actionRegistration()
    {
        // CHECK NONCE IS CORRECT ?
        $post = Yii::$app->request->post();

//        if (!DBUser::validateAccessTokenByNonce($post['accesstoken'], $post['nonce'])) {
//            throw new BadRequestHttpException('Bad nonce');
//        }

        // CHECK USER EXIST?
        if (DBUser::find()->where(['email' => $post['email']])->all()) {
            throw new ConflictHttpException('Already exists.');
        }

        // CREATE USER
        $user = new DBUser();
        $user->attributes = $post;
//        $user->accesstoken = hash('sha512', $post['accesstoken'] . $post['nonce']);
//        $user->accesstoken = $post['accesstoken'];
        $user->password = hash('sha512', $post['password']);
        $user->accesstoken = hash('sha512', $post['email'] . $post['password'] . 'Jf4PnVlXHUxGdcArpGfCZGxG8ANc0hzuQQyHUhsT');
        if (!$user->save()) {
            throw new ServerErrorHttpException('Model save.');
        }

        // SET ROLE

        $role = Yii::$app->authManager->getRole(isset($post['role']) ? $post['role'] : 'ROLE_User');
        if (!Yii::$app->authManager->assign($role, $user->id)) {
            throw new ServerErrorHttpException('Auth Manager.');
        }
        Yii::$app->response->statusCode = 201;

        $mixin = [
            'role' => $role->name
        ];
        $result = array_merge($user->attributes, $mixin);

        return $result;
    }

    /**
     * @throws ConflictHttpException
     */
    public function actionLogin()
    {
//        $post = Yii::$app->request->post();
        throw new HttpException(404, 'Wrong credentials.');
    }

    /**
     * @return array
     * @throws \Exception
     */
    public function actionBootstrap()
    {
        $userId = Yii::$app->getUser()->getId();
        $user = DBUser::findOne(['id' => $userId]);
        $am = Yii::$app->authManager;

        $roles = $am->getRolesByUser($userId);
        if (count($roles) > 1) {
            throw new ServerErrorHttpException("Roles > 1.");
        }
        $role = array_keys($roles)[0];

        $mixin = [
            'role' => $role,
            'permissions' => array_keys($am->getPermissionsByUser($userId)),
        ];
        return array_merge($user->attributes, $mixin);
    }

}