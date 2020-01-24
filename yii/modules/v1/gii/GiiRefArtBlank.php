<?php

namespace app\modules\v1\gii;

use app\modules\v1\models\RefBlankModel;
use Yii;

/**
 * This is the model class for table "ref_art_blank".
 *
 * @property int $id
 * @property string $dt_create
 * @property int $model_fk
 * @property int $fabric_type_fk
 * @property int $theme_fk
 * @property string $comment
 * @property int $weight_fabric
 * @property int $flag_price
 * @property int $price_5xs
 * @property int $price_4xs
 * @property int $price_3xs
 * @property int $price_2xs
 * @property int $price_xs
 * @property int $price_s
 * @property int $price_m
 * @property int $price_l
 * @property int $price_xl
 * @property int $price_2xl
 * @property int $price_3xl
 * @property int $price_4xl
 * @property int $flag_best_photo
 * @property int $min_rest
 * @property int $mid_rest
 *
 * @property RefBlankModel $modelFk
 * @property SlsItem[] $slsItems
 */
class GiiRefArtBlank extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'ref_art_blank';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['dt_create'], 'safe'],
            [['model_fk', 'fabric_type_fk', 'theme_fk'], 'required'],
            [['model_fk', 'fabric_type_fk', 'theme_fk', 'weight_fabric', 'flag_price', 'price_5xs', 'price_4xs', 'price_3xs', 'price_2xs', 'price_xs', 'price_s', 'price_m', 'price_l', 'price_xl', 'price_2xl', 'price_3xl', 'price_4xl', 'flag_best_photo', 'min_rest', 'mid_rest'], 'integer'],
            [['comment'], 'string', 'max' => 245],
            [['model_fk'], 'exist', 'skipOnError' => true, 'targetClass' => RefBlankModel::className(), 'targetAttribute' => ['model_fk' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'dt_create' => 'Dt Create',
            'model_fk' => 'Model Fk',
            'fabric_type_fk' => 'Fabric Type Fk',
            'theme_fk' => 'Theme Fk',
            'comment' => 'Comment',
            'weight_fabric' => 'Weight Fabric',
            'flag_price' => 'Flag Price',
            'price_5xs' => 'Price 5xs',
            'price_4xs' => 'Price 4xs',
            'price_3xs' => 'Price 3xs',
            'price_2xs' => 'Price 2xs',
            'price_xs' => 'Price Xs',
            'price_s' => 'Price S',
            'price_m' => 'Price M',
            'price_l' => 'Price L',
            'price_xl' => 'Price Xl',
            'price_2xl' => 'Price 2xl',
            'price_3xl' => 'Price 3xl',
            'price_4xl' => 'Price 4xl',
            'flag_best_photo' => 'Flag Best Photo',
            'min_rest' => 'Min Rest',
            'mid_rest' => 'Mid Rest',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getModelFk()
    {
        return $this->hasOne(RefBlankModel::className(), ['id' => 'model_fk']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSlsItems()
    {
        return $this->hasMany(SlsItem::className(), ['blank_fk' => 'id']);
    }
}
