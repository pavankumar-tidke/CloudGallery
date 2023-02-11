
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
    var url = `http://localhost/controller/php/live_operation`;
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
    var url = `http://localhost/controller/php/live_operation`;
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
    var url = `http://localhost/controller/php/live_operation`;
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

//***** preview functionallity *****//
function preview(i, display_category, media_id) {
    $('#previweModal').modal('show');
    $('#previweModal .media_id').text(media_id);
    $('#previweModal .media-view').html(`<span class="spinner-border spinner-border-sm mx-2 text-light" role="status" aria-hidden="true"></span>`);
    // sending request to server for preview
    let preview = true;
    var url = `http://localhost/controller/php/live_operation`;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {  
            let responce_obj = JSON.parse(this.response),
                media_name = responce_obj[0][2],
                media_src = `http://localhost/storage/users/${uid}/recent/${media_name}`,
                media_view; 

            $('#previweModal .media-name').html(media_name); 
 
            if (media_name.split(".").pop() == "mp4" || media_name.split(".").pop() == "webm") {
                media_view = `
                    <iframe height="980" width="1820"
                        src="${media_src}">
                    </iframe>
                `;
                
            }
            else if(media_name.split(".").pop() == "mp3") {
                media_view = `<audio controls>
                        <source src="${media_src}" type="audio/ogg">
                        <source src="${media_src}" type="audio/mp3"> 
                </audio>`;
  
            }
            else {
                media_view = `
                    <img src="${media_src}" class="card-img-top" height="980" width="1820"
                    alt="image" />
                `
            }
 
            $('#previweModal .media-view').html(media_view); 
        }
    }
    xhr.send(`preview=${preview}&display_category=${display_category}&media_id=${media_id}`);
}
$(document).on('click', '.preview-close', function() {
    $('#previweModal').modal("hide"); 
    $('.media-view').empty(); 
})
 

