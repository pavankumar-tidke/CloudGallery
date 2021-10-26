<?php

    if($_SESSION['email'] == '') {
        header('Location: http://ec2-18-220-10-227.us-east-2.compute.amazonaws.com/CloudGallery/signup');
    }