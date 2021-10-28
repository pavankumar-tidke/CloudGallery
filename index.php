<?php 
    error_reporting(0);
    session_start();
    
    // middlewares
    require './middleware/pre_login.php';

?>

<!doctype html>
<html lang="en">

<head>

    <title>Smart Gallery</title>
    <?php include './asset/header.php'; ?>
    <?php include './alerts.php'; ?>
    <?php include './_logout.php'; ?>
    <link rel="stylesheet" href="http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/public/css/index.css?ver=1.4">
</head>

<body>

    <?php include './asset/navbar.php'; ?>

    <!-- loader -->
    <div class="loading">
        <div class="spinner-border text-center text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <!-- Scroll To Top -->
    <div class="scrollTop" onclick="scrollToTop()"></div>

    <!-- heading -->
    <div class="container my-5">
        <h1 class="text-center text my-5">Keep Your Photos and Videos Safe Here</h1>
        <p class="text-center text">Get unlimited space and prevent phone filling up with photos and videos</p>
        <div class="container my-5">
            <div class="2btn">
                <?php
                    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
                        echo '<div class="d-flex justify-content-center">
                                <a class="btn defaut-btn bold btn-hover text-light py-3 px-5" href="./user_profile.php" role="button"><b>Profile</b></a>
                                <a class="btn defaut-btn bold btn-hover text-light py-3 px-5" href="./user_account.php" role="button"><b>Gallery</b></a>
                            </div>';
                    }
                    else {
                        echo '<div class="d-flex justify-content-center">
                                <a href="http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/signup" class="btn default-btn bold theam-btn-hover text-light py-3 px-5">Let\'s create account <i class="bi bi-arrow-right-short mx-1"></i></a>
                            </div>';
                    }
                ?>
            </div>
        </div>
    </div>

    <hr class="m-5 text">


    <!-- second page -->
    <div class="container second-container">
        <h1 class="text-center heading my-5 font-weight-bold">You can...</h1>
        <div class="row my-3">
            <div class="col-md-6 my-auto">
                <h4 class="text display-6"><b> Safely store your photos of any type.</b></h4>
                <p class="text">like <i>jpg, png, jpeg...</i> and many morrrr</p>
            </div>
            <div class="col-md-6 pl1 mx-auto px-auto">
                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_2oranrew.json"
                    background="transparent" speed="1"  loop autoplay></lottie-player>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-md-6 pl2 mx-auto px-auto">
                <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_jgL75c.json" background="transparent"
                    speed="1" loop autoplay></lottie-player>
            </div>
            <div class="col-md-6 my-auto">
                <h1 class="text display-6"><b>Stuck on mobile storage due to videos ?</b></h1>
                <p class="text"><i> Don't take tension</i></p>
            </div>
        </div>

        <hr class="m-5 text">
        <h1 class="text-center heading my-5 font-weight-bold">What's New...</h1>
        <div class="row">
            <div class="col-md-6 my-auto">
                <h1 class="text display-6"><b> Your videos also we store safely.</b></h1>
                <p class="text"><i>mp4, mpeg, web, mpg...</i> and many more</p>
            </div>
            <div class="col-md-6 pl3  mx-auto px-auto">
                <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_imyUMa.json"
                    background="transparent" speed="1" loop autoplay></lottie-player>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 pl4  mx-auto px-auto">
                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_bI0Cms.json" background="transparent"
                    speed="1" loop autoplay></lottie-player>
            </div>
            <div class="col-md-6 my-auto">
                <h1 class="text display-6"><b>Everything is safe like Afganistan ?</b></h1>
                <p class="text"><i> No issue about privacy</i></p>
            </div>
        </div>
    </div>
    
    <hr class="text m-5">



    <!-- Contact Us -->
    <div class="container contact" >
        <h1 class="text-center heading">Any Question...Ask here</h1>
        <div class="container border border-primary rounded col-md-7 my-5 p-3">
            <form action="./_contact us handler.php" method="POST">
                <div class="form-group my-3">
                    <label for="email" class="text">Email address</label>
                    <input type="email" name="cont_email" class="form-control text" id="email">
                </div>
                <div class="form-group my-3">
                    <label for="exampleFormControlTextarea1" class="text">Question</label>
                    <textarea class="form-control text" name="cont_desc" id="exampleFormControlTextarea1"
                        rows="3"></textarea>
                </div>
                <button type="submit" name="cont_sub" class="btn default-btn">Submit</button>
            </form>
        </div>
    </div>

    <!-- <hr class="border border-primary" style="margin-left: 10%; margin-right: 10%; margin-top: 10%;">
    
    <div class="align-items-center">
        <div>
            <p class="text-muted font-size-12 text-center">Your data encryption is protected by 256-bit SSL encryption</p>
        </div>
    </div> -->


    <?php include './asset/footer.php'; ?>
    <script src="http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/controller/js/index.js?ver=1.8"></script>
</body>

</html>