<?php

use Phalcon\Mvc\Model;

class UserEmails extends Model
{	        
    public function getSource() {
        return 'sys_user_emails';
    }

    public function initialize()
    {
        $this->belongsTo("user_id", "\Template\Models\Users", "id" , array('alias' => 'user'));
    }
}
