

//****** page Entry */ 
var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
if(urlLastIndex == 'my-gallery') {
  $('.divload').show();
  $('.Sidebar .sideul .my_gallery').addClass('nav-link-active').siblings().removeClass('nav-link-active'); 
  $('#favourite-data-content, #folder-data-content').empty()
  $('#favourite-data-content-list, #home-data-content-list-recent').empty()
  $('.favourite-content, .folder-content').hide();
  $('.home-content').show();
  home_content_view();
  $('.divload').hide(); 
} 
else if(urlLastIndex == 'favourite') {
  $('.divload').show();
  $('.Sidebar .sideul .fav').addClass('nav-link-active').siblings().removeClass('nav-link-active')
  $('#home-data-content-recent, #folder-data-content').empty()
  $('#home-data-content-list-recent, #home-data-content-list-recent').empty()
  $('.home-content').hide(); 
  $('.favourite-content, .folder-content').show();
  favourite_content_view();
  $('.divload').hide(); 
}
// else if(urlLastIndex.length === 32) {
//   $('.divload').show(); 
//   $('#home-data-content-recent, #favourite-data-content').empty()
//   $('#home-data-content-list-recent, #favourite-data-content-list').empty()
//   $('.home-content, .home-content').hide(); 
//   $('.folder-content').show();
//   // folder_content_view(urlLastIndex);
//   $('.divload').hide(); 
// } 
else {
  console.log('wrong url '+urlLastIndex); 
}






//********************* after login first of all we store session token in localstorage **************************//
function session_token() {
  const session_token = $("#session_token").val();

  if (localStorage.getItem("SmartGallery") == null) {
    try {
      var SmartGallery = [];
      SmartGallery.push(["session_token", session_token]);
      var localStore = localStorage.setItem(
        "SmartGallery",
        JSON.stringify(SmartGallery)
      );
      console.log(localStorage.getItem("SmartGallery"));
    } catch (err) {
      alert(err.message);
    }
  } else {
    try {
      let getItem = localStorage.getItem("SmartGallery");
      let parse = JSON.parse(getItem);
      parse.push(["session_token", session_token]);
      var localStore = localStorage.setItem(
        "SmartGallery",
        JSON.stringify(parse)
      );
      console.log(localStorage.getItem("SmartGallery"));
    } catch (err) {
      alert(err.message);
    }
  }
}
// session_token()

// **** Theams **** //
$(document).on('click', '.theam-btn', function() {
  let theamColor = $(this).text();          

  if(theamColor == 'Light') {
    $(document.documentElement).css({
      '--body-bg-darkTheam': '#f8f8ff',
      '--body-bg-dark-darkTheam': '#ebebeb',
      '--default-btn-bg-darkTheam': '#ebebeb',
      '--text-color-white-darkTheam': '#000',
      // '--text-color-purple-darkTheam': '#303030',
      // '--nav-link-active-darkTheam': '#404040',
      // '--nav-link-active-bg-darkTheam': '#4adbff4f',
      // '--nav-link-hover-darkTheam': '#606060',
      // '--drop-new-btn-darkTheam': '#fff',
    });
  }
  else if(theamColor == 'Dark') {
    $(document.documentElement).css({
      '--body-bg-darkTheam': '#222222', 
      '--body-bg-dark-darkTheam': '#000', 
      '--default-btn-bg-darkTheam': '#05cafc',
      '--heading-color-darkTheam': '#05cafc', 
      '--text-color-white-darkTheam': '#fff', 
      '--text-color-purple-darkTheam': '#4adbff', 
      '--nav-link-active-bg-darkTheam': '#4adbff4f', 
      '--nav-link-hover-darkTheam': '#4adbff', 
      '--drop-new-btn-darkTheam': '#00ccff',
    });
  }
  else {
    console.log('unknown color');
  }
})



 

//** pre hiding element **//.........
$(".album-view-content, .favourite-content, .divload, .file-status, #side_status_hide, .modaloader, .navbar-status-dropdown").hide();
$(".navbar-file-status, .signout-loading, .nest-folder, .folder-content").hide();
 
if (window.screen.width < 500) {
  $(`#home-data-content-recent`).hide();
  $(`.display-filter`).html(`<i class="bi bi-grid-fill"></i>`); 
} else { 
  $(`#home-data-content-list-recent`).hide(); 
}

//** display filter **//
$(document).on("click", ".display-filter", () => {
  let val = $(`.display-filter`).val();
  if (val == 0) {
    $(`.display-filter`).val(`1`);
    $(`.display-filter`).html(`<i class="bi bi-grid-fill"></i>`);
    $(`#home-data-content-recent`).hide();
    $(`#home-data-content-list-recent`).show(() => {
      $(this).animate(500);
    });
  } else {
    $(`.display-filter`).val(`0`);
    $(`.display-filter`).html(`<i class="bi bi-list-ul icon-bold"></i>`);
    $(`#home-data-content-list-recent`).hide();
    $(`#home-data-content-recent`).show(() => {
      $(this).animate(500);
    });
  }
});

