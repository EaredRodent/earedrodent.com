<?php
/**
 * Created by PhpStorm.
 * User: earedrodent
 * Date: 21.11.2018
 * Time: 17:09
 */

namespace app\models;

use app\gii\GiiDBUser;
use Yii;
use yii\web\IdentityInterface;
use yii\web\UnauthorizedHttpException;

class DBUser extends GiiDBUser implements IdentityInterface
{
    public function rules()
    {
        $rules = parent::rules();
        $rulesMixin = [
            ['login', 'string', 'min' => 4, 'max' => 20],
            ['password', 'string', 'min' => 4, 'max' => 45]
        ];
        $rules = array_merge($rules, $rulesMixin);
        return $rules;
    }

    public static function findIdentityByAccessToken($accesstoken, $type = null)
    {
        return static::findOne(['accesstoken' => $accesstoken]);
    }

    /**
     * Returns an ID that can uniquely identify a user identity.
     * @return string|int an ID that uniquely identifies a user identity.
     */
    public
    function getId()
    {
        return $this->id;
    }
    /**
     * Returns a key that can be used to check the validity of a given identity ID.
     *
     * The key should be unique for each individual user, and should be persistent
     * so that it can be used to check the validity of the user identity.
     *
     * The space of such keys should be big enough to defeat potential identity attacks.
     *
     * This is required if [[User::enableAutoLogin]] is enabled.
     * @return string a key that is used to check the validity of a given identity ID.
     * @see validateAuthKey()
     */
//    public function getAuthKey()
//    {
//        // TODO: Implement getAuthKey() method.
//    }
    /**
     * Validates the given auth key.
     *
     * This is required if [[User::enableAutoLogin]] is enabled.
     * @param string $authKey the given auth key
     * @return bool whether the given auth key is valid.
     * @see getAuthKey()
     */
//    public function validateAuthKey($authKey)
//    {
//        // TODO: Implement validateAuthKey() method.
//    }
    /**
     * Finds an identity by the given ID.
     * @param string|int $id the ID to be looked for
     * @return IdentityInterface the identity object that matches the given ID.
     * Null should be returned if such an identity cannot be found
     * or the identity is not in an active state (disabled, deleted, etc.)
     */
    public
    static function findIdentity($id)
    {
        $user = 1234;
        // TODO: Implement findIdentity() method.
    }

    /**
     * Returns a key that can be used to check the validity of a given identity ID.
     *
     * The key should be unique for each individual user, and should be persistent
     * so that it can be used to check the validity of the user identity.
     *
     * The space of such keys should be big enough to defeat potential identity attacks.
     *
     * This is required if [[User::enableAutoLogin]] is enabled.
     * @return string a key that is used to check the validity of a given identity ID.
     * @see validateAuthKey()
     */
    public
    function getAuthKey()
    {
        $user = 1234;
        // TODO: Implement getAuthKey() method.
    }

    /**
     * Validates the given auth key.
     *
     * This is required if [[User::enableAutoLogin]] is enabled.
     * @param string $authKey the given auth key
     * @return bool whether the given auth key is valid.
     * @see getAuthKey()
     */
    public
    function validateAuthKey($authKey)
    {
        $user = 1234;
        // TODO: Implement validateAuthKey() method.
    }
}