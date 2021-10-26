<?php

    // require '../../vendor/autoload.php';
    require '../../database/_db_connect.php';
    // error_reporting(0);


session_start();


    $uid = $_SESSION['uid'];
    $query = "UPDATE `user` SET `session_token` = '' WHERE `user_id` = '$uid'";
    $result = mysqli_query( $conn, $query );
    if($result) {
        unset($_SESSION['email']);
        unset($_SESSION['uid']);
        unset($_SESSION['loggedin']);
        unset($_SESSION['name']);
        unset($_SESSION['profileImg']);
        session_unset();
        session_destroy();
        echo 'true';
        exit();

    }

    