//* Sidebar & navbar*//
$(document).on("click", "#side-toggle-btn", function () {
  $(".card-toggle").toggle(300);
  // $('.Sidebar').toggle(500);
});

//***************************** home content view   *****************************//
// $('.sideul .my_gallery').addClass('nav-link-active')
$(document).on("click", "#sidebar-my-gallery-btn", function () { 
  $('.sideul .my_gallery').addClass('nav-link-active').siblings().removeClass('nav-link-active');
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  if(urlLastIndex == 'my-gallery') {
    console.log('not  reload');
  }
  else {
    // changing url
    dynamic_url("my-gallery");
    home_content_view();
    
    console.log('reload');
  }
  
});
function home_content_view() {
  $('.divload').show(); 
  $('#favourite-data-content').empty()
  $('#favourite-data-content-list').empty()
  $('.favourite-content, .folder-content').hide(); 

  current_folder_id = 'null'; 

  var xhr = new XMLHttpRequest();
  var url = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/controller/php/fetch_data`;

  let home_content_data = true;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responce_obj = JSON.parse(this.responseText);
      $("#home-data-content-recent").empty();
      if (responce_obj.recent.length > 0) {
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
          let media_src = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`;
          let mainCard = ``;
          let mediaCardFooter = `
              <div class="dropdown my-auto media-action">
                <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical my-auto"></i>
                </a>
                <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right" aria-labelledby="dropdownUser2">
                  <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">visibility</i>Preview</a></li>
                  <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">open_with</i>Open With</a></li>
                  <li>
                      <hr class="dropdown-divider text my-1 mx-2">
                  </li>
                  <li><button class="dropdown-item" onclick="rename_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li>
                  <li><button class="dropdown-item" onclick="share_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#shareItem"><i class="material-icons me-2 my-auto">share</i>Share</button></li>
                  <li><button class="dropdown-item" onclick="move_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#moveItem"><i class="material-icons me-2 my-auto">drive_file_move</i>Move to</button></li>
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
                    <li><a class="dropdown-item" href="#"><i
                                class="material-icons me-2 my-auto">visibility</i>Preview</a>
                    </li>
                    <li><a class="dropdown-item" href="#"><i
                                class="material-icons me-2 my-auto">open_with</i>Open
                            With</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><button class="dropdown-item" onclick="rename_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li>
                    <li><button class="dropdown-item" onclick="share_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#shareItem"><i class="material-icons me-2 my-auto">share</i>Share</button></li>
                    <li><button class="dropdown-item" onclick="move_item(${x}, 'recent', ${responce_obj["recent"][x][0]}, '${responce_obj["recent"][x][2]}')" data-bs-toggle="modal" data-bs-target="#moveItem"><i class="material-icons me-2 my-auto">drive_file_move</i>Move to</button></li>
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
                    <li><button class="dropdown-item default-text" data-bs-toggle="modal"
                              data-bs-target="#newAlbum">New Album...</button></li>
                  </ul>
                </div>
              </div>
            `;
          }

          //**** Videos ****//
          if (responce_obj["recent"][x][2].split(".").pop() == "mp4" || responce_obj["recent"][x][2].split(".").pop() == "webm") {
            // big cards view
            // if (window.screen.width > 500) {
              $("#home-data-content-recent").append(`
                  <div class="col p-2">
                    <div class="card main-card m-1">
                      <div class="img-div">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                        <video class="mb-0" playsinline controls><source src="${media_src}" type="video/mp4"><source src="${media_src}" type="video/mp4"></video>
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
                          <a href="#" class="d-flex justify-content-between me-3 my-auto">
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
              $("#home-data-content-recent").append(`
                  <div class="col p-2">
                    <div class="card main-card m-1">
                      <div class="img-div">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
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
            $(`#audio${x}`).buttonAudioPlayer({
              src: `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`,
              type: "bar-animation",
            });

            // list type view
            if (window.screen.width < 500) {
              $("#home-data-content-list-recent").append(`
                <div class="col">
                  <div class="card main-card-list my-1">
                    <div class="d-flex justify-content-between px-2">
                      <a href="#" class="d-flex justify-content-between me-3 my-auto">
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
              src: `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/storage/users/${uid}/recent/${responce_obj["recent"][x][2]}`,
              type: "bar-animation",
            });
          }
          //**** Images ****//
          else {
            // Big cards view
            // if (window.screen.width > 500) {
              $("#home-data-content-recent").append(`
                <div class="col p-2">
                  <div class="card main-card m-1">
                    <div class="img-div imag">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                        
                            <img src="${media_src}" class="card-img-top"
                                alt="image" />
                        
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
                        <a href="#" class="d-flex justify-content-between me-3 my-auto">
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
        $("#home-data-content-recent").append(
          `<h2 class="text-muted text-center my-5">No Found</h2>`
        );
      }
      $(document).ready(function () {
        setTimeout(() => {
          $(".loading").fadeOut(100);
        }, 200);
      });
      $(".divload").hide();
      $(".home-content").show();
    }
  };
  xhr.send(`home_content_data=${home_content_data}`);
}
// home_content_view();
 
 


