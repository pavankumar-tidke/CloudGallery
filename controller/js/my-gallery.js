//** pre hiding element **//.........
$(".album-view-content, .favourite-content, .divload, .file-status, #side_status_hide, .modaloader, .navbar-status-dropdown").hide();
$(".navbar-file-status, .signout-loading, .nest-folder, .folder-content, .my-profile").hide();
 
if (window.screen.width < 500) {
  $(`#home-data-content-recent`).hide();
  $(`.display-filter`).html(`<i class="bi bi-grid-fill"></i>`); 
} else { 
  $(`#home-data-content-list-recent`).hide(); 
}





//****** page Entry */ 
var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
if(urlLastIndex == 'my-gallery') {
  $('.divload').show();
  $('.Sidebar .sideul .my_gallery').addClass('nav-link-active').siblings().removeClass('nav-link-active'); 
  $('#favourite-data-content, #folder-data-content').empty()
  $('#favourite-data-content-list, #home-data-content-list-recent').empty()
  $('.favourite-content, .folder-content, .mobile-file-status-content, .my-profile').hide();
  $('.home-content').show();
  home_content_view();
  $('.divload, .search-content').hide(); 
} 
else if(urlLastIndex == 'favourite') {
  $('.divload').show();
  $('.Sidebar .sideul .fav').addClass('nav-link-active').siblings().removeClass('nav-link-active')
  $('#home-data-content-recent, #folder-data-content').empty()
  $('#home-data-content-list-recent, #home-data-content-list-recent').empty()
  $('.home-content, .mobile-file-status-content, .my-profile').hide(); 
  $('.favourite-content, .folder-content').show();
  favourite_content_view();
  $('.divload').hide(); 
}
else if(urlLastIndex == 'dashboard') {
  $('.Sidebar .sideul .my_gallery').addClass('nav-link-active').siblings().removeClass('nav-link-active'); 
  $('#home-data-content-recent, #folder-data-content').empty();
  $('#home-data-content-list-recent, #home-data-content-list-recent').empty();
  $('.my-profile').show();
  dashboard_view(); 
}
else if(urlLastIndex == 'file-status') { 
  $('.divload').show(); 
  // $('#home-data-content-recent, #folder-data-content').empty()
  // $('#home-data-content-list-recent, #home-data-content-list-recent').empty()
  $('.home-content, .favourite-content, .my-profile').hide(); 
  $('.mobile-file-status-content').show();
  // mobile_file_status_content_view();
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


//* My Profile *//
 
$(document).on('click', '.my-profile-btn', function() {
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  if(urlLastIndex == 'dashboard') {
    console.log('not  reload');
  }
  else {
    // changing url
    dynamic_url("my-gallery/dashboard");
    $('#home-data-content-recent, #folder-data-content').empty();
    $('#home-data-content-list-recent, #home-data-content-list-recent').empty(); 
    dashboard_view();
     
  }
});
var myChart = undefined;
function dashboard_view() {  
  $('.divload').show();  
  $('.home-content, .favourite-content, .mobile-file-status-content').hide(); 
  $('.my-profile').show();
 

  let dashboard = true;
  var xhr = new XMLHttpRequest();
  var url = `http://localhost/controller/php/live_operation`;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
      let responce_obj = JSON.parse(this.response),
        photo_count = 0, video_count = 0, song_count = 0, other_count = 0;
 
      responce_obj['dataCount'].map((val) => {
        let media_name = val[2].split(".").pop();
        if(media_name == "jpg") {photo_count++;}
        else if(media_name == "mp4" || media_name == "webm") {video_count++;}
        else if(media_name == "mp3") {song_count++;}
        else {other_count++;}
      });
      // $('.photo-card h6').text(photo_count);
      // $('.video-card h6').text(video_count);
      // $('.song-card h6').text(song_count);
      // $('.other-card h6').text(other_count); 
      $('#dataSize').text(responce_obj['dataSize']);
      
      //* chart 
      myChart = new Chart(
        document.getElementById('myChart'),
        {
          type: 'doughnut',
          data: {
            labels: [
              'Photos',
              'Videos',
              'Musics',
              'Other', 
            ],
            datasets: [{
              label: 'User Data',
              backgroundColor: [
                'blue',
                'rgb(255, 99, 132)',
                'green',
                'yellow',
              ],
              borderColor: [
                'blue',
                'rgb(255, 99, 132)',
                'green',
                'yellow',
              ],
              data: [
                photo_count,
                video_count,
                song_count,
                other_count,
              ],
              barThickness: 50,
            }]
          },
          options: { 
            radius: 120, 
          },
        }
      );   
      $('.divload').hide();  
    }
  }
  xhr.send(`dashboard=${dashboard}`);
  
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
  let theamColor = $(this).attr('id');       

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
$(document).on("click", "#sidebar-my-gallery-btn, #botNavHomeCont", function () { 
  $(".search-content").hide();
  $(".home-content").show();
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
  $('.favourite-content, .folder-content, .mobile-file-status-content, .my-profile').hide(); 
  if(myChart != undefined)
    myChart.destroy();
  current_folder_id = 'null'; 

  var xhr = new XMLHttpRequest();
  var url = `http://localhost/controller/php/fetch_data`;

  let home_content_data = true;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responce_obj = JSON.parse(this.responseText);
      console.log(responce_obj);
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
              $("#home-data-content-recent").append(`
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
              $("#home-data-content-recent").append(`
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
              $("#home-data-content-recent").append(`
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
$(document).on("click", "#sidebar-favourite-btn, #botNavFavBtn", function () { 
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  $('.Sidebar .sideul .fav').addClass('nav-link-active').siblings().removeClass('nav-link-active') 
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
  $('.home-content, .folder-content, .mobile-file-status-content, .my-profile').hide(); 
  if(myChart != undefined)
    myChart.destroy();
    

  current_folder_id = 'null'; 

  // displaying favourite data
  let favourite = true;
  var xhr = new XMLHttpRequest();
  var url = `http://localhost/controller/php/fetch_data`;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responce_obj = JSON.parse(this.responseText);
      $('#favourite-data-content').empty();
      if (responce_obj.favourite.length > 0) {
        let Favourite, favFunc = "";
        for (let x = 0; x < responce_obj.favourite.length; x++) {
          // media source
          let media_src = `http://localhost/storage/users/${uid}/favourite/${responce_obj["favourite"][x][4]}`;
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
                 
                <li>
                    <hr class="dropdown-divider text my-1 mx-2">
                </li>
                <li><a class="dropdown-item" href="${media_src}" download="${media_item_name}"><i class="material-icons me-2 my-auto">file_download</i>Download</a></li>
                <li><a class="dropdown-item" onclick="remove_item(${x}, 'favourite', ${media_id})"><i class="material-icons me-2 my-auto">delete</i>Remove</a></li>
                
                 
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
                  <li>
                      <hr class="dropdown-divider text my-1 mx-2">
                  </li>
                  <li><a class="dropdown-item" href="${media_src}" download="${media_item_name}"><i
                              class="material-icons me-2 my-auto">file_download</i>Download</a>
                  </li>
                  <li><a class="dropdown-item" onclick="remove_item(${x}, 'favourite', ${media_id})"><i
                              class="material-icons me-2 my-auto">delete</i>Remove</a>
                  </li> 
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
                        <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${media_category_id})"> 
                          <img src="http://localhost/asset/other/play-button.svg" style="height: 60px !important; margin-top: 30px;" class="" />
                        </div>
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
                        <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${media_category_id})"> 
                          <img src="http://localhost/asset/other/dvd-disk.svg" style="height: 60px !important; margin-top: 30px;" class="" />
                        </div>
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
                        <div class="  d-flex justify-content-center  " style="height: 50px !important;" onclick="preview(${x}, 'recent', ${media_category_id})"> 
                            <img src="${media_src}" class="card-img-top"
                                alt="image" />
                        </div>
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
                        <a onclick="preview(${x}, 'recent', ${media_category_id})" class="d-flex justify-content-between me-3 my-auto">
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





// mobile file status view
$(document).on('click', '#file-status', function() {
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  if(urlLastIndex == 'file-status') {
    console.log('not  reload');
  }
  else {
    // changing url
    dynamic_url("my-gallery/file-status");
    // mobile_file_status_content_view();
    if(myChart != undefined)
      myChart.destroy();
    $('.home-content, .favourite-content, .my-profile').hide(); 
    $('.mobile-file-status-content').show();  
  }
})
 
 

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
  var url = `http://localhost/controller/php/logout`;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // setTimeout(() => {
        $(".signout-loading").show();
        window.location.href = `http://localhost/`;
      // }, 1000);
    }
  };
  xhr.send(`logout=${logout}`);
});

