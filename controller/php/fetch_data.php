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
    


    //*  Database operations begins
    
    $uid = $_SESSION['uid'];

 
    if(isset($_POST['folder_mongo'])) { 
        $row = $_USER_DATA_COLLECTION->findOne(['user_id' => strval($uid)]);
        $row = iterator_to_array($row); 
        $flag = 0;
        // echo json_encode($row);
        function nested_call($val, $flag) {
            $flag++;
            if($val != '') { 
              foreach($val as $key => $val) {   
                echo '
                    <li id="'.$key.'" >
                        
                        <div class="toggler folder-extend-icon d-flex mainDiv" id="arrow-'.$key.'" onclick="toggle_rotate(\''.$key.'\')"  oncontextmenu="folder_context_menu(event, \''.$key.'\')">
                             
                             
                                <i class=" bi bi-caret-right-fill my-auto me-2 text" ></i>
                             

                            <div class="folder-link-div">
                                <a class="text pe-3" id="'.$key.'"  onclick="folder_information(\''.$key.'\')"><i class="bi bi-folder-fill my-auto me-2 text-info"></i>'.$key.'</a>
                            </div>
                        
                        </div>
                        
                        <ul>
                ';
 
                $flag++; 
                nested_call($val, $flag);
                
                $flag++;
                echo '</ul> 
                    </li>';
                
            }
          }
        }

        nested_call($row['my_gallery'], $flag); 

    }

 
    // fetching  folder content data from mysql database
    else if(isset($_POST['folder_view'])) {
        $folder_id = $_POST['folder_id'];
          
        $arr['test'] = array('a', 'd', 'f'); 
        $nested_folders = array(); 
    
        $data = $_USER_DATA_COLLECTION->findOne(['user_id' => strval($uid)]);
        $data = iterator_to_array($data); $data = $data['my_gallery']; 
                
        function fun($val, $folder_id, $nested_folders) {
            foreach($val as $key => $val) {
                if($key == $folder_id) {
                    foreach($val as $key => $val) {
                        // array_push($nested_folders , array('encrypt'=>$key, 'decrypt'=>encrypt_decrypt($key, 'decrypt'))); 
                        array_push($nested_folders , array('encrypt'=>$key, 'decrypt'=>$key)); 
                    }
                    return $nested_folders ;
                } 
                fun($val, $folder_id, $nested_folders);
            }
        }
 
        
        
        
        // fetching folder data
        $query = "SELECT * FROM `folder_data` WHERE `user_id` = $uid AND `folder_id` = '$folder_id' ORDER BY `folder_data_id` DESC ";
        $result = mysqli_query( $conn, $query ); 
        if($result) {  
            $folder_data['folder_data'] = mysqli_fetch_all($result);
            
            $r['nested_folders'] = fun($data, $folder_id, $nested_folders);
            $ta['f_responce'] = array_merge($arr, $r, $folder_data );
            echo ($folder_data != '') ? json_encode($ta) : 'notFound '.mysqli_error($conn);
             
        }
        else {
            echo mysqli_error($conn);
        }
    }

// 9218
// vijay


    // fetching  home content data from database
    else if(isset($_POST['home_content_data'])) {
        $query = "SELECT * FROM `recent` WHERE `user_id` = $uid ORDER BY `recent_id` DESC ";
        $result = mysqli_query( $conn, $query );
        $row['recent'] = mysqli_fetch_all($result);
        if($result) { 
            $favouriteQuery = "SELECT * FROM `favourite` WHERE `user_id` = $uid";
            $favouriteResult = mysqli_query( $conn, $favouriteQuery );
            $row['fav'] = mysqli_fetch_all($favouriteResult);

            echo json_encode($row);
        }
    }



    // fetching  favourite content data from database
    else if(isset($_POST['favourite'])) {
        $query = "SELECT * FROM `favourite` WHERE `user_id` = $uid ORDER BY `favourite_id` DESC ";
        $result = mysqli_query( $conn, $query );
        if($result) {
            $row['favourite'] = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }



    // fetching album  / folder data from database
    else if(isset($_POST['display_album_data'])) { 
        $album_id = $_POST['album_id'];
        $query = "SELECT * FROM `album_data` WHERE `user_id` = '$uid' AND `album_id` = '$album_id' ORDER BY `album_data_id` DESC";
        $result = mysqli_query( $conn, $query );
        $responce_obj = mysqli_fetch_all($result);
        if($result) { 
            echo json_encode($responce_obj);
        }
    }


















    // dynamic URL
    else if(isset($_POST['album_n'])) {
        $album_name = $_POST['album_n'];
        echo json_encode(array(
            'status'=>'success',
			'data'=>'This is <strong>'.$album_name.'</strong>',
            'title'=> $_SESSION['name'].' | Album - '.$album_name,
            'res_url' => 'my-gallery/'.$album_name,
        ));
    }
    else {
        echo '404';
    }
