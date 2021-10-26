<?php

    if($_SESSION['email'] == '') {
        header('Location: http://18.117.246.170/CloudGallery/signup');
    }