//************************** favourite content view   **************************//
$(document).on("click", "#sidebar-favourite-btn", function () { 
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  if(urlLastIndex == 'favourite') {
    console.log('not  reload');
  }
  else {
    // changing url
    dynamic_url("my-gallery/favourite");
    favourite_content_view();
    
    console.log('reload');
  }
  
});

function favourite_content_view() {
  $('.divload').show(); 
  $('#home-data-content-recent').empty()
  $('#home-data-content-list-recent').empty()
  $('.home-content, .folder-content').hide(); 
  $('.Sidebar .sideul .fav').addClass('nav-link-active').siblings().removeClass('nav-link-active')

  current_folder_id = 'null'; 

  // displaying favourite data
  let favourite = true;
  var xhr = new XMLHttpRequest();
  var url = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/controller/php/fetch_data`;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responce_obj = JSON.parse(this.responseText);
      if (responce_obj.favourite.length > 0) {
        let Favourite, favFunc = "";
        for (let x = 0; x < responce_obj.favourite.length; x++) {
          // media source
          let media_src = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/storage/users/${uid}/favourite/${responce_obj["favourite"][x][4]}`;
          let media_item_name = responce_obj["favourite"][x][4];
          let media_category = responce_obj["favourite"][x][3];
          let media_category_id = responce_obj["favourite"][x][2];
          let media_id = responce_obj["favourite"][x][0];
          let media_datetime = responce_obj["favourite"][x][5];

          Favourite = `<i class="material-icons my-auto">favorite</i>`;
          favFunc = `from_favourite_page_remove_Favourite(${x}, '${media_category}', ${media_category_id}, ${media_id}, '${media_item_name}')`;
          let mediaCardFooter = `
            <div class="dropdown my-auto media-action">
              <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
                  id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots-vertical my-auto"></i>
              </a>
              <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right" aria-labelledby="dropdownUser2">
                <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">visibility</i>Preview</a></li>
                <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">open_with</i>Open With</a></li>
                <li>
                    <hr class="dropdown-divider text my-1 mx-2">
                </li>
                <li><a class="dropdown-item" href="${media_src}" download="${media_item_name}"><i class="material-icons me-2 my-auto">file_download</i>Download</a></li>
                <li><a class="dropdown-item" onclick="remove_item(${x}, 'favourite', ${media_id})"><i class="material-icons me-2 my-auto">delete</i>Remove</a></li>
                <li>
                    <hr class="dropdown-divider text my-1 mx-2">
                </li>
                <li><button class="dropdown-item default-text" data-bs-toggle="modal" data-bs-target="#newAlbum">New Album...</button></li>
              </ul>
            </div>
          `;
          let mediaCardFooterMobile = `
            <div class="dropdown my-auto media-action">
              <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
                  id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots-vertical my-auto"></i>
              </a>
              <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right"
                  aria-labelledby="dropdownUser2">
                  <li><a class="dropdown-item" href="#"><i
                              class="material-icons me-2 my-auto">visibility</i>Preview</a>
                  </li>
                  <li><a class="dropdown-item" href="#"><i
                              class="material-icons me-2 my-auto">open_with</i>Open
                          With</a>
                  </li>
                  <li>
                      <hr class="dropdown-divider text my-1 mx-2">
                  </li>
                  <li><a class="dropdown-item" href="${media_src}" download="${media_item_name}"><i
                              class="material-icons me-2 my-auto">file_download</i>Download</a>
                  </li>
                  <li><a class="dropdown-item" onclick="remove_item(${x}, 'favourite', ${media_id})"><i
                              class="material-icons me-2 my-auto">delete</i>Remove</a>
                  </li>
                  <li>
                      <hr class="dropdown-divider text my-1 mx-2">
                  </li>
                  <li><button class="dropdown-item default-text" data-bs-toggle="modal"
                          data-bs-target="#newAlbum">New Album...</button></li>
              </ul>
            </div>
          `;
          //**** Videos ****//
          if (media_item_name.split(".").pop() == "mp4" || media_item_name.split(".").pop() == "webm") {
            // big cards view
            // if (window.screen.width > 500) {
              $("#favourite-data-content").append(`
                  <div class="col p-2">
                    <div class="card main-card m-1">
                      <div class="img-div">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                        <video class="mb-0" playsinline controls><source src="${media_src}" type="video/mp4"><source src="${media_src}" type="video/mp4"></video>
                      </div>
                      <hr class="text my-0">
                      <div class="d-flex justify-content-between me-3">
                        <div class="card-body d-flex">
                            <i class="bi bi-film me-2 bold text-success"></i>
                            <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_item_name}">${media_item_name}</p>
                        </div>
                        ${mediaCardFooter}                          
                      </div>
                    </div>
                  </div>
              `);
            // }
            // list type view
            if (window.screen.width < 500) {
              $("#favourite-data-content-list").append(`
                    <div class="col">
                      <div class="card main-card-list my-1">
                        <div class="d-flex justify-content-between px-2">
                          <a href="#" class="d-flex justify-content-between me-3 my-auto">
                              <div class="img-div imag my-auto">
                                <i class="bi bi-film me-2 bold text-success"></i>
                              </div>
                              <div class="card-body ms-2">
                                  <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"
                                      title="${media_item_name}">
                                      ${media_item_name}</p>
                                  <p class="card-text-info text-muted text-nowrap my-auto">Date
                                      Date :- ${media_datetime}</p>
                              </div>
                          </a>
                          <div class="d-flex justify-content-end">
                            <div class="fav my-auto">
                                <button class="btn my-auto" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button>
                            </div>
                            ${mediaCardFooterMobile}
                          </div>
                        </div>
                      </div>
                      <hr class="text-muted my-0 py-0">
                    </div>
              `);
            }
          }
          //**** Audio ****//
          else if (media_item_name.split(".").pop() == "mp3") {
            // big cards view
            // if (window.screen.width > 500) {
              $("#favourite-data-content").append(`
                  <div class="col p-2">
                    <div class="card main-card m-1">
                      <div class="img-div">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                        <div class="d-flex justify-content-center my-auto audio" id="favAudio${x}"></div>
                      </div>
                      <hr class="text my-0">
                      <div class="d-flex justify-content-between me-3">
                        <div class="card-body d-flex">
                          <i class="bi bi-file-earmark-music me-2 bold text-danger"></i>
                          <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_item_name}">${media_item_name}</p>
                        </div>
                        ${mediaCardFooter}
                      </div>
                    </div>
                  </div>
              `);
            // }
            // audio player big cards
            $(`#favAudio${x}`).buttonAudioPlayer({
              src: media_src,
              type: "bar-animation",
            });

            // list type view
            if (window.screen.width < 500) {
              $("#favourite-data-content-list").append(`
                <div class="col">
                  <div class="card main-card-list my-1">
                    <div class="d-flex justify-content-between px-2">
                      <a href="#" class="d-flex justify-content-between me-3 my-auto">
                          <div class="img-div imag my-auto">
                            <i class="bi bi-file-earmark-music me-2 bold text-danger"></i>
                          </div>
                          <div class="card-body ms-2">
                              <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"
                                  title="${media_item_name}">
                                  ${media_item_name}</p>
                              <p class="card-text-info text-muted text-nowrap my-auto">Date
                                  Date :- ${media_datetime}</p>
                          </div>
                      </a>
                      <div class="d-flex justify-content-end">
                        <div class="d-flex justify-content-center my-auto audio" id="favAudioList${x}"></div>
                        <div class="fav my-auto">
                          <button class="btn my-auto" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button>
                        </div>
                        ${mediaCardFooterMobile}
                      </div>
                    </div>
                  </div>
                  <hr class="text-muted my-0 py-0">
                </div>
              `);

              // audio player list view
              $(`#favAudioList${x}`).buttonAudioPlayer({
                src: media_src,
                type: "bar-animation",
              });
            }

          }
          //**** Images ****//
          else {
            // Big cards view
            // if (window.screen.width > 500) {
              $("#favourite-data-content").append(`
                <div class="col p-2" id="favCardId${x}">
                  <div class="card main-card m-1">
                    <div class="img-div imag">
                        <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                        <a href="${media_src}">
                            <img src="${media_src}" class="card-img-top"
                                alt="image" />
                        </a>
                    </div>
                    <hr class="text my-0">
                    <div class="d-flex justify-content-between me-3">
                        <div class="card-body d-flex">
                            <i class="bi bi-image me-2 bold text-info"></i>
                            <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_item_name}">${media_item_name}</p>
                        </div>
                        ${mediaCardFooter}
                    </div>
                  </div>
                </div>
              `);
            // }

            // list type view
            if (window.screen.width < 500) {
              $("#favourite-data-content-list").append(`
                  <div class="col">
                    <div class="card main-card-list my-1">
                      <div class="d-flex justify-content-between px-2">
                        <a href="#" class="d-flex justify-content-between me-3 my-auto">
                            <div class="img-div imag my-auto">
                                <img src="${media_src}"
                                    class="card-img-top" alt="image" />
                            </div>
                            <div class="card-body ms-2">
                                <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"
                                    title="${media_item_name}">
                                    ${media_item_name}</p>
                                <p class="card-text-info text-muted text-nowrap my-auto">Date
                                    Date :- ${media_datetime}</p>
                            </div>
                        </a>
                        <div class="d-flex justify-content-end">
                            <div class="fav my-auto">
                              <button class="btn my-auto" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button>
                            </div>
                            ${mediaCardFooterMobile}
                        </div>
                      </div>
                    </div>
                    <hr class="text-muted my-0 py-0">
                  </div>
              `);
            }
          }
        }
        
      } else {
        $("#favourite-data-content").append(
          `<h2 class="text-muted text-center my-5">No Found</h2>`
        );
      }
      $(".divload").hide();
      $(".favourite-content").show();
    }
  };
  xhr.send(`favourite=${favourite}`);
}




 
 //********************************** ************************* ******************************************//
