<?php

namespace app\gii;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string $accesstoken
 * @property string $name
 * @property string $lastlogin
 * @property string $phone
 * @property string $datacreated
 */
class GiiDBUser extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email', 'password', 'accesstoken', 'name', 'lastlogin', 'phone', 'datacreated'], 'string', 'max' => 180],
            [['accesstoken'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'email' => 'Email',
            'password' => 'Password',
            'accesstoken' => 'Accesstoken',
            'name' => 'Name',
            'lastlogin' => 'Lastlogin',
            'phone' => 'Phone',
            'datacreated' => 'Datacreated',
        ];
    }
}
