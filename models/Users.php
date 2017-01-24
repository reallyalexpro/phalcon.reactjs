<?php

use Phalcon\Mvc\Model;

class Users extends Model
{

    public function getSource() {
        return 'sys_users';
    }
}
