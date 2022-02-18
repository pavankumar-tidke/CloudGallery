<?php 
    session_start();
    // error_reporting(0);
       
    // middlewares
    require '../middleware/post_login.php';

    // database connections
    require '../database/_db_connect.php';  
    // require '../vendor/autoload.php';
 
// use MongoDB\Client as mongo;
//     $mongoConn = new mongo;
//     $mondb = $mongoConn->SmartGallery;
//     $_USER_DATA_COLLECTION = $mondb->user_data; 


    include '../asset/get_url.php';

 

    // user Info
    $uid = $_SESSION['uid'];
    $query = "SELECT * FROM `user` WHERE `user_id` = '$uid'";
    $result = mysqli_query( $conn, $query );
    $userRow = mysqli_fetch_row( $result );
 

      
    
?>

<!doctype html>
<html lang="en">

<head>

    
    <?php include '../asset/header.php'; ?>
    <link rel="stylesheet" href="http://localhost/public/css/my-gallery.css?ver=4.8">
    <link rel="stylesheet" href="http://localhost/public/css/modals.css?ver=1.9">
    <link rel="stylesheet" href="http://localhost/asset/library/lit/jquery.treemenu.css">

</head>

<body>
    <!-- session storing in localstorage -->
    <input type="text" hidden id="session_token" value="<?php // echo $_SESSION['session_token']; ?>">

    <!-- * All loaders -->
    <?php include '../asset/loader.php'; ?>
    


    <!-- 
    * uitilities  
    -->
    <!-- Scroll To Top -->
    <!-- <div class="scrollTop" onclick="scrollToTop()"></div> -->
    <!-- mobile add button -->
    <!-- <div class="border "> -->
        <!-- <button class="btn add-btn text-center px-2 py-1  rounded-circle">
            <i class="material-icons mt-1">add</i>
        </button> -->

        <div class="btn-group dropup dropup-add">
            <button type="button" class="btn add-btn px-1 py-0" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="material-icons mt-1">add</i>
            </button> 
            <ul class="dropdown-menu drop-new-menu text-small border-1 border-secondary shadow bg-dark" aria-labelledby="dropdownUser2"> 
                <!-- <li>
                    <button class="dropdown-item text" data-bs-toggle="modal" data-bs-target="#newFolder"><i class="bi bi-folder-plus me-3"></i>New Folder...</button>
                </li> -->
                <!-- <li>
                    <hr class="dropdown-divider text my-1 mx-2">
                </li> -->
                <li>
                    <form class="sidebarForm" id="sideFormUpload">
                        <label class="custom-file-upload text">
                            <input type="file" name="file[]" id="addBtnFileUploadSelect" multiple />
                            <i class="bi bi-file-earmark-arrow-up me-3"></i>File Upload
                        </label> 
                        <input type="text" hidden name="navbar_upload_folder_id" value="" class="folder_id_for_upload">
                    </form>
                </li>
                <li>
                    <a class="dropdown-item text" href="#"><i class="bi bi-folder-plus me-3"></i>Folder (Coming Soon)</a>
                </li> 
            </ul>
        </div>
    <!-- </div> -->
    <!-- right click -->
    <?php include './right_click.php'; ?>


    <!-- * Page [START]  -->
    <div class="main">

        <!-- sidebar -->
        <?php include '../asset/sidebar.php'; ?>
        <!-- navbar -->
        <?php include '../asset/navbar.php'; ?>

        <!-- main body content-->
        <div class="hero-container" id="testContext">
            <!-- searchbar -->
            <?php include '../asset/searchbar.php'; ?>

            <div class="page-content">
                
                
                <!-- home content [START] -->
                <div class="home-content text my-3"> 
                    <!-- album list -->
                    <!-- <div class="mt-4 mb-0">
                        <p class="text-muted bold">Recent Albums</p>
                        <div class="row" id="home-data-content-first"></div>
                    </div> --> 
                    <!-- Recent added -->
                    <div class="mt-4 mb-0">
                        <div class="d-flex justify-content-between">
                            <p class="text-muted bold my-auto">My Gallery</p>
                            <button class="btn m-0 p-0 bold text-muted display-filter" value="0"></botton>
                        </div>
                        <!-- big cards view  -->
                        <div class="row mx-auto image-link" id="home-data-content-recent"></div>
                        <img src="" alt="">
                        <!-- list type cards view  -->
                        <div class="row mx-auto list-view" id="home-data-content-list-recent"></div>
                    </div>
                </div>
                <!-- home content [END] -->
                


                <!-- favourite content [START] -->
                <div class="favourite-content text my-3">
                    <div class="d-flex justify-content-between">
                        <p class="text-muted bold my-auto">Favourite</p>
                        <!-- <button class="btn m-0 p-0 bold text-muted display-filter" value="0"></botton> -->
                    </div>
                    <!-- big cards view  -->
                    <div class="row mx-auto image-link" id="favourite-data-content"></div>
                    <!-- list type cards view  -->
                    <div class="row mx-auto list-view" id="favourite-data-content-list"></div>
                </div>
                <!-- favourite content [END] --> 




                <!-- file status mobile content [START] -->
                <div class="mobile-file-status-content text my-3">
                    <div class="d-flex justify-content-between">
                        <p class="text-muted bold my-auto">My Uploads</p> 
                    </div> 
                    <div class="row mx-auto mobile-file-status" id="">
                        <!-- file progress --> 
                        <div class="m-file-status px-0">
                            <div class="addBtn-multi-file-div"></div>
                            
                            <!-- warnings -->
                            <div class="text-center text" id="mob_status_warn"></div>
                        </div>
                    </div> 
                </div>
                <!-- file status mobile content [END] --> 





                <!-- My Profile [START] -->
                <div class="my-profile text my-3">
                    <div class="d-flex justify-content-between">
                        <!-- <p class="text-muted bold my-auto">My Profile</p>  -->
                    </div>
                    <div class="main-dashboard-content my-3">
                        <div class=" info ">
                            <p class="text-muted bold my-auto">Data Usage</p>
                            <div class="row card-border rounded">  
                                <div class=" col personal-info my-auto">
                                    <div class="data-chart "  >
                                        <div class="d-flex justify-content-center">
                                            <canvas id="myChart"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div class="col  data my-auto"> 
                                    <div class="cards my-auto "> 
                                        <div class="data-card card-border rounded my-3">
                                            <div class="d-flex justify-content-between p-3">
                                                <div class="d-flex">
                                                    <i class="material-icons-outlined">storage</i>
                                                    <p class="my-auto ms-2 bold">Total Storage Used</p>
                                                </div> 
                                                <h6 id="dataSize">0 B</h6>
                                            </div>
                                        </div>
                                        <!-- <div class="photo-card card-border rounded my-3">
                                            <div class="d-flex justify-content-between p-3">
                                                <div class="d-flex">
                                                    <i class="material-icons-outlined">photo_library</i>
                                                    <p class="my-auto ms-2 bold">Photos</p>
                                                </div> 
                                                <h6></h6>
                                            </div>
                                        </div>
                                        <div class="video-card card-border rounded my-3">
                                            <div class="d-flex justify-content-between p-3">
                                                <div class="d-flex">
                                                    <i class="material-icons-outlined">smart_display</i>
                                                    <p class="my-auto ms-2 bold">Videos</p>
                                                </div> 
                                                <h6></h6>
                                            </div>
                                        </div>
                                        <div class="song-card card-border rounded my-3">
                                            <div class="d-flex justify-content-between p-3">
                                                <div class="d-flex">
                                                    <i class="material-icons-outlined">library_music</i>
                                                    <p class="my-auto ms-2 bold">Songs</p>
                                                </div> 
                                                <h6></h6>
                                            </div>
                                        </div>
                                        <div class="other-card card-border rounded my-3">
                                            <div class="d-flex justify-content-between p-3">
                                                <div class="d-flex">
                                                    <i class="material-icons-outlined">other_houses</i>
                                                    <p class="my-auto ms-2 bold">Others</p>
                                                </div> 
                                                <h6></h6>
                                            </div>
                                        </div> -->
                                        <!-- <div class="photos-card card-border">

                                        </div> -->
                                        <!-- <div class="videos-card">

                                        </div>
                                        <div class="music-card">

                                        </div>
                                        <div class="other-card">

                                        </div> -->
                                    </div>
                                </div> 
                            </div>
                            <div class=" security-info my-4">
                                <!-- <p class="text-muted bold my-auto">Other Settings</p> 
                                <div class="card-border rounded">
                                    <div class=" px-2"> 
                                        <p>Authentication Type : <span>Google Auth</span></p> 
                                        <div class="my-4">
                                            <div class="info-bg text-dark rounded py-2">
                                                <div class="p-2">You are seeing this because, You are logged in with google auth (meaning that no password use), if you want to create password then you can create below,  after this you can login with your password  as well as google auth.</div>
                                            </div>
                                            <div class="d-flex justify-content-between form-group my-3">
                                                <label for="password" class="text-nowrap ps-0">Set Password</label>
                                                <div class="">
                                                    <input type="password" class="form-control me-3 set_login_pass">     
                                                </div>
                                                <button class="btn info-bg text-dark bold px-4 set_login_pass_btn">Set</button>
                                            </div>
                                            <span class="set_pass_warn"></span>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div> 
                    </div>

                </div>
                

                <!-- My Profile [END] -->



                <!-- FOLDER view content [START]-->
                <!-- <div class="folder-content text my-1">
                    <div class="text-center my-5 empty-msg">
                        <h6 class="text-primary"></h6>
                    </div> -->

                    <!--* folders list -->
                    <!-- <div class="mt-4 mb-0 folder-card-div">
                        <p class="text-muted bold"></p>
                        <div class="row d-flex justify-content-start" id="folder-cards"></div>
                    </div> -->

                    <!--* folder data -->
                    <!-- <div class="folder-data">
                        <div class="d-flex justify-content-between folder-data-heading">
                            <p class="text-muted bold my-auto mt-4"> </p>
                            <button class="btn m-0 p-0 bold text-muted display-filter" value="0"></botton>
                        </div> -->
                        <!--* big cards view  -->
                        <!-- <div class="row mx-auto image-link" id="folder-data-content"></div> -->
                        <!--* list type cards view  -->
                        <!-- <div class="row mx-auto list-view" id="folder-data-content-list"></div>
                    </div>
                </div> -->
                <!-- FOLDER view content [END]-->

            </div>

        </div>
        <!-- main end -->
    </div>
    <!-- * Page [END]  -->


    <!-- all modals -->
    <?php include '../asset/modals/modals.php'; ?>

    
    <!-- bottom navbar -->
    
    


<h5 class="text-"></h5>

 
    <script>
        let app_url = `<?php echo $app_url ?>/`;
        let fullname = `<?php echo $_SESSION['name']; ?>`;
        let uid = `<?php echo $_SESSION['uid']; ?>`;
        let folder_id = `<?php 
            if(isset($_GET['f']) && strlen($_GET['f']) == 32) {
                echo $folder_id =  $_GET['f'];    
            } 
            else {
                echo $folder_id =  'folder not fund url';
            } 
        ?>`;
        // console.log(folder_id);
        
    </script>

    <?php include '../asset/footer.php'; ?>
    



    <script src="http://localhost/controller/js/modals.js?ver=2.1"></script>

    <script src="http://localhost/asset/library/lit/jquery.treemenu.js"></script>

    <script src="http://localhost/controller/js/dynamic_url.js?ver=1.5"></script>
    
    <script src="http://localhost/controller/js/my-gallery.js?ver=8.8"></script>
    <script>
        
    </script>
</body>

</html>

 