//** Double click on albums  **//
$(document).on("dblclick", ".album-cols", function () {
  $(this).animate(2000, function () {
    $(this)
      .addClass("album-cols-active")
      .siblings()
      .removeClass("album-cols-active");
  });
});
window.addEventListener("click", function () {
  $(".album-cols").removeClass("album-cols-active");
});



//* sign out   *//
$(document).on("click", ".signout", function () {
  $(".signout-loading").show();

  // var auth2 = getAuthInstance();
  // auth2.then(function () {
  //   console.log('User signed out.');
  // });

  let logout = true;
  var xhr = new XMLHttpRequest();
  var url = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/controller/php/logout`;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // setTimeout(() => {
        $(".signout-loading").show();
        window.location.href = `http://ec2-18-117-246-170.us-east-2.compute.amazonaws.com/CloudGallery/`;
      // }, 1000);
    }
  };
  xhr.send(`logout=${logout}`);
});




























// ****  folder nesting ***** //
// $(document).on('click', '.folder-extend-icon-main', function() {
//   $('.folder-extend-icon-main i').toggleClass('rotated');
//   $('.nest-folders ').toggle(()=>{
//     $(this).animate()
//   });
// });

// function toggle_rotate(folder_id ) {
//   $(`#arrow-${folder_id}  i`).toggleClass('rotated');
// }


