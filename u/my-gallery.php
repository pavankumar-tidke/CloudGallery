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
    <link rel="stylesheet" href="http://localhost/CloudGallery/public/css/my-gallery.css?ver=4.8">
    <link rel="stylesheet" href="http://localhost/CloudGallery/public/css/modals.css?ver=1.9">
    <link rel="stylesheet" href="http://localhost/CloudGallery/asset/library/lit/jquery.treemenu.css">

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
    <div class="scrollTop" onclick="scrollToTop()"></div>
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
                            <input type="file" name="file[]" id="sideFileUploadSelect" multiple />
                            <i class="bi bi-file-earmark-arrow-up me-3"></i>File Upload
                        </label>
                        <input type="text" hidden name="navbar_upload_album_id" value="" class="album_id_for_upload">
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
                    <?php
                    
                    // $flag = 0; 
                    // $arr['test'] = 'ok';  
                    // $arr2['nested'] = null;
                
                    // $data = $_USER_DATA_COLLECTION->findOne(['user_id' => strval($uid)]);
                    // $data = iterator_to_array($data); $data = $data['my_gallery']; 
                         
                    // function fun($val, $folder_id, $arr2) {
                    //     foreach($val as $key => $val) {
                    //         if($key == $folder_id) {
                    //             foreach($val as $key => $val) {
                    //                 array_push($arr2 , encrypt_decrypt($key, 'decrypt'));
                    //                 // $arr = encrypt_decrypt($key, 'decrypt');
                    //             }
                    //             return $arr2;
                    //         }

                    //         fun($val, $folder_id, $arr2);
                    //     }
                    // }

                    // $r = fun($data, $folder_id, $arr2);

                    // // var_dump($r);

                    // print_r(array_merge($arr, $r));
                
                    
                
                
                
                 

                    ?>
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
    



    <script src="http://localhost/CloudGallery/controller/js/modals.js?ver=2.1"></script>

    <script src="http://localhost/CloudGallery/asset/library/lit/jquery.treemenu.js"></script>

    <script src="http://localhost/CloudGallery/controller/js/dynamic_url.js?ver=1.5"></script>
    
    <script src="http://localhost/CloudGallery/controller/js/my-gallery.js?ver=8.8"></script>
    <script>
        
    </script>
</body>

</html>

 









