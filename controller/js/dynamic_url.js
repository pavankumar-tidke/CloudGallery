

/**
 * dynamic_url function description
 * @param { String } query
 */
function dynamic_url(query) {
  window.history.pushState("", "", app_url + query);
  var urlLastIndex = window.location.href.substring(window.location.href.lastIndexOf('/') + 1); 
}





//****** BAck button / forword button clicked event */ 
window.addEventListener('popstate', spa_url_handeling)
function spa_url_handeling() { 
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
    console.log(urlLastIndex.length); 
  }
}
  


$(document).on('click', '.dropdown a', function() {
  $('.dropdown').animate(2000);
})