// var  nested_folder_obj, folders = '';
// function nesting_folder() {
//   let folder_mongo = true;
//   var xhr = new XMLHttpRequest();
//   var url = `../php/fetch_data`;

//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
      
//       (this.response != '') ? $(`.nest-folders .tree`).html(this.response) : $(`.nest-folders .tree`).html(`<h6 class="text-muted">No folders</h6>`)
      
//       // console.log(Object.keys(responce_obj).length);
//       // for (var [key, val] of Object.entries(nested_folder_obj.my_gallery)) {

//       $(".tree").treemenu({delay:200}) 
//     }
//   };
//   xhr.send(`folder_mongo=${folder_mongo}`);
// }
// // nesting_folder() 
  


//*********************************************** context menu for sidebar folders *************************************/ //
// var folder_context_menu = function(event, r_folder_id) {
//   event.preventDefault();
//   // Show contextmenu
//   $(".folder-context-menu").finish().toggle(100). 
//   css({
//       top: event.pageY + "px",
//       left: event.pageX + "px"
//   });

//   r_clicked_folder_id = r_folder_id; 
//   $('#r_folder_id').val(r_folder_id) 
// } 
// // If the document is clicked somewhere
// $(document).bind("mousedown", function (e) {
  
//   // If the clicked element is not the menu
//   if (!$(e.target).parents(".folder-context-menu").length > 0) {
//       // Hide it
//       $(".folder-context-menu").hide(100);
//       // r_clicked_folder_id = '';
//   }
// });
// // If the menu element is clicked
// $(".folder-context-menu li").click(function(){
//   // Hide it AFTER the action was triggered
//   $(".folder-context-menu").hide(100);
// });


//********************************  folder content view  ********************************// 
// var current_folder_id = null; var r_clicked_folder_id = null;
// function folder_information(folder_id) {
//   var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
//   if(urlLastIndex == folder_id) {
//     console.log('f not loaded.');
//   }
//   else {
//     dynamic_url('my-gallery/'+folder_id);

//     folder_content_view(folder_id)
//   }
// }
// function folder_content_view(folder_id) { 
//   $('.divload').show(); 
//   $('#favourite-data-content, #home-data-content-recent').empty()
//   $('#favourite-data-content-list, #home-data-content-list-recent').empty()
//   $('.favourite-content, .home-content').hide(); 
 
//   current_folder_id = folder_id; 

//   let folder_view = true;
//   var xhr = new XMLHttpRequest();
//   var url = `../php/fetch_data`;
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       let responce_obj = JSON.parse(this.response);
//       // console.log(responce_obj['f_responce']); 
//       let folder_data = responce_obj['f_responce']['folder_data'];
//       let nested_folders = responce_obj['f_responce']['nested_folders'];
//       // console.log(nested_folders.length);
//       // console.log(folder_data.length); 
      
//       $('#folder-cards, #folder-data-content, #folder-data-content-list').empty()

//       if(nested_folders == null && folder_data.length == 0) {
//         $('.folder-card-div p, #folder-cards').empty();
//         $('.folder-data .folder-data-heading p').empty();
//         $('.empty-msg').show(()=>{
//           $(`.empty-msg h6`).text('This folder is empty');
//         })
//       }
//       else {
//         // folder cards view 
//         $('.empty-msg').hide();
//         if(nested_folders != null) {
//           $('.folder-card-div p').text('Folders');
          
