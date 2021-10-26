<?php
    session_start();
    // require '../../vendor/autoload.php';
    require '../../database/_db_connect.php';
    
    $uid = $_SESSION['uid'];

    // function encrypt_decrypt($string, $action = 'encrypt') {
    //     $encrypt_method = "aes-128-cbc";
    //     $secret_key = 'AA74CDCC2BBRT935136HH7B63C28'; // user define private key
    //     $secret_iv = '5fgf5HJ5g27'; // user define secret key
    //     $key = hash('md5', $secret_key);
    //     $iv = substr(hash('md5', $secret_iv), 0, 16); // sha1 is hash_hmac_algo
    //     if ($action == 'encrypt') {
    //         $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
    //         $output = base64_encode($output);
    //     } else if ($action == 'decrypt') {
    //         $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    //     }
    //     return $output;
    // }
    

    if(isset($_POST['share_item'])) {
        $display_category = $_POST['display_category'];
        $item_id = $_POST['item_id'];

        $str = 'f1.3';
        $pwd = encrypt_decrypt($str, 'encrypt');
        $dcrypt = encrypt_decrypt($pwd, 'decrypt');

        // MTNWak03VlZnY2ZHYXVibG5hRjdQdz09

        // $hash = hash('md5', $str); 
        // echo var_dump($hash);
        // 912967c63ae45de519f389ee69446153148fc6a63d20acc1541c069a2d4b9a1e
        $row = [
            'data' => [
                'encrypt' => $str,
                'hash' => $pwd,
                'dcrypt' => $dcrypt,
            ],
            // 'other' => [
                // 'methods' => openssl_get_cipher_methods(),
            // ]
        ];

        echo ($row) ? json_encode($row) : 'false'.mysqli_error($conn); 
    }



// NU54M2hNRDBXdCtGNnlYaUU4bCt0UT09
// UFRaRUI2QTgvazdpSi9JcENRVUZHdz09
// UFRaRUI2QTgvazdpSi9JcENRVUZHdz09

