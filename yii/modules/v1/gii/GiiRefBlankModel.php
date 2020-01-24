<?php

namespace app\modules\v1\gii;

use Yii;

/**
 * This is the model class for table "ref_blank_model".
 *
 * @property int $id
 * @property string $ts_create
 * @property int $class_fk
 * @property int $sex_fk
 * @property string $title
 * @property string $title_en
 * @property string $descript
 * @property string $cut1
 * @property string $cut2
 * @property string $cut3
 * @property string $cut4
 * @property string $cut5
 * @property string $epithets
 * @property string $fashion
 *
 * @property RefArtBlank[] $refArtBlanks
 */
class GiiRefBlankModel extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'ref_blank_model';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ts_create'], 'safe'],
            [['class_fk', 'sex_fk', 'title'], 'required'],
            [['class_fk', 'sex_fk'], 'integer'],
            [['epithets'], 'string'],
            [['title', 'title_en', 'fashion'], 'string', 'max' => 45],
            [['descript'], 'string', 'max' => 300],
            [['cut1', 'cut2', 'cut3', 'cut4', 'cut5'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ts_create' => 'Ts Create',
            'class_fk' => 'Class Fk',
            'sex_fk' => 'Sex Fk',
            'title' => 'Title',
            'title_en' => 'Title En',
            'descript' => 'Descript',
            'cut1' => 'Cut1',
            'cut2' => 'Cut2',
            'cut3' => 'Cut3',
            'cut4' => 'Cut4',
            'cut5' => 'Cut5',
            'epithets' => 'Epithets',
            'fashion' => 'Fashion',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRefArtBlanks()
    {
        return $this->hasMany(RefArtBlank::className(), ['model_fk' => 'id']);
    }
}
