<?php 

    require '../../database/_db_connect.php';
    // require  '../../vendor/autoload.php';
    // use MongoDB\Client as mongo;
    // $mongoConn = new mongo;
    // $mondb = $mongoConn->SmartGallery;
    // $_USER_DATA_COLLECTION = $mondb->user_data;

    // error_reporting(0);

    if(isset($_POST['login'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        
        $query = "SELECT * FROM `user` WHERE `Email` = '$email'";
        $result = mysqli_query( $conn, $query );
        $num = mysqli_num_rows( $result );

        if ( $num == 1 ) {
            $row = mysqli_fetch_assoc( $result );
            if (!$row['Password'] == null  ) {
                if (password_verify( $password,  $row['Password'])) {
                    session_start();
                    $_SESSION['loggedin'] = true;
                    $_SESSION['email'] = $email;
                    $_SESSION['uid'] = $row['user_id'];
                    $_SESSION['name'] = $row['Name'];
                    $_SESSION['profileImg'] = $row['user_img'];

                    echo 'true';
                    exit();
                }   
                else {
                    echo 'passErr';
                }
            }
            else {
                echo  'userSignininWithGoogle';
            }
        } 
        else {
            echo 'userErr';
        }
    }
    else if(isset($_POST['signup'])) { 
        $name = $_POST['name'];
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $hcaptcha = $_POST['hcaptcha'];

        // $data = array(
        //     'secret' => '0xd36232060c2727eDE97A8A9F6c61ffa636779cb2',
        //     'response' => $hcaptcha
        // );
        // $verify = curl_init();
        // curl_setopt( $verify, CURLOPT_URL, 'https://hcaptcha.com/siteverify' );
        // curl_setopt( $verify, CURLOPT_POST, true );
        // curl_setopt( $verify, CURLOPT_POSTFIELDS, http_build_query( $data ) );
        // curl_setopt( $verify, CURLOPT_RETURNTRANSFER, true );
        // $response = curl_exec( $verify );
        // $responseData = json_decode( $response );
        // if ( $responseData->success ) { 
            $userQuery = "SELECT * FROM `user` WHERE `Email` = '$email'";
            $userQueryResult = mysqli_query( $conn, $userQuery );
            $row = mysqli_num_rows( $userQueryResult );
            if ( !$row > 0 ) {
                $hash = password_hash( $pass, PASSWORD_DEFAULT );
                $query = "INSERT INTO `user` (`Name`, `Email`, `Password`) VALUES ('$name', '$email', '$hash')";
                $result = mysqli_query( $conn, $query );
                if ($result) {
                    $Query = "SELECT * FROM `user` WHERE `Email` = '$email'";
                    $QueryResult = mysqli_query( $conn, $userQuery );
                    $row = mysqli_fetch_assoc( $QueryResult );
                    // $myGalleryObject = ( Object )[];
                    // $r = $_USER_DATA_COLLECTION->insertOne([
                    //     'user_id' => $row['user_id'],
                    //     'my_gallery' => $myGalleryObject,
                    // ]);
                    // include '../email/user_signup.php';
                    // if($send == true) {
                        session_start();
                        $_SESSION['loggedin'] = true;
                        $_SESSION['email'] = $email;
                        $_SESSION['uid'] = $row['user_id'];
                        $_SESSION['name'] = $name;
                        // $_SESSION['profileImg'] = $row['user_img'];

                        // session data storing in localstorage
                        // $session_token = password_hash( $email, PASSWORD_DEFAULT );
                        // time();
                        // $query = "UPDATE `user` SET `session_token` =  WHERE `email` = '$email'";
                        // $result = mysqli_query( $conn, $query );
                        // if($result) {
                        //     $_SESSION['session_token'] = $session_token;
                            // echo 'true';
                            // exit();
                        // }
                        // else {
                        //     echo 'sessionTokenNotGenerate';
                        // }


                        echo 'true';
                        exit();
                    // }
                    // else {
                    //     echo 'emailNotSendErr';
                    // }
                } 
                else {
                    echo 'acccountNotCreateErr';
                }
            } 
            else {
                echo 'emailAlreadyExistErr';
            }
        // } 
        // else {
        //     echo 'captchaErr';
        // }
    }
    else {
        echo '404';
    }