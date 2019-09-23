<?php

namespace app\modules\v1\gii;

use Yii;

/**
 * This is the model class for table "downloads".
 *
 * @property int $id
 * @property string $ts
 */
class GiiDownloads extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'downloads';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ts'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ts' => 'Ts',
        ];
    }
}
