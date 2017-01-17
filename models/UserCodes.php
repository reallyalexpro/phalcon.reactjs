<?php

use Phalcon\Mvc\Model;

class UserCodes extends Model
{			
    public function getSource() {
        return 'sys_user_codes';
    }

	public function initialize()
    {		
        $this->belongsTo("user_id", "\Template\Models\Users", "id" , array('alias' => 'user'));		
    }
}
