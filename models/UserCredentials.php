<?php

use Phalcon\Mvc\Model;

class UserCredentials extends Model
{	
    public function getSource() {
        return 'sys_user_credentials';
    }

    public function initialize()
    {
        $this->belongsTo("user_id", "\Template\Models\Users", "id");
    }
           
    public static function findByUserAndProvider($user_id, $provider) {
    	return self::findFirst([
            "user_id = :user: and provider = :provider:",
            'bind' => ['user' => $user_id, 'provider' => $provider]
        ]);
    }
    
    public static function checkNative($user_id, $password) {
        $credentials = self::findFirst([
            "user_id = :user: and provider = 'native'",
            'bind' => ['user' => $user_id]
        ]);
        return ($credentials && $this->security->checkHash($password, $credentials->password));
    }
}