//           for(let x = 0; x < nested_folders.length; x++) { 
//             let decrypt_folder_name = nested_folders[x]['decrypt']; 
//             let encrypt_folder_name = nested_folders[x]['encrypt'];
//             let folder_card_actions = `
//               <div class="dropdown my-auto media-action">
//                 <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
//                     id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
//                     <i class="bi bi-three-dots-vertical my-auto"></i>
//                 </a>
//                 <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right"
//                     aria-labelledby="dropdownUser2">
//                     <li><a class="dropdown-item" href="#"><i
//                                 class="material-icons me-2 my-auto">visibility</i>Preview</a>
//                     </li>
//                     <li><a class="dropdown-item" href="#"><i
//                                 class="material-icons me-2 my-auto">open_with</i>Open
//                             With</a>
//                     </li>
//                     <li>
//                         <hr class="dropdown-divider text my-1 mx-2">
//                     </li>
//                     <li><a class="dropdown-item" href=" " download=" "><i
//                                 class="material-icons me-2 my-auto">file_download</i>Download</a>
//                     </li>
//                     <li><a class="dropdown-item" onclick="remove_item( , 'favourite',  )"><i
//                                 class="material-icons me-2 my-auto">delete</i>Remove</a>
//                     </li>
//                     <li>
//                         <hr class="dropdown-divider text my-1 mx-2">
//                     </li>
//                     <li><button class="dropdown-item default-text" data-bs-toggle="modal"
//                             data-bs-target="#newAlbum">New Album...</button></li>
//                 </ul>
//               </div>
//             `;

