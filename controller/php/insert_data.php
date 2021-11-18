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
 
    }
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




