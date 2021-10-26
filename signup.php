<?php 
    error_reporting(0);
    session_start();
    if($_SESSION['email'] != '') {
        header('Location: http://localhost/CloudGallery/my-gallery');
    } 
    require './database/_db_connect.php';

?>

<!doctype html>
<html lang="en">

<head>

    <title>limitless cloud</title>
    <?php include './asset/header.php'; ?>
    <link rel="stylesheet" href="http://localhost/CloudGallery/public/css/signup.css?ver=1.8">
</head>

<body>

    <?php include './asset/navbar.php'; ?>

    <!-- loader -->
    <div class="loading">
        <div class="spinner-border text-center text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <!-- forms -->
    <section>
        <div class="container">
            <!-- forgot password -->
            <div class="user forgotBx" id="forgotBx">
                <div class="formBx">
                    <h2>Forgot Password</h2>
                    <div class="form-group my-3">
                        <input type="email" name="" class="form-control" placeholder="Email Address">
                    </div>
                    <div class="d-flex justify-content-between">
                        <button class="signup text text-nowrap"> Sign up here</button>
                        <button class="signin text text-nowrap">Sign in here</button>
                    </div>
                    <div class="d-grid gap-2 my-3">
                        <button class="btn py-2 default-btn" id="forgot-btn">Send Link</button>
                    </div>
                </div>
                <div class="imgBx">
                    <img src="http://localhost/CloudGallery/public/image/smoke.jpg" height="400" width="300" alt="">
                </div>
            </div>

            <!-- sign up -->
            <div class="user signupBx" id="signupBx">
                <div class="formBx">
                    <h2>Create an account</h2>
                    <div class="my-3" id="signup_warn"></div>
                    <div class="form-group my-3">
                        <input type="text" id="name" class="form-control" placeholder="Full Name">
                    </div>
                    <div class="form-group my-3">
                        <input type="email" id="email" class="form-control" placeholder="Email Address">
                    </div>
                    <div class="form-group my-3">
                        <input type="password" id="password" class="form-control" placeholder="Password">
                    </div>
                    <!-- <div class="d-flex justify-content-center">
                        <div class="h-captcha" data-sitekey="80a976d5-36a7-4a03-affb-71c3354619f8" required></div>
                    </div> -->
                    <!-- <div class="form-check">
                        <input class="form-check-input" type="checkbox"  id="showPass">
                        <label class="form-check-label" for="flexCheckDefault">
                            Show Password
                        </label>
                    </div> -->
                    <button class="signin btn text text-nowrap"> Sign in here</button>
                    <div class="d-grid gap-2 my-3">
                        <button class="btn py-2 default-btn" id="signup-btn">Create Account</button>
                    </div>
                </div>
                <div class="imgBx">
                    <img src="http://localhost/CloudGallery/public/image/smoke.jpg" height="400" width="300" alt="">
                </div>
            </div>

            <!-- sign in -->
            <div class="user signinBx" id="signinBx">
                <div class="imgBx">
                    <img src="http://localhost/CloudGallery/public/image/smoke.jpg" height="400" width="300" alt="">
                </div>
                <div class="formBx">
                    <h2>Sign In</h2>
                    <div class="my-3" id="login_warn"></div>
                    <div class="form-group my-3">
                        <input type="email" id="email" class="form-control" placeholder="Email Address">
                    </div>
                    <div class="form-group my-3">
                        <input type="password" id="password" class="form-control" placeholder="Your Password">
                    </div>
                    <div class="d-flex justify-content-between">
                        <button class="signup text text-nowrap"> Sign up here</button>
                        <button class="forgot text-danger text-nowrap">Forgot Password</button>
                    </div>
                    <div class="d-grid gap-2 my-3">
                        <button class="btn py-2 default-btn" id="login-btn">Log In</button>
                    </div>
                    <div class="my-4 text-center bold"><span class="text-muted text-center">or</span></div>
                    <div class="d-grid gap-2 my-3">
                        <div id="my-signin2"></div>
                        <!-- <button class="btn py-2 default-btn">With facebook</button> -->
                    </div>
                </div>
            </div>
        </div>
    </section>


 



    <?php include './asset/footer.php'; ?>
    <script src="http://localhost/CloudGallery/controller/js/index.js?ver=1.8"></script>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

</body>

</html>