//***** search functionallity *****//
function searchmedia() { 
    // Get the search query
    var q = document.getElementById("search_query").value;

    // Create the XHR request
    if(q != "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost/controller/php/live_operation?q=" + q, true);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let responce_obj = JSON.parse(this.responseText);
                console.log(responce_obj);
                $("#search-data-content-recent").empty();
                if (responce_obj.recent.length > 0) {
                    $(".home-content").hide();
                    
                  var Favourite, favFunc, mediaCardFooterMobile = "";
                  for (let x = 0; x < responce_obj.recent.length; x++) {
                    // checking favourite
                    if (responce_obj["recent"][x][3] == 1) {
                      Favourite = `<i class="material-icons my-auto">favorite</i>`;
                      favFunc = `remove_from_Favourite(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')`;
                    } else {
                      Favourite = `<i class="material-icons my-auto">favorite_border</i>`;
                      favFunc = `add_to_Favourite(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')`;
                    }
          
                    // media source
                    let media_src = `http://localhost/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`;
                    let mainCard = ``;
                    let mediaCardFooter = `
                        <div class="dropdown my-auto media-action">
                          <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
                              id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="bi bi-three-dots-vertical my-auto"></i>
                          </a>
                          <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right" aria-labelledby="dropdownUser2">
                            
                            <li><button class="dropdown-item" onclick="rename_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li>
                            <li>
                                <hr class="dropdown-divider text my-1 mx-2">
                            </li>
                            <li><a class="dropdown-item" href="${media_src}" download="${responce_obj["recent"][x][2]}"><i class="material-icons me-2 my-auto">file_download</i>Download</a></li>
                            <li><a class="dropdown-item" onclick="remove_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')"><i class="material-icons me-2 my-auto">delete</i>Remove</a></li>
                            <li>
                                <hr class="dropdown-divider text my-1 mx-2">
                            </li>
                          </ul>
                        </div>                          
                      </div>
                    `;
                    if(window.screen.width < 500) {
                      mediaCardFooterMobile = `
                        <div class="d-flex justify-content-end">
                          <div class="fav my-auto">
                              <button class="btn my-auto" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button>
                          </div>
                          <div class="dropdown my-auto media-action">
                            <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
                                id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots-vertical my-auto"></i>
                            </a>
                            <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right"
                              aria-labelledby="dropdownUser2">
                               
                              <li>
                                  <hr class="dropdown-divider text my-1 mx-2">
                              </li>
                              <li><button class="dropdown-item" onclick="rename_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li> 
                              <li>
                                  <hr class="dropdown-divider text my-1 mx-2">
                              </li>
                              <li><a class="dropdown-item" href="${media_src}" download="${responce_obj["recent"][x][2]}"><i
                                          class="material-icons me-2 my-auto">file_download</i>Download</a>
                              </li>
                              <li><a class="dropdown-item" onclick="remove_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')"><i
                                          class="material-icons me-2 my-auto">delete</i>Remove</a>
                              </li>
                              <li>
                                  <hr class="dropdown-divider text my-1 mx-2">
                              </li>
                               
                            </ul>
                          </div>
                        </div>
                      `;
                    }
          
                    //**** Videos ****//
                    if (responce_obj["recent"][x][2].split(".").pop() == "mp4" || responce_obj["recent"][x][2].split(".").pop() == "webm") {
                      // big cards view
                      // if (window.screen.width > 500) {
                        $("#search-data-content-recent").append(`
                            <div class="col p-2">
                              <div class="card main-card m-1">
                                <div class="img-div" >
                                <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                                  <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})"> 
                                    <img src="http://localhost/asset/other/play-button.svg" style="height: 60px !important; margin-top: 30px;" class="" />
                                  </div> 
                                </div>
                                <hr class="text my-0">
                                <div class="d-flex justify-content-between me-3">
                                  <div class="card-body d-flex">
                                    <i class="bi bi-film me-2 bold text-success"></i>
                                    <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                  </div>
                                  ${mediaCardFooter}
                              </div>
                            </div>
                        `);
                      // }
          
                      // list type view
                      if (window.screen.width < 500) {
                        $("#home-data-content-list-recent").append(`
                              <div class="col">
                                <div class="card main-card-list my-1">
                                  <div class="d-flex justify-content-between px-2">
                                    <a href="#" class="d-flex justify-content-between me-3 my-auto" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})">
                                      <div class="img-div imag my-auto">
                                        <i class="bi bi-film me-2 bold text-success"></i>
                                      </div>
                                      <div class="card-body ms-2">
                                        <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                        <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${responce_obj["recent"][x][4]}</p>
                                      </div>
                                    </a>
                                    ${mediaCardFooterMobile}
                                  </div>
                                </div>
                                <hr class="text-muted my-0 py-0">
                              </div>
                        `);
                      } 
                    }
                    //**** Audio ****//
                    else if (responce_obj["recent"][x][2].split(".").pop() == "mp3") {
                      // big cards view
                      // if (window.screen.width > 500) {
                        $("#search-data-content-recent").append(`
                            <div class="col p-2">
                              <div class="card main-card m-1">
                                <div class="img-div">
                                  <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                                  <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})"> 
                                    <img src="http://localhost/asset/other/dvd-disk.svg" style="height: 60px !important; margin-top: 30px;" class="" />
                                  </div>
                                  <div class="d-flex justify-content-center my-auto audio" id="audio${x}"></div>
                                </div>
                                <hr class="text my-0">
                                <div class="d-flex justify-content-between me-3">
                                  <div class="card-body d-flex">
                                    <i class="material-icons me-2 text-danger">headphones</i>
                                    <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                  </div>
                                  ${mediaCardFooter}
                              </div>
                            </div>
                        `);
                      // }
                      // audio player big cards
                      // $(`#audio${x}`).buttonAudioPlayer({
                      //   src: `http://localhost/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`,
                      //   type: "bar-animation",
                      // });
          
                      // list type view
                      if (window.screen.width < 500) {
                        $("#home-data-content-list-recent").append(`
                          <div class="col">
                            <div class="card main-card-list my-1">
                              <div class="d-flex justify-content-between px-2">
                                <a href="#" class="d-flex justify-content-between me-3 my-auto" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})">
                                    <div class="img-div imag my-auto">
                                      <i class="bi bi-file-earmark-music me-2 bold text-danger"></i>
                                    </div>
                                    <div class="card-body ms-2">
                                        <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                        <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${responce_obj["recent"][x][4]}</p>
                                    </div>
                                </a>
                                ${mediaCardFooterMobile}
                              </div>
                            </div>
                            <hr class="text-muted my-0 py-0">
                          </div>
                        `);
                      }
          
                      // audio player list view
                      $(`#audioList${x}`).buttonAudioPlayer({
                        src: `http://localhost/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`,
                        type: "bar-animation",
                      });
                    }
                    //**** Images ****//
                    else {
                      // Big cards view
                      // if (window.screen.width > 500) {
                        $("#search-data-content-recent").append(`
                          <div class="col p-2">
                            <div class="card main-card m-1">
                              <div class="img-div imag">
                                  <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                                  <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})"> 
                                      <img src="${media_src}" class="card-img-top"
                                          alt="image" />
                                  </div>
                              </div>
                              <hr class="text my-0">
                              <div class="d-flex justify-content-between me-3">
                                <div class="card-body d-flex">
                                  <i class="material-icons me-2 text-info">image</i>
                                  <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                </div>
                                ${mediaCardFooter}
                            </div>
                          </div>
                        `);
                      // }
          
                      // list type view
                      if (window.screen.width < 500) {
                        $("#home-data-content-list-recent").append(`
                            <div class="col">
                              <div class="card main-card-list my-1">
                                <div class="d-flex justify-content-between px-2">
                                  <a href="#" class="d-flex justify-content-between me-3 my-auto" onclick="preview(${x}, 'recent', ${responce_obj["recent"][x][0]})">
                                      <div class="img-div imag my-auto">
                                          <img src="${media_src}"
                                              class="card-img-top" alt="image" />
                                      </div>
                                      <div class="card-body ms-2">
                                          <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${responce_obj["recent"][x][2]}">${responce_obj["recent"][x][2]}</p>
                                          <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${responce_obj["recent"][x][4]}</p>
                                      </div>
                                  </a>
                                  ${mediaCardFooterMobile}
                                </div>
                              </div>
                              <hr class="text-muted my-0 py-0">
                            </div>
                        `);
                      }
                    }
                  }
                } else {
                  $("#search-data-content-recent").append(
                    `<h2 class="text-muted text-center my-5">No Found</h2>`
                  );
                }
                $(document).ready(function () {
                  setTimeout(() => {
                    $(".loading").fadeOut(100);
                  }, 200);
                });
                $(".divload").hide();
                $(".search-content").show();
            }
        };
        xhr.send();
    } else {
        $("#search-data-content-recent").empty();
        $("#search-data-content-recent").append(
            `<h2 class="text-muted text-center my-5">No Found</h2>`
          );
    }
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
        var url = `http://localhost/controller/php/live_operation`;
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
    var url = `http://localhost/controller/php/share_handler`;
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
        var url = `http://localhost/controller/php/live_operation`;
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
    var url = `http://localhost/controller/php/live_operation`;
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


// dashboard set-login-password
$(document).on('click', '.set_login_pass_btn', function() {
    let pass = $('.set_login_pass').val();
    if(pass == '') {
        $('.set_pass_warn').html(`<p class="text-danger">blank_</p>`);
    }
    else {
        $(this).html(`<span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>`);

        let set_pass = true;
        var url = `http://localhost/controller/php/live_operation`;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200) { 

            }
        }
        xhr.send(`set_pass=${set_pass}&pass=${pass}`);
    }
});