//             $('#folder-cards').append(`
//                 <div class="col ">
//                   <div class="single-folder m-1" oncontextmenu="folder_context_menu(event, '${encrypt_folder_name}')">
//                       <div class="d-flex justify-content-between rounded border p-2">
//                           <div class="d-flex">
//                               <div class="folder-icon my-auto" >
//                                   <i class="bi bi-folder-fill fs-5 my-auto me-2 text-muted"></i>
//                               </div>
//                               <div class="folder-name my-auto">
//                                   <p class="text-nowrap  my-auto">${decrypt_folder_name}</p>
//                               </div>
//                           </div> 
//                           <div class="dropdown my-auto media-action">
//                               <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
//                                   id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
//                                   <i class="bi bi-three-dots-vertical my-auto"></i>
//                               </a>
//                               <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right"
//                                   aria-labelledby="dropdownUser2">
//                                   <li><a class="dropdown-item" href="#"><i
//                                               class="material-icons me-2 my-auto">visibility</i>Preview</a>
//                                   </li>
//                                   <li><a class="dropdown-item" href="#"><i
//                                               class="material-icons me-2 my-auto">open_with</i>Open
//                                           With</a>
//                                   </li>
//                                   <li>
//                                       <hr class="dropdown-divider text my-1 mx-2">
//                                   </li>
//                                   <li><a class="dropdown-item" href=" " download=" "><i
//                                               class="material-icons me-2 my-auto">file_download</i>Download</a>
//                                   </li>
//                                   <li><a class="dropdown-item" ><i
//                                               class="material-icons me-2 my-auto">delete</i>Remove</a>
//                                   </li>
//                                   <li>
//                                       <hr class="dropdown-divider text my-1 mx-2">
//                                   </li>
//                                   <li><button class="dropdown-item default-text" data-bs-toggle="modal"
//                                           data-bs-target="#newAlbum">New Album...</button></li>
//                               </ul>
//                           </div> 
//                       </div>
//                   </div>
//                 </div>
//             `);
//           }
//         }
//         else {
//           $('.folder-card-div p').empty();
//         }
         
 
        // folder data view 
        // if(folder_data.length > 0) { 
        //   $('.folder-data .folder-data-heading p').text('Files'); 
          
        //   var Favourite, favFunc, mediaCardFooterMobile = "";
        //   for (let x = 0; x < folder_data.length; x++) {
        //     let media_id = folder_data[x][0];
        //     let media_name = folder_data[x][3];
        //     let media_favourite_check = folder_data[x][4];
        //     let media_datetime = folder_data[x][5]; 
        //     let media_src = `http://myapp.local/cloud/storage/users/${uid}/folders/${folder_id}/${media_name}`

        //     // checking favourite
        //     if (media_favourite_check == 1) {
        //       Favourite = `<i class="material-icons my-auto">favorite</i>`;
        //       favFunc = `remove_from_Favourite(${x}, 'folder_data', ${media_id}, '${media_name}', '${folder_id}')`;
        //     } else {
        //       Favourite = `<i class="material-icons my-auto">favorite_border</i>`;
        //       favFunc = `add_to_Favourite(${x}, 'folder_data', ${media_id}, '${media_name}', '${folder_id}')`;
        //     }
   
        //     let mainCard = ``;
        //     let mediaCardFooter = `
        //         <div class="dropdown my-auto media-action">
        //           <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
        //               id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        //               <i class="bi bi-three-dots-vertical my-auto"></i>
        //           </a>
        //           <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right" aria-labelledby="dropdownUser2">
        //             <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">visibility</i>Preview</a></li>
        //             <li><a class="dropdown-item" href="#"><i class="material-icons me-2 my-auto">open_with</i>Open With</a></li>
        //             <li>
        //                 <hr class="dropdown-divider text my-1 mx-2">
        //             </li>
        //             <li><button class="dropdown-item" onclick="rename_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li>
        //             <li><button class="dropdown-item" onclick="share_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#shareItem"><i class="material-icons me-2 my-auto">share</i>Share</button></li>
        //             <li><button class="dropdown-item" onclick="move_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#moveItem"><i class="material-icons me-2 my-auto">drive_file_move</i>Move to</button></li>
        //             <li>
        //                 <hr class="dropdown-divider text my-1 mx-2">
        //             </li>
        //             <li><a class="dropdown-item" href="${media_src}" download="${media_name}"><i class="material-icons me-2 my-auto">file_download</i>Download</a></li>
        //             <li><a class="dropdown-item" onclick="remove_item(${x}, 'folder_data', ${media_id}, '${media_name}')"><i class="material-icons me-2 my-auto">delete</i>Remove</a></li>
        //             <li>
        //                 <hr class="dropdown-divider text my-1 mx-2">
        //             </li>
        //           </ul>
        //         </div>                          
        //       </div>
        //     `;
        //     if(window.screen.width < 500) {
        //       mediaCardFooterMobile = `
        //         <div class="d-flex justify-content-end">
        //           <div class="fav my-auto">
        //               <button class="btn my-auto" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button>
        //           </div>
        //           <div class="dropdown my-auto media-action">
        //             <a class="d-flex align-items-center text link-dark text-decoration-none my-auto"
        //                 id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        //                 <i class="bi bi-three-dots-vertical my-auto"></i>
        //             </a>
        //             <ul class="dropdown-menu border border-secondary text-small shadow bg-dark dropdown-right"
        //               aria-labelledby="dropdownUser2">
        //               <li><a class="dropdown-item" href="#"><i
        //                           class="material-icons me-2 my-auto">visibility</i>Preview</a>
        //               </li>
        //               <li><a class="dropdown-item" href="#"><i
        //                           class="material-icons me-2 my-auto">open_with</i>Open
        //                       With</a>
        //               </li>
        //               <li>
        //                   <hr class="dropdown-divider text my-1 mx-2">
        //               </li>
        //               <li><button class="dropdown-item" onclick="rename_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button></li>
        //               <li><button class="dropdown-item" onclick="share_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#shareItem"><i class="material-icons me-2 my-auto">share</i>Share</button></li>
        //               <li><button class="dropdown-item" onclick="move_item(${x}, 'folder_data', ${media_id}, '${media_name}')" data-bs-toggle="modal" data-bs-target="#moveItem"><i class="material-icons me-2 my-auto">drive_file_move</i>Move to</button></li>
        //               <li>
        //                   <hr class="dropdown-divider text my-1 mx-2">
        //               </li>
        //               <li><a class="dropdown-item" href="${media_src}" download="${media_name}"><i
        //                           class="material-icons me-2 my-auto">file_download</i>Download</a>
        //               </li>
        //               <li><a class="dropdown-item" onclick="remove_item(${x}, 'folder_data', ${media_id}, '${media_name}')"><i
        //                           class="material-icons me-2 my-auto">delete</i>Remove</a>
        //               </li>
        //               <li>
        //                   <hr class="dropdown-divider text my-1 mx-2">
        //               </li>
        //               <li><button class="dropdown-item default-text" data-bs-toggle="modal"
        //                         data-bs-target="#newAlbum">New Album...</button></li>
        //             </ul>
        //           </div>
        //         </div>
        //       `;
        //     }
  
        //     // //**** Videos ****//
        //     if (media_name.split(".").pop() == "mp4" || media_name.split(".").pop() == "webm") {
        //       // big cards view
        //       // if (window.screen.width > 500) {
        //         $("#folder-data-content").append(`
        //             <div class="col p-2">
        //               <div class="card main-card m-1">
        //                 <div class="img-div">
        //                   <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
        //                   <video class="mb-0" playsinline controls><source src="${media_src}" type="video/mp4"><source src="${media_src}" type="video/mp4"></video>
        //                 </div>
        //                 <hr class="text my-0">
        //                 <div class="d-flex justify-content-between me-3">
        //                   <div class="card-body d-flex">
        //                     <i class="bi bi-film me-2 bold text-success"></i>
        //                     <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_name}">${media_name}</p>
        //                   </div>
        //                   ${mediaCardFooter}
        //               </div>
        //             </div>
        //         `);
        //       // }
        //       // list type view
        //       if (window.screen.width < 500) {
        //         $("#folder-data-content-list").append(`
        //               <div class="col">
        //                 <div class="card main-card-list my-1">
        //                   <div class="d-flex justify-content-between px-2">
        //                     <a href="#" class="d-flex justify-content-between me-3 my-auto">
        //                       <div class="img-div imag my-auto">
        //                         <i class="bi bi-film me-2 bold text-success"></i>
        //                       </div>
        //                       <div class="card-body ms-2">
        //                         <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${media_name}">${media_name}</p>
        //                         <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${media_datetime}</p>
        //                       </div>
        //                     </a>
        //                     ${mediaCardFooterMobile}
        //                   </div>
        //                 </div>
        //                 <hr class="text-muted my-0 py-0">
        //               </div>
        //         `);
        //       }
        //     }

        //     // //**** Audio ****//
        //     else if (media_name.split(".").pop() == "mp3") {
        //       // big cards view
        //       // if (window.screen.width > 500) {
        //         $("#folder-data-content").append(`
        //             <div class="col p-2">
        //               <div class="card main-card m-1">
        //                 <div class="img-div">
        //                   <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
        //                   <div class="d-flex justify-content-center my-auto audio" id="audio${x}"></div>
        //                 </div>
        //                 <hr class="text my-0">
        //                 <div class="d-flex justify-content-between me-3">
        //                   <div class="card-body d-flex">
        //                     <i class="material-icons me-2 text-danger">headphones</i>
        //                     <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_name}">${media_name}</p>
        //                   </div>
        //                   ${mediaCardFooter}
        //               </div>
        //             </div>
        //         `);
        //       // }

        //         // audio player big cards
        //         $(`#audio${x}`).buttonAudioPlayer({
        //           src: media_src,
        //           type: "bar-animation",
        //         });
  
        //       // list type view
        //       if (window.screen.width < 500) {
        //         $("#folder-data-content-list").append(`
        //           <div class="col">
        //             <div class="card main-card-list my-1">
        //               <div class="d-flex justify-content-between px-2">
        //                 <a href="#" class="d-flex justify-content-between me-3 my-auto">
        //                     <div class="img-div imag my-auto">
        //                       <i class="bi bi-file-earmark-music me-2 bold text-danger"></i>
        //                     </div>
        //                     <div class="card-body ms-2">
        //                         <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${media_name}">${media_name}</p>
        //                         <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${media_datetime}</p>
        //                     </div>
        //                 </a>
        //                 ${mediaCardFooterMobile}
        //               </div>
        //             </div>
        //             <hr class="text-muted my-0 py-0">
        //           </div>
        //         `);

        //         // audio player list view
        //         $(`#audioList${x}`).buttonAudioPlayer({
        //           src: media_src,
        //           type: "bar-animation",
        //         });
        //       }
  
        //     }

        //     // //**** Images ****//
        //     else {
        //       // Big cards view
        //       // if (window.screen.width > 500) {
        //         $("#folder-data-content").append(`
        //           <div class="col p-2">
        //             <div class="card main-card m-1">
        //               <div class="img-div imag">
        //                   <div class="fav d-flex justify-content-end"><button class="btn m-1 p-0" onclick="${favFunc}" id="favBtn${x}">${Favourite}</button></div>
                          
        //                       <img src="${media_src}" class="card-img-top"
        //                           alt="image" />
                          
        //               </div>
        //               <hr class="text my-0">
        //               <div class="d-flex justify-content-between me-3">
        //                 <div class="card-body d-flex">
        //                   <i class="material-icons me-2 text-info">image</i>
        //                   <p class="card-text text-nowrap my-auto" id="item_name${x}" title="${media_name}">${media_name}</p>
        //                 </div>
        //                 ${mediaCardFooter}
        //             </div>
        //           </div>
        //         `);
        //       // }
  
        //       // list type view
        //       if (window.screen.width < 500) {
        //         $("#home-data-content-list-recent").append(`
        //             <div class="col">
        //               <div class="card main-card-list my-1">
        //                 <div class="d-flex justify-content-between px-2">
        //                   <a href="#" class="d-flex justify-content-between me-3 my-auto">
        //                       <div class="img-div imag my-auto">
        //                           <img src="${media_src}"
        //                               class="card-img-top" alt="image" />
        //                       </div>
        //                       <div class="card-body ms-2">
        //                           <p class="card-text text text-nowrap my-auto pb-1" id="item_name${x}"title="${media_name}">${media_name}</p>
        //                           <p class="card-text-info text-muted text-nowrap my-auto">Date :- ${media_datetime}</p>
        //                       </div>
        //                   </a>
        //                   ${mediaCardFooterMobile}
        //                 </div>
        //               </div>
        //               <hr class="text-muted my-0 py-0">
        //             </div>
        //         `);
        //       }
        //     }
        //   }
        // }
        // else {
        //   $('.folder-data .folder-data-heading p').empty(); 
        // }

//       }

//       $('.folder-content').show(()=>{
//         $('.divload').hide()
//       })
//     }
//   }
//   xhr.send(`folder_view=${folder_view}&folder_id=${folder_id}`);
// }
