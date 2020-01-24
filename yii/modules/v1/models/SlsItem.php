<?php


namespace app\modules\v1\models;


use app\modules\v1\gii\GiiSlsItem;

class SlsItem extends GiiSlsItem
{
    public function fields()
    {
        return array_merge(parent::fields(),
            [
                'blankFk'
            ]);
    }
}
