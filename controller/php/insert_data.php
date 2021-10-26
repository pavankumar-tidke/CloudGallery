<?php 
    //* session starting
    session_start();

    //* importing require files and making connection with databases
    // require '../../vendor/autoload.php';
    require '../../database/_db_connect.php';
    // use MongoDB\Client as mongo;
    // $mongoConn = new mongo;
    // $mondb = $mongoConn->SmartGallery;
    // $_USER_DATA_COLLECTION = $mondb->user_data;
    
    $uid = $_SESSION['uid'];


    


    // Updating / Inserting into the database
    if(isset($_POST['newFolder'])) { 
        $folder_name = $_POST['folder_name'];
        $current_folder_id = $_POST['current_folder_id']; 

        $new_folder_name = $folder_name;
        $new_folder_obj = (Object)[] ;

        // $GLOBALS['z'] = 3; 
        
        // echo "<script>console.log('Debug Objects: " .$GLOBALS . "' );</script>";

        // folder retriving
        function folder_retriving($val, $current_folder_id, $_USER_DATA_COLLECTION, $new_folder_name, $path_to_folder ) { 
            foreach($val as $key => $val) { 
                // $path_to_folder =  $path_to_folder.'.'.$key; 
                if($key == $current_folder_id) { 

                    $new_folder_obj = (Object)[] ;
                    $r = $_USER_DATA_COLLECTION->updateOne(
                        ['user_id' => strval($_SESSION['uid'])],
                        ['$set' => ['my_gallery.'.$path_to_folder.'.'.$new_folder_name => $new_folder_obj]]
                    );  
                    return $r;  
                    // return $r ;        
                } else {
                    $path_to_folder =  $path_to_folder.'.'.$key;
                }
                folder_retriving($val, $current_folder_id, $_USER_DATA_COLLECTION, $new_folder_name, $path_to_folder );  
            }
        }
         

        if($current_folder_id != 'null') { 
            $path_to_folder = '';    
            // $r = $_USER_DATA_COLLECTION->findOne(
            //     ['user_id' => strval($uid)] 
            // ); 
            // print_r($r); 

            $data = $_USER_DATA_COLLECTION->findOne(['user_id' => strval($uid)]);
            $data = iterator_to_array($data); $data = $data['my_gallery']; 
            print_r(folder_retriving($data, $current_folder_id, $_USER_DATA_COLLECTION, $new_folder_name, $path_to_folder ));
        }
        else { 
            echo 'run else';
            $r = $_USER_DATA_COLLECTION->updateOne(
                ['user_id' => strval($uid)],
                ['$set' => ['my_gallery.'.$new_folder_name => $new_folder_obj]]
            ); 
        }


        // $r = $_USER_DATA_COLLECTION->updateOne(
        //     ['user_id' => strval($uid)],
        //     ['$set' => ['my_gallery.'.$ob => $new_folder]]
        // ); 

        // $enc_folder_name = encrypt_decrypt($folder_name, 'encrypt');
        // $dec_folder_name = encrypt_decrypt($enc_folder_name, 'decrypt');

        // echo ($r) ? 'true' : 'false'.mysqli_error($conn);
        
        // $sql = "INSERT INTO `folder` (`user_id`, `folder_name`) VALUES ('$uid', '$folder_name')";
        // $result = mysqli_query($conn, $sql);
        // if($result) {
        //     echo 'true';
        // }
        // else {
        //     echo 'false';
        // } 
    }


    // else if($_POST['navbar_upload_album_id'] != '') {    
    //     $file = $_FILES['file'];
    //     $album_id = $_POST['navbar_upload_album_id'];
    //     $count = 0;
        
    //     while($count < count($_FILES['file']['name'])) {
    //         $originalFileName = $_FILES['file']['name'][$count];
    //         $fileTmpName = $_FILES['file']['tmp_name'][$count];

    //         $toFolder = "../../storage/album_data/".$_SESSION['name'];
    //         if (!file_exists($toFolder)) {
    //             mkdir($toFolder);
    //         }
    //         $target = "../../storage/album_data/".$_SESSION['name']."/".$originalFileName;
    //         $query = "INSERT INTO `album_data` (`user_id`, `album_id`, `media_name`) VALUES ('$uid', '$album_id', '$originalFileName')";
    //         if(mysqli_query($conn, $query)) {
    //             if(move_uploaded_file($fileTmpName, $target)) {
    //                 echo 'true';
    //             }
    //             else {
    //                 echo 'notMove';
    //             }
    //         }
    //         else {
    //             echo 'db';
    //         }
    //         $count++;
    //     }
    //     exit();

    // }
    // else if($_POST['navbar_upload_folder_id'] != '') {
    //     $file = $_FILES['file'];
    //     $album_id = $_POST['navbar_upload_folder_id'];
    //     $count = 0;
        
    //     while($count < count($_FILES['file']['name'])) {
    //         $originalFileName = $_FILES['file']['name'][$count];
    //         $fileTmpName = $_FILES['file']['tmp_name'][$count];

    //         $toFolder = "../../storage/folder_data/".$_SESSION['name'];
    //         if (!file_exists($toFolder)) {
    //             mkdir($toFolder);
    //         }
    //         $target = "../../storage/folder_data/".$_SESSION['name']."/".$originalFileName;
    //         $query = "INSERT INTO `folder_data` (`user_id`, `folder_id`, `document_name`) VALUES ('$uid', '$album_id', '$originalFileName')";
    //         if(mysqli_query($conn, $query)) {
    //             if(move_uploaded_file($fileTmpName, $target)) {
    //                 echo 'true';
    //             }
    //             else {
    //                 echo 'notMove';
    //             }
    //         }
    //         else {
    //             echo 'db';
    //         }
    //         $count++;
    //     }
    //     exit();
    // }
    else {
        // print_r($_FILES['file']);

        $file = $_FILES['file'];
        $count = 0;
        
        while($count < count($_FILES['file'])) {
            $originalFileName = $_FILES['file']['name'];
            $fileTmpName = $_FILES['file']['tmp_name'];

            $toFolder = "../../storage/users/".$_SESSION['uid'];
            if (!file_exists($toFolder)) {
                mkdir($toFolder);
                if (!file_exists($toFolder.'/recent')) {
                    mkdir($toFolder.'/recent');
                }
            }
            $target = "../../storage/users/".$_SESSION['uid']."/recent/".$originalFileName;
            $query = "INSERT INTO `recent` (`user_id`, `recent_name`) VALUES ('$uid', '$originalFileName')";
            if(mysqli_query($conn, $query)) {
                if(move_uploaded_file($fileTmpName, $target)) {
                    echo 'true';
                }
                else {
                    echo 'notMove';
                }
            }
            else {
                echo 'db';
            }
            $count++;
        }
        exit();
    }

    // else {
    //     echo 'upload 404';
    // }




