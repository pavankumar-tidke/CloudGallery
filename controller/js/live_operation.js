
var rename_name, original_name, item_id = '';



//***** favourite functionallity *****//
function add_to_Favourite(i, display_category, media_id, media_name, folder_id=null) {
    $(`#favBtn${i}`).html(`<i class="material-icons my-auto">favorite</i>`);
    let media_n = media_name;
    if(rename_name != '') {
        if(item_id == media_id) {
            $(`#favBtn${i}`).attr('onclick', `remove_from_Favourite(${i}, '${display_category}', ${media_id}, '${rename_name}')`);
            media_n = rename_name;
        }
        else {
            $(`#favBtn${i}`).attr('onclick', `remove_from_Favourite(${i}, '${display_category}', ${media_id}, '${media_name}')`);
        }
    }
    else {
        $(`#favBtn${i}`).attr('onclick', `remove_from_Favourite(${i}, '${display_category}', ${media_id}, '${media_name}')`);
    }
    
    // sending request to server for ADD the item to favourite list
    let add_to_Favourite = true;
    var url = `http://localhost/CloudGallery/controller/php/live_operation`;
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            add_to_Favourite: add_to_Favourite,
            display_category: display_category,
            media_id: media_id,
            folder_id: folder_id,
            media_name: media_n,
        },
        success: (responce) => {
            console.log(responce);
        },
    })
}

function remove_from_Favourite(i, display_category, media_id, media_name) {
    $(`#favBtn${i}`).html(`<i class="material-icons my-auto">favorite_border</i>`);
    if(rename_name != '') {
        if(item_id == media_id) {
            // $(`#favBtn${i}`).attr('onclick', `remove_from_Favourite(${i}, '${display_category}', ${media_id}, '${rename_name}')`);
            $(`#favBtn${i}`).attr('onclick', `add_to_Favourite(${i}, '${display_category}', ${media_id}, '${rename_name}')`);
        }
        else {
            $(`#favBtn${i}`).attr('onclick', `add_to_Favourite(${i}, '${display_category}', ${media_id}, '${media_name}')`);
        }
    }
    else {
        $(`#favBtn${i}`).attr('onclick', `add_to_Favourite(${i}, '${display_category}', ${media_id}, '${media_name}')`);
    }
    
    // sending request to server for REMOVE the item from favourite list
    let remove_from_Favourite = true;
    var url = `http://localhost/CloudGallery/controller/php/live_operation`;
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            remove_from_Favourite: remove_from_Favourite,
            display_category: display_category,
            media_id: media_id,
            media_name: media_name,
        },
        onsuccess: (responce) => {
            console.log(responce);
        },
        onerror: (err) => {
            console.log(err);
        }
    })
}
function from_favourite_page_remove_Favourite(i, display_category, category_id, media_id, media_name) {
    // sending request to server for REMOVE the item from favourite list
    let from_favourite_page_remove_Favourite = true;
    var url = `http://localhost/CloudGallery/controller/php/live_operation`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) { 
            ERROR_EXCEPTION('Removed from favourite', 'success')
            $(`.favourite-content #favCardId${i}`).remove();
        }
    }
    xhr.send(`from_favourite_page_remove_Favourite=${from_favourite_page_remove_Favourite}&display_category=${display_category}&category_id=${category_id}&media_id=${media_id}&media_name=${media_name}`);

    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     data: {
    //         from_favourite_page_remove_Favourite: from_favourite_page_remove_Favourite,
    //         display_category: display_category,
    //         category_id: category_id,
    //         media_id: media_id,
    //         media_name: media_name,
    //     },
    //     success: (responce) => {
    //         ERROR_EXCEPTION('Removed from favourite', 'success')
    //         setTimeout(() => {
    //             favourite_content_view();
    //         }, 1000);
    //     },
    // })
}



