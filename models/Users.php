<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Relation;
use Phalcon\Mvc\Model\Behavior\Timestampable;
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class Users extends Model
{	
    const ACTIVE = "Y";
    const NOT_ACTIVE = "N";

    private $tr;

    public function getSource() {
        return 'sys_users';
    }
    
    public function initialize()  {           

        $this->addBehavior(
            new SoftDelete([
                "field" => "active", 
                "value" => Users::NOT_ACTIVE
            ])
        );

        $this->addBehavior(
            new Timestampable([
                "beforeUpdate" => [
                    "field"  => "modified",
                    "format" => "Y-m-d H:i:s",
            ]])
        );

        $this->hasMany("id", "\Template\Models\UserCredentials", "user_id", ['alias' => 'credentials', 'foreignKey'=> ['action' => Relation::ACTION_CASCADE]]);
        $this->hasOne("id", "\Template\Models\UserEmails", "user_id", ['alias' => 'email']);
        $this->hasOne("role_id", "\Template\Models\Roles", "id", ['alias' => 'role']);
    }
}
