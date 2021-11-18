
// scroll to top
// window.addEventListener('scroll', function(){
//     var scroll = document.querySelector('.scrollTop');
//     scroll.classList.toggle("active" , window.scrollY > 50)
// });
// function scrollToTop() {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// }


// page loading
$(document).ready(function() {
    setTimeout(() => {
        $('.loading').fadeOut(100)
    }, 200);
})





//******************************************* ERROR EXCEPTION *********************************************//
/**
 * ERROR_EXCEPTION function description
 * @param { String } message
 * @param { String } type
 */
function ERROR_EXCEPTION(message, type) { 
    $("#ERROREXCEPTIONMODAL").modal("show");
    $("#ERROREXCEPTIONMSG").html(`
        <h6 class="my-auto text-${type}">${message}</h6>
    `);
    setTimeout(() => {
        $("#ERROREXCEPTIONMODAL").modal("hide");
        $("#ERROREXCEPTIONMSG").empty();
    }, 2000);
}

 




//******************************************* Theams *********************************************//





//******************************************* context menu for body *********************************************//
// Trigger action when the contexmenu is about to be shown
// var item_context_menu =  function (event) {
//     // Avoid the real one
//     event.preventDefault();
    
//     // Show contextmenu
//     $(".custom-menu").finish().toggle(100).
    
//     // In the right position (the mouse)
//     css({
//         top: event.pageY + "px",
//         left: event.pageX + "px"
//     })
// } 
// If the document is clicked somewhere
// $(document).bind("mousedown", function (e) {
    
//     // If the clicked element is not the menu
//     if (!$(e.target).parents(".custom-menu").length > 0) {
        
//         // Hide it
//         $(".custom-menu").hide(100);
//     }
// });
// If the menu element is clicked
// $(".custom-menu li").click(function(){
//     // Hide it AFTER the action was triggered
//     $(".custom-menu").hide(100);
// });

 
// document.getElementById("testContext").oncontextmenu = function(event) {
//     // Show contextmenu
//     $(".custom-menu").finish().toggle(100).
    
//     // In the right position (the mouse)
//     css({
//         top: event.pageY + "px",
//         left: event.pageX + "px"
//     });
// };
 

