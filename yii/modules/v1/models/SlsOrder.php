<?php


namespace app\modules\v1\models;


use app\modules\v1\gii\GiiSlsOrder;

class SlsOrder extends GiiSlsOrder
{
    public function fields()
    {
        return array_merge(parent::fields(),
            [
                'slsItems'
            ]);
    }
}
