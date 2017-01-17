<?php

use Phalcon\Mvc\Model;

class Roles extends Model
{		
    public function getSource() 
    {
        return 'sys_user_roles';
    }
    
    public function initialize()
    {		
        $this->belongsTo("user_id", "\Template\Models\Users", "id" , ['alias' => 'user']);
    }
}
