<?php

namespace app\modules\v1\gii;

use Yii;

/**
 * This is the model class for table "log".
 *
 * @property string $username
 * @property string $password
 * @property string $requiredServer
 * @property string $status
 * @property string $ip
 */
class GiiLog extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username'], 'required'],
            [['status'], 'string'],
            [['username', 'password', 'requiredServer', 'ip'], 'string', 'max' => 128],
            [['username'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'username' => 'Username',
            'password' => 'Password',
            'requiredServer' => 'Required Server',
            'status' => 'Status',
            'ip' => 'Ip',
        ];
    }
}
