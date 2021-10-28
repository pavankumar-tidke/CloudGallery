<?php

    if($_SESSION['email'] != '') {
        header('Location: http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/my-gallery');
    }