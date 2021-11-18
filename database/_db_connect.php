<?php

    // windows AWS server pass - oJEG&MipW(IZCzyI@Zi7B?AFj;F2HUQH 
    // windows AWS server 2 pass - 4O)Llp!Xzgww2haFWKd7aO-L5CCBf;vN


    // http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/cloud/
    // localhost



    // $server_name = 'http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/cloud/';
    // $server_name = 'http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/';
    $server_name = 'localhost';
    $user_name = 'root';
    $password = '';
    $database_name = 'cloudgallery';


    // infinity free 
    // $server_name = 'sql111.epizy.com';
    // $user_name = 'epiz_27199751';
    // $password = 'rddV7b590Q';
    // $database_name = 'epiz_27199751_localhost'; 

    // Vulter
    // $server_name = '202.182.110.168';
    // $user_name = 'root';
    // $password = '1Business@';
    // $database_name = 'localhost';

    $conn = mysqli_connect( $server_name, $user_name, $password, $database_name );

    if (!$conn) {
        // header("location: ./server refused.php");
        die("mysql server not connect " . mysqli_connect_error());
    }
    // else {
    //     $db = new mongo;
    //     $collection = $db->user;
    //     print_r($collection);
    // } 















    //***********  ENCRYPTION and DECRYPTION ALGO  *************//

    /**
     * encrypt_decrypt function description
     * @param string $string
     * @param string $action
     * 
     */
    function encrypt_decrypt($string, $action) {
        if($string != '') {
            $encrypt_method = "AES-256-CBC";
            $secret_key = 'AA74CDCC2BBRT935136HH7B63C27'; // user define private key
            $secret_iv = '5fgf5HJ5g27'; // user define secret key
            $key = hash('sha1', $secret_key);
            $iv = substr(hash('sha1', $secret_iv), 0, 16); // sha256 is hash_hmac_algo
            if ($action == 'encrypt') {
                $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
                $output = base64_encode($output);
            } else if ($action == 'decrypt') {
                $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
            }
            else {
                $output = 'Action not specified.';
            }
        }
        else {
            
            $output = 'String cannot be blank.';
        }
        return $output;
    }

