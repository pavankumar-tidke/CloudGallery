<?php
session_start();
// require '../../vendor/autoload.php';
require '../../database/_db_connect.php';

$uid = $_SESSION['uid'];

//** favourite **// 
// adding to favouite 
if (isset($_POST['add_to_Favourite'])) {
    $display_category = $_POST['display_category'];
    $media_id = $_POST['media_id'];
    $folder_id = $_POST['folder_id'];
    $favourite_name = $_POST['media_name'];
    $query = "UPDATE `$display_category` SET `favourite` = '1' WHERE `$display_category" . "_id` = '$media_id'";
    $result = mysqli_query($conn, $query);
    $query = "INSERT INTO `favourite` (`user_id`, `media_category_id`, `media_category_name`, `favourite_name`) VALUES ('$uid', '$media_id', '$display_category', '$favourite_name')";
    $result = mysqli_query($conn, $query);
    // copying file to favourite folder
    ($display_category == 'folder_data') ? $filePath = "../../storage/users/" . $_SESSION['uid'] . "/folders/" . $folder_id . "/"  : $filePath = "../../storage/users/" . $_SESSION['uid'] . "/" . $display_category;

    $toPath = "../../storage/users/" . $_SESSION['uid'] . "/favourite";
    if (!file_exists($toPath)) {
        mkdir($toPath);
    }
    copy($filePath . "/" . $favourite_name, $toPath . "/" . $favourite_name);
    echo ($result) ? 'true' : 'false' . mysqli_error($conn);
}
// removing favouite 
else if (isset($_POST['remove_from_Favourite'])) {
    $display_category = $_POST['display_category'];
    $media_id = $_POST['media_id'];
    $favourite_name = $_POST['media_name'];
    $query = "UPDATE `$display_category` SET `favourite` = '0' WHERE `$display_category" . "_id` = '$media_id'";
    $result = mysqli_query($conn, $query);
    $query = "DELETE FROM `favourite` WHERE `media_category_id` = '$media_id'";
    $result = mysqli_query($conn, $query);
    // remove file
    unlink("../../storage/users/" . $_SESSION['uid'] . "/favourite/" . $favourite_name);
    echo ($result) ? 'true' : 'false' . mysqli_error($conn);
}
// from_favourite_page_remove_Favourite
else if (isset($_POST['from_favourite_page_remove_Favourite'])) {
    $display_category = $_POST['display_category'];
    $category_id = $_POST['category_id'];
    $media_id = $_POST['media_id'];
    $favourite_name = $_POST['media_name'];

    $query = "DELETE FROM `favourite` WHERE `media_category_id` = '$category_id'";
    $result = mysqli_query($conn, $query);
    $query = "UPDATE `$display_category` SET `favourite` = '0' WHERE `$display_category" . "_id` = '$category_id'";
    $result = mysqli_query($conn, $query);
    // remove file
    unlink("../../storage/users/" . $_SESSION['uid'] . "/favourite/" . $favourite_name);
    echo ($result) ? 'true' : 'false' . mysqli_error($conn);
}


// preview
else if (isset($_POST['preview'])) {
    $display_category = $_POST['display_category'];
    $media_id = $_POST['media_id'];

    $query = "SELECT * FROM `$display_category` WHERE `$display_category" . "_id` = '$media_id'";
    $result = mysqli_query($conn, $query);

    echo ($result) ? json_encode(mysqli_fetch_all($result)) : 'false' . mysqli_error($conn);
}



//** rename **// 
// rename item
else if (isset($_POST['rename_item'])) {
    $display_category = $_POST['display_category'];
    $item_id = $_POST['item_id'];
    $rename_name = $_POST['rename_name'];
    $original_name = $_POST['original_name'];

    // renaming in folder
    $filePath = "../../storage/users/" . $_SESSION['uid'] . "/" . $display_category;
    if (file_exists($filePath)) {
        rename($filePath . "/$original_name", $filePath . "/$rename_name");
        // renaming in database
        $query = "UPDATE `$display_category` SET `$display_category" . "_name` = '$rename_name' WHERE `$display_category" . "_id` = '$item_id'";
        $result = mysqli_query($conn, $query);
        echo ($result) ? 'yes' : 'false' . mysqli_error($conn);
    }
}




//** delete **// 
// removing item
else if (isset($_POST['remove_item'])) {
    $display_category = $_POST['display_category'];
    $media_id = $_POST['media_id'];
    $media_name = $_POST['media_name'];
    $query = "DELETE FROM `$display_category` WHERE `$display_category" . "_id` = '$media_id'";
    $result = mysqli_query($conn, $query);
    unlink("../../storage/users/" . $_SESSION['uid'] . "/" . $display_category . "/" . $media_name);
    echo ($result) ? $media_id : 'false ' . mysqli_error($conn);
}





//** dashboard ***//
else if (isset($_POST['dashboard'])) {

    $query = "SELECT * FROM `recent` WHERE `user_id` = '$uid'";
    $result = mysqli_query($conn, $query);
    $row['dataCount'] = mysqli_fetch_all($result);
 


    // print_r($r);
    function formatBytes($size, $precision = 2) {
        $base = log($size, 1024);
        $suffixes = array('', ' K', ' M', ' G', ' T');   

        return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
    }
    function folderSize($dir) {
        $size = 0; 
        foreach (glob(rtrim($dir, '/').'/*', GLOB_NOSORT) as $each) {
            $size += is_file($each) ? filesize($each) : folderSize($each);
        }

        return formatBytes($size);
    }
 
    $dir = "../../storage/users/" . $_SESSION['uid'] . "/recent/"; 
    $row['dataSize'] = folderSize($dir);
 
    

    echo ($result) ? json_encode($row) : 'false' . mysqli_error($conn);

} 

// Check if the XHR request was sent
else if (isset($_GET["q"])) {
    $q = $_GET["q"];
 
    // Query the database to find all the media names that match the search query
    $result = mysqli_query($conn, "SELECT * FROM recent WHERE user_id = '$uid' AND recent_name LIKE '%$q%' ORDER BY `recent_id` DESC ");

    // Fetch the results as an array
    $search_result['recent'] = mysqli_fetch_all($result);

    // Return the results as a JSON encoded string
    echo json_encode($search_result);
}


// set password
else if (isset($_POST['set_pass'])) { 
    
}





else {
    echo '404';
}
