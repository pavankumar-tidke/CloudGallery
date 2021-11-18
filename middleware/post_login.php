<?php

    if($_SESSION['email'] == '') {
        header('Location: http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/signup');
    }