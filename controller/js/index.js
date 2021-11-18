$('#signupBx').hide(function() {
    $(this).animate(500)
})
$('#forgotBx').hide(function() {
    $(this).animate(500)
})

$(document).on('click', '.signin', function() {
    $('#signupBx').hide(function() {
        $(this).animate(500)
    })
    $('#signinBx').show(function() {
        $(this).animate(500)
    })
    $('#forgotBx').hide(function() {
        $(this).animate(500)
    })
});
$(document).on('click', '.signup', function() {
    $('#signupBx').show(function() {
        $(this).animate(500)
    })
    $('#signinBx').hide(function() {
        $(this).animate(500)
    })
    $('#forgotBx').hide(function() {
        $(this).animate(500)
    })
});
$(document).on('click', '.forgot', function() {
    $('#signinBx').hide(function() {
        $(this).animate(500)
    })
    $('#signupBx').hide(function() {
        $(this).animate(500)
    })
    $('#forgotBx').show(function() {
        $(this).animate(500)
    })
});


//* sign in/up  with google *//
function onSuccess(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    let google_auth = true;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/controller/php/google_auth.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (xhr.responseText == 'true') {
                window.location.href = `http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/my-gallery`;
            } else if (xhr.responseText == 'emailNotSendErr') {
                $('#login_warn').html('<h6 class="text-center text-success">Account is created <span class="text-danger">but, Email not sent !</span></h6>')
            } else if (xhr.responseText == 'acccountNotCreateErr') {
                $('#login_warn').html('<h6 class="text-center text-danger">For some reason Account not created !</h6>')
            } else if (xhr.responseText == 'googleEmailSubNotVerify') {
                $('#login_warn').html('<h6 class="text-center text-danger">Google sub ID not verified !</h6>')
            } else if (xhr.responseText == 'errorGoogleEmailNotVerified') {
                $('#login_warn').html('<h6 class="text-center text-danger">Google Email not verified !</h6>')
            } else {
                console.log(xhr.responseText);
            }
        } else {
            console.log('<2');
            $('#login_warn').html('<h6 class="text-center text-warning"><span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> Please wait...</h6>')
        }
    }
    xhr.send(`google_auth=${google_auth}&idtoken=${id_token}`);
}

function onFailure(error) {
    // console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'longtitle': true,
        'theme': 'light',
        'onsuccess': onSuccess,
    });
}



//* user login event handling here *//
$(document).on('click', '#login-btn', function(e) {
    let email = $('.signinBx #email').val();
    let password = $('.signinBx #password').val();
    if (email == '' || password == '') {
        $('#login_warn').html('<h6 class="text-center text-warning">Email or Password cannot be be blank</h6>')
    } else {
        $(this).html('<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Logging In...');
        $(this).attr('disabled', true);
        let login = true;
        var xhr = new XMLHttpRequest();
        var url = `http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/controller/php/auth`;

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (xhr.responseText == 'true') {
                    // $('#login_warn').html(`<h6 class="text-center text-primary">${xhr.responseText}</h6>`)
                    // setTimeout(function() {
                    window.location.href = `http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/my-gallery`;
                    // }, 2000);
                } else if (xhr.responseText == 'passErr') {
                    $('#login_warn').html('<h6 class="text-center text-danger">Wrong credentials !</h6>')
                    $('#login-btn').attr('disabled', false);
                    $('#login-btn').text(`Log In`);
                } else if (xhr.responseText == 'userErr') {
                    $('#login_warn').html('<h6 class="text-center text-danger">Account not found !</h6>')
                    $('#login-btn').attr('disabled', false);
                    $('#login-btn').text(`Log In`);
                } else if (xhr.responseText == 'userSignininWithGoogle') {
                    $('#login_warn').html('<h6 class="text-center text-warning">You Created account with google so you cannot login with password !</h6>')
                    $('#login-btn').attr('disabled', false);
                    $('#login-btn').text(`Log In`);
                } else {
                    $('#login_warn').html(`<h6 class="text-center text-primary">${xhr.responseText}</h6>`)
                    $('#login-btn').attr('disabled', false);
                    $('#login-btn').text(`Log In`);
                }
            }
        };
        xhr.send(`login=${login}&email=${email}&password=${password}`);
    }
})


//* user registration event handling here *//
$(document).on('click', '#signup-btn', function(e) {
    let name = $('.signupBx #name').val();
    let email = $('.signupBx #email').val();
    let password = $('.signupBx #password').val();
    let hcaptcha = $('[name=h-captcha-response]').val();

    if (email == '') {
        $('#signup_warn').html('<h6 class="text-center text-warning">Nothing should be be blank</h6>')
    } else {
        $(this).html('<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Creating Account...');
        $(this).attr('disabled', true);
        let signup = true;
        var xhr = new XMLHttpRequest();
        var url = `http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/controller/php/auth`;

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (xhr.responseText == 'true') {
                    $('#signup_warn').html(`<h6 class="text-center text-success">Account Created Successfully, <span class="text-warning">Redirecting...</span></h6>`)
                        // setTimeout(() => {
                    window.location.href = `http://ec2-18-216-1-22.us-east-2.compute.amazonaws.com/my-gallery`;
                    // }, 2000);
                } else if (xhr.responseText == 'emailNotSendErr') {
                    $('#signup_warn').html('<h6 class="text-center text-success">Account is created <span class="text-danger">but, Email not sent !</span></h6>')
                    $('#signup-btn').text(`Create Account`);
                    $('#signup-btn').attr('disabled', false);
                } else if (xhr.responseText == 'acccountNotCreateErr') {
                    $('#signup_warn').html('<h6 class="text-center text-danger">For some reason Account not created !</h6>')
                    $('#signup-btn').text(`Create Account`);
                    $('#signup-btn').attr('disabled', false);
                } else if (xhr.responseText == 'emailAlreadyExistErr') {
                    $('#signup_warn').html('<h6 class="text-center text-warning">Email is already in use !</h6>')
                    $('#signup-btn').text(`Create Account`);
                    $('#signup-btn').attr('disabled', false);
                } else if (xhr.responseText == 'captchaErr') {
                    $('#signup_warn').html('<h6 class="text-center text-danger">Captcha not solved !</h6>')
                    $('#signup-btn').text(`Create Account`);
                    $('#signup-btn').attr('disabled', false);
                } else {
                    $('#signup_warn').html(`<h6 class="text-center text-primary">${xhr.responseText}</h6>`)
                    $('#signup-btn').text(`Create Account`);
                    $('#signup-btn').attr('disabled', false);
                }
            }
        };
        xhr.send(`signup=${signup}&name=${name}&email=${email}&password=${password}&hcaptcha=${hcaptcha}`);
    }
})



//* user login pasword forgot handling here *//
// $(document).on('click', '#lo-btn', function(e) {

// })