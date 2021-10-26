<?php

    if($_SESSION['email'] == '') {
        header('Location: http://localhost/CloudGallery/signup');
    }