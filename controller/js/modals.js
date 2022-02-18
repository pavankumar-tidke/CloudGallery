


//* New Album create *//
$(document).on('click', '#new-album-create-btn', function(e) {
    let album_name = $('#new-album-name').val();
    if(album_name == '') {
        $('#newAlbum_warn').html('<h6 class="text-center text-warning">Give the name</h6>')
    }
    else {
        $(this).html('<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Creating...');
        $(this).attr('disabled', true);
        let newAlbum = true;
        var xhr = new XMLHttpRequest();
        var url = `http://localhost/controller/php/insert_data.php`;

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if(xhr.responseText == 'true') {
                $('#newAlbum_warn').html(`<h6 class="text-center text-success">Created Album !</h6>`)
                $('#new-album-create-btn').attr('disabled', false);
                $('#new-album-create-btn').text(`Create`);
                $('#album-badge-alert').text('New');
                get_all_albums();
            }
            else if(xhr.responseText == 'false') {
                $('#newAlbum_warn').html('<h6 class="text-center text-danger">Not Created some reason !</h6>')
                $('#new-album-create-btn').attr('disabled', false);
                $('#new-album-create-btn').text(`Create`);
            }
            else {
                $('#newAlbum_warn').html(`<h6 class="text-center text-primary">${xhr.responseText}</h6>`)
                $('#new-album-create-btn').attr('disabled', false);
                $('#new-album-create-btn').text(`Create`);
            }
          }
        };
        xhr.send(`newAlbum=${newAlbum}&album_name=${album_name}`);
    }
})



//* New Folder create *//
$(document).on('click', '#new-folder-create-btn', function(e) {
    let folder_name = $('#new-folder-name').val();
    let r_folder_id = $('#r_folder_id').val();

    console.log(r_clicked_folder_id);
    
    if(folder_name == '') {
        $('#newFolder_warn').html('<h6 class="text-center text-warning">Give folder name</h6>')
    }
    else {
        $(this).html('<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Creating...');
        $(this).attr('disabled', true);
        let newFolder = true;
        var xhr = new XMLHttpRequest();
        var url = `http://localhost/controller/php/insert_data.php`;
  
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if(xhr.responseText == 'true') {
                $('#newFolder_warn').html(`<h6 class="text-center text-"></h6>`)
                ERROR_EXCEPTION('Folder created !', 'success')
                $('#new-folder-create-btn').attr('disabled', false);
                $('#new-folder-create-btn').text(`Create`);
                $("#newFolder").modal("hide");
                setTimeout(() => { 
                  nesting_folder();
                }, 1000);
            }
            else if(xhr.responseText == 'false') {
                $('#newFolder_warn').html('<h6 class="text-center text-danger">Not Created some reason !</h6>')
                $('#new-folder-create-btn').attr('disabled', false);
                $('#new-folder-create-btn').text(`Create`);
            }
            else {
                $('#newFolder_warn').html(`<h6 class="text-center text-primary">${xhr.responseText}</h6>`)
                $('#new-folder-create-btn').attr('disabled', false);
                $('#new-folder-create-btn').text(`Create`);
                // setTimeout(() => { 
                //   nesting_folder();
                // }, 1000);
                console.log(this.response);
                nesting_folder();
                // console.log(curr);
            }
          }
        };  
        console.log(r_clicked_folder_id);
        console.log(current_folder_id);
        xhr.send(`newFolder=${newFolder}&folder_name=${folder_name}&current_folder_id=${current_folder_id}`);
    }
  })
 