//***** rename media items functionallity *****//
function rename_item(i, display_category, media_id, media_name) {
    $(`#renameItem #card-id`).val(i);
    $(`#renameItem #rename-item-name, #rename-item-original-name`).val($(`#item_name${i}`).text());
    $(`#renameItem #rename-item-id`).val(media_id);
    $(`#renameItem #rename-item-category`).val(display_category);
}
$(document).on('click', '#rename-item-btn', (e) => {
    rename_name = $(`#renameItem #rename-item-name`).val();
    original_name = $(`#renameItem #rename-item-original-name`).val();
    if(rename_name != original_name) {
        let card_id = $(`#renameItem #card-id`).val();
        item_id = $(`#renameItem #rename-item-id`).val()
        let display_category = $(`#renameItem #rename-item-category`).val()
        $(`#rename-item-btn`).html(`<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Renaming...`);
        $(`#rename-item-btn`).attr('disabled', true)

        // sending request to server for RENAMING
        let rename_item = true;
        var url = `http://localhost/CloudGallery/controller/php/live_operation`;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200) { 
                $(`#item_name${card_id}`).html(`${rename_name}`);
                $(`#item_name${card_id}`).attr('title', rename_name);
                $("#renameItem").modal("hide");
                $(`#rename-item-btn`).html('Rename')
                $(`#rename-item-btn`).attr('disabled', false)
            }
        }
        xhr.send(`rename_item=${rename_item}&rename_name=${rename_name}&original_name=${original_name}&item_id=${item_id}&display_category=${display_category}`);
    }
    else {
        $(`#renameItem_warn`).html(`<p class="text-warning"><i>Nothing changes</i></p>`);
    }
})

//***** Share items functionallity *****//
function share_item(i, display_category, media_id, media_name) {
    $('#shareItem .modal-body .link-div').html($('.modaloader').show());

    // sending request to server for creating share link
    let share_item = true;
    var url = `http://localhost/CloudGallery/controller/php/share_handler`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) { 
            let responce_obj = JSON.parse(this.response);
            $('.modaloader').hide();
            console.log(responce_obj);
            // console.log(this.response);
            // $('#shareItem .modal-body .link-div').html(`${this.response}`);
            // $('#shareItem .modal-body .link-div').html(`
            //     <input type="text" class="form-control me-2" value="asd">
            //     <button type="button" class="btn default-btn px-3 py-1" id="copy_to_clipboard" >Copy</button>
            // `);
        }
    }
    xhr.send(`share_item=${share_item}&item_id=${media_id}&display_category=${display_category}`);
}


//***** move to functionallity *****//
function move_item(i, display_category, media_id, media_name) {
    $(`#renameItem #card-id`).val(i);
    $(`#renameItem #rename-item-name, #rename-item-original-name`).val($(`#item_name${i}`).text());
    $(`#renameItem #rename-item-id`).val(media_id);
    $(`#renameItem #rename-item-category`).val(display_category);
}
$(document).on('click', '#move-item-btn', (e) => {
    rename_name = $(`#renameItem #rename-item-name`).val();
    original_name = $(`#renameItem #rename-item-original-name`).val();
    if(rename_name != original_name) {
        let card_id = $(`#renameItem #card-id`).val();
        item_id = $(`#renameItem #rename-item-id`).val()
        let display_category = $(`#renameItem #rename-item-category`).val()
        $(`#rename-item-btn`).html(`<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>Renaming...`);
        $(`#rename-item-btn`).attr('disabled', true)

        // sending request to server for RENAMING
        let rename_item = true;
        var url = `http://localhost/CloudGallery/controller/php/live_operation`;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200) { 
                $(`#item_name${card_id}`).html(`${rename_name}`);
                $(`#item_name${card_id}`).attr('title', rename_name);
                $("#renameItem").modal("hide");
                $(`#rename-item-btn`).html('Rename')
                $(`#rename-item-btn`).attr('disabled', false)
            }
        }
        xhr.send(`rename_item=${rename_item}&rename_name=${rename_name}&original_name=${original_name}&item_id=${item_id}&display_category=${display_category}`);
    }
    else {
        $(`#renameItem_warn`).html(`<p class="text-warning"><i>Nothing changes</i></p>`);
    }
})

 



//***** delete item *****//
function remove_item(i, display_category, media_id, media_name) {
    let remove_item = true;
    var url = `http://localhost/CloudGallery/controller/php/live_operation`;
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            remove_item: remove_item,
            display_category: display_category,
            media_id: media_id,
            media_name: media_name,
        },
        success: (responce) => {
            ERROR_EXCEPTION('Item removed', 'warning');
            home_content_view();
        },
    })
}



