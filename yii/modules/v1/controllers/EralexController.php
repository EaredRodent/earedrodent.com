<?php
/**
 * Created by PhpStorm.
 * User: EaredRodent
 * Date: 2/11/2019
 * Time: 09:54 PM
 */

namespace app\modules\v1\controllers;

use Phar;
use PharData;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\HttpException;

class EralexController extends ActiveController
{
    public $modelClass = '';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'optional' => ['upload']
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['upload'],
                    'allow' => true,
                    'roles' => ['?', '@']
                ]
            ]
        ];
        return $behaviors;
    }

    public function actionUpload()
    {
        $files = $_FILES;
        $dirExe = Yii::getAlias('@app') . '/protector';
        $dirScripts = Yii::getAlias('@app') . '/web/scripts';
        $dirProtected = Yii::getAlias('@app') . '/web/protected';

        // Clear protected dir

        foreach (glob($dirProtected . '/*.*') as $file) {
            unlink($file);
        }

        // Working

        foreach ($files as $file) {
            $tmp_name = $file['tmp_name'];
            $name = $file['name'];

            // Move file

            $scriptDst = $dirScripts . '/' . rawurlencode($name);
            move_uploaded_file($tmp_name, $scriptDst);

            // Dup exe file

            $fileInfo = pathinfo($scriptDst);
            $exeDst = $dirProtected . '/' . rawurlencode($fileInfo['filename'] . '.exe');
            copy($dirExe . '/EralexProtector.exe', $exeDst);

            // Script reading

            $fHandle = fopen($scriptDst, 'rb');
            $scriptBytes = fread($fHandle, filesize($scriptDst));
            fclose($fHandle);

            // Script encoding

            for ($i = 0; $i < filesize($scriptDst); $i++) {
                $scriptByte = ord($scriptBytes[$i]);
                $scriptByteEncrypted = $scriptByte ^ 0x95;
                $scriptBytes[$i] = chr($scriptByteEncrypted);
            }

            // Set delimiter

            $scriptBytes = 'AXWELLVINGROSSO_MORE_THAN_YOU_KNOW' . $scriptBytes;

            // EXE writing

            $fHandle = fopen($exeDst, 'ab');
            fwrite($fHandle, $scriptBytes, filesize($scriptDst));
            fclose($fHandle);
        }

        // EXE dependency copy

        copy($dirExe . '/msvcp140.dll', $dirProtected . '/msvcp140.dll');
        copy($dirExe . '/msvcr120.dll', $dirProtected . '/msvcr120.dll');
        copy($dirExe . '/Qt5Core.dll', $dirProtected . '/Qt5Core.dll');

        // Archive all files

        $archiveBaseName = 'arch_' . time() . '.tar';
        $archiveName = $dirProtected . '/' . $archiveBaseName;
        $archive = new PharData($archiveName);
        foreach (glob($dirProtected . '/*.*') as $file) {
            $fileName = explode('/', $file);
            $fileName = $fileName[sizeof($fileName) - 1];
            $archive->addFile($file, $fileName);
        }
        $archive->compress(Phar::GZ);

        return ['archiveUrl' => '/protected/' . $archiveBaseName . '.gz'];
    }
}

?>
