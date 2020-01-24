<?php


namespace app\modules\v1\controllers;


use app\modules\v1\models\SlsOrder;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class TestController extends ActiveController
{
    public $modelClass = '';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'optional' => ['get-orders']
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['get-orders'],
                    'allow' => true,
                    'roles' => ['?', '@']
                ]
            ]
        ];
        return $behaviors;
    }

    public function afterAction($action, $result)
    {
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie, Authorization');
        Yii::$app->response->headers->set('Access-Control-Allow-Credentials', 'true');
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Expose-Headers', 'Log-Dbcount, Log-Dbtime, Log-Apptime, Log-Appmemory');
        return parent::afterAction($action, $result);
    }

    public function actionGetOrders($offset, $limit)
    {
        return SlsOrder::find()->offset($offset)->limit($limit)->all();
    }
}
