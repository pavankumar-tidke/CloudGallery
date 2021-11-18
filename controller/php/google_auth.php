<?php 
    require '../../vendor/autoload.php';
    require '../../database/_db_connect.php';

    if(isset($_POST['google_auth'])) {
        // Get $id_token via HTTPS POST.
        $CLIENT_ID = '112755902562-2lj8sob666ut6tqcjf9l844j7n0ctpo6.apps.googleusercontent.com';
        $client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
        
        $id_token = $_POST['idtoken'];
    
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {

            //verifying email 
            if($payload['email_verified'] == 1) {

                // getting info from google
                $name = $payload['given_name'];
                $email = $payload['email'];
                $sub = $payload['sub'];

                // checking user if already exists
                $userQuery = "SELECT * FROM `user` WHERE `Email` = '$email'";
                $userQueryResult = mysqli_query( $conn, $userQuery );
                $row = mysqli_num_rows( $userQueryResult );

                // if email is not exists then create account
                if ( !$row > 0 ) {
                    $sub = password_hash( $sub, PASSWORD_DEFAULT );
                    $query = "INSERT INTO `user` (`Name`, `Email`, `sub`) VALUES ('$name', '$email', '$sub')";
                    $result = mysqli_query( $conn, $query );
                    if ($result) {
                        // include '../email/user_signup.php';
                        // if($send == true) {
                            session_start();

                            // getting info after creating account
                            $userQuery = "SELECT * FROM `user` WHERE `Email` = '$email'";
                            $userQueryResult = mysqli_query( $conn, $userQuery );
                            $row = mysqli_fetch_assoc( $userQueryResult );

                            // Initilizing  session variables
                            $_SESSION['loggedin'] = true;
                            $_SESSION['email'] = $email;
                            $_SESSION['uid'] = $row['user_id'];
                            $_SESSION['name'] = $name;
                            $_SESSION['profileImg'] = $payload['picture'];
                            $_SESSION['msg'] = 'Welcome to the Smart Gallery !';

                            // if everything is fine then return true
                            echo 'true';
                            exit();
                        // }
                        // else {
                        //     echo 'emailNotSendErr';
                        // }
                    } 
                    else {
                        echo 'acccountNotCreateErr'.mysqli_error($conn);
                    }
                }
                else {
                    // if email is exist then verify the things
                    $row = mysqli_fetch_assoc( $userQueryResult );
                    if(password_verify( $sub, $row['sub'] )) {
                        session_start();
                        $_SESSION['loggedin'] = true;
                        $_SESSION['email'] = $email;
                        $_SESSION['uid'] = $row['user_id'];
                        $_SESSION['name'] = $name;
                        $_SESSION['profileImg'] = $payload['picture'];
                        $_SESSION['msg'] = 'you are loggin';

                        echo 'true';
                        exit();
                    }
                    else {
                        echo 'googleEmailSubNotVerify'.mysqli_error($conn);
                    }
                }
            }
            else {
                echo 'errorGoogleEmailNotVerified'.mysqli_error($conn);
            }
        } 
        else {
            // Invalid ID token
            echo 'Invalid_ID_token'.mysqli_error($conn);
        }
    }
