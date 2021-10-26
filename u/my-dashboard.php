<?php 
    session_start();
    error_reporting(0);
    if($_SESSION['email'] == '') {
        header('Location: http://myapp.local/cloud/');
    }   
    require '../vendor/autoload.php';
    require '../database/_db_connect.php';  


    // user Info
    $email = $_SESSION['email'];
    $uid = $_SESSION['uid'];
    $query = "SELECT * FROM `sm2.epizy.com`.`user` WHERE `Email` = '$email'";
    $result = mysqli_query( $conn, $query );
    $row = mysqli_fetch_row( $result );

    $query = "SELECT * FROM `gallery` WHERE `user_id` = '$uid'";
    $result = mysqli_query( $conn, $query );
    $gallery_detail = mysqli_fetch_row($result);
    $album_count = count($gallery_detail)+1;

    $query = "SELECT * FROM `photo_gallery` WHERE `user_id` = '$uid'";
    $result = mysqli_query( $conn, $query );
    $photo_gallery_detail = mysqli_fetch_assoc($result);

    $query = "SELECT * FROM `video_gallery` WHERE `user_id` = '$uid'";
    $result = mysqli_query( $conn, $query );
    $video_gallery_detail = mysqli_fetch_assoc($result);


?>

<!doctype html>
<html lang="en">

<head>

    <title>Gallery | <?php echo $row['1'] ?></title>
    <?php include '../asset/header.php'; ?>
    <link rel="stylesheet" href="http://myapp.local/cloud/public/css/my-dashboard.css?ver=1.2">
</head>

<body>

    <!-- page loader -->
    <div class="loading">
        <div class="spinner-border text-center" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>


    <!-- all modals -->
    <?php include '../asset/modals/modals.php'; ?>

    <!-- hero body start -->
    <div class="main">

        <!-- sidebar -->
        <?php include '../asset/sidebar.php'; ?>

        <!-- navbar -->
        <?php include '../asset/navbar.php'; ?>
        
 
        <!-- main body content-->
        <div class="body-main-dashboard"> 
            <!-- div loader -->
            <!-- <div class="divload">
                <div class="spinner-border text-center" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div> -->
        
            <!-- dashboard content -->
            <div class="dashboard-content my-3">
                <button class="btn btn-sm default-text" id="side-toggle-btn"><i class="bi bi-list-nested h6"></i></button>

                <!-- dashboard cards-->
                <?php include './my_gallery_cards.php'; ?>
                
                <!-- dashboard -->

                
            </div>









                        
        </div>


<!-- main end -->
</div>
<!-- hero body end-->









<?php include '../asset/footer.php'; ?>
<script src="../js/my-dashboard.js?ver=1.1"></script>

</body>

</html>