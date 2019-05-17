<?php
    $host = 'www.ggomee.com';
    $user = 'dbuser';
    $pw = 'dm0123';
    $dbName = 'Pegasus';
    $mysqli = new mysqli($host, $user, $pw, $dbName);

    if($mysqli){
        echo "MySQL 접속 성공";
    }else{
        echo "MySQL 접속 실패";
?>