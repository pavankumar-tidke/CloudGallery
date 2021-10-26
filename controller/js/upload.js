
var flag = 0;
var nameFlag = 0;


//  sidebar file uploading 
$(document).on('change', '#sideFileUploadSelect', function(e) {
    e.preventDefault();
    $('.file-status, #side_status_hide').show(function() {
        $(this).animate(500);
    })

    var form_data = new FormData();
    var fileArr = [];
    var sideFile = document.getElementById('sideFileUploadSelect');
    
    function sideFor() {
        for(let x = 1; x <= sideFile.files.length; x++) {
            $('.multi-file-div').prepend(`<div class="my-1 mx-1 py-1 file-div" id="fileDiv${nameFlag}">
                    <div class="d-flex justify-content-between my-1"> 
                        <p class="m-0 p-0 progress-file-name text-nowrap pre-status-text" title="${sideFile.files[flag]['name']}">${sideFile.files[flag]['name']}</p>
                        <p class="text my-auto p-0 progress-complete pre-status-text">0%</p>  
                    </div>
                    <div class="progress d-flex my-2">
                        <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>`)

            // console.log(sideFile.files[flag]);
            form_data.append('file', sideFile.files[flag]);
            sideUp(form_data, nameFlag);

            flag++;
            nameFlag++;
        }
        sideFile.value = '';
        flag = 0;   
        
    }

    function sideUp(form_data, nameid) {
        var url = `http://localhost/CloudGallery/controller/php/insert_data.php`;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.upload.addEventListener('progress', (e) => {
            // $('.progress-text').html('<p class="loaded-status-text">Uploading...</p>');
            let percent_complete = Math.round((e.loaded / e.total) * 100);
            $(`.file-status #fileDiv${nameid} .progress-complete`).text(`${percent_complete}%`);
            $(`.file-status #fileDiv${nameid} .progress-complete`).removeClass(`pre-status-text`).addClass(`pre-status-error-text`);
            $(`.file-status #fileDiv${nameid} .progress-file-name`).removeClass(`pre-status-text`).addClass(`pre-status-error-text`);
            $(`.file-status #fileDiv${nameid} .progress-bar`).css({ 'width': `${percent_complete}%` });
                    
        })
        xhr.addEventListener('load', (e) => {
            // console.log(xhr.response);
            $(`.file-status #fileDiv${nameid} .progress-complete`).removeClass(`pre-status-error-text`).addClass(`success-status-text`);
            $(`.file-status #fileDiv${nameid} .progress-file-name`).removeClass(`pre-status-error-text`).addClass(`success-status-text`);
            $(`.file-status #fileDiv${nameid} .progress-complete`).html(`<i class="bi bi-check-lg success-status-text"></i>`);
            $(`.file-status #fileDiv${nameid} .progress-bar`).css({ 'width': `100%` });  
            home_content_view(); 
        })
        xhr.send(form_data);
    }

    sideFor();
});
$(document).on('click', '#side_status_hide', function(e){
    e.preventDefault();
    $('.file-status, #side_status_hide').hide(function(){
        $('.file-status, #side_status_hide').animate(2000);
        $('.multi-file-div').empty();
    })
})









// navbar file uploading
$(document).on('change', '#navbarfile', function(e) {
    e.preventDefault();

    $('.navbar-status-dropdown').show(function() {
        $(this).animate(500);
    })

    var form_data = new FormData(); 
    var fileArr = [];
    var navbarfile = document.getElementById('navbarfile');


    async function navFor() {
        for(let x = 1; x <= navbarfile.files.length; x++) {
            $('.navbar-status-div').prepend(`<li class="my-1 mx-1 py-1 file-div" id="fileDiv${nameFlag}">
                                                <div class="d-flex justify-content-between my-1"> 
                                                    <p class="m-0 p-0 progress-file-name text-nowrap pre-status-text" title="${navbarfile.files[flag]['name']}">${navbarfile.files[flag]['name']}</p>
                                                    <p class="text my-auto p-0 progress-complete pre-status-text">0%</p>  
                                                </div>
                                                <div class="progress d-flex my-2">
                                                    <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </li>`)

            // console.log(navbarfile.files[flag]);
            form_data.append('file', navbarfile.files[flag]);
            navbarUp(form_data, nameFlag);
            
            flag++;
            nameFlag++;
        }
        navbarfile.value = '';
        // flag = 0;   
    }

    function navbarUp(form_data, nameid) {
        var url = `http://localhost/CloudGallery/controller/php/insert_data.php`;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.upload.addEventListener('progress', (e) => {
            let percent_complete = Math.round((e.loaded / e.total) * 100);
            $(`.navbar-status-div #fileDiv${nameid} .progress-complete`).text(`${percent_complete}%`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-complete`).removeClass(`pre-status-text`).addClass(`pre-status-error-text`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-file-name`).removeClass(`pre-status-text`).addClass(`pre-status-error-text`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-bar`).css({ 'width': `${percent_complete}%` });
            $('.navbar-status-dropdown a i').addClass(`pre-status-error-text`)
        })
        xhr.addEventListener('load', (e) => {
            // console.log(xhr.response);
            $(`.navbar-status-div #fileDiv${nameid} .progress-complete`).removeClass(`pre-status-error-text`).addClass(`success-status-text`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-file-name`).removeClass(`pre-status-error-text`).addClass(`success-status-text`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-complete`).html(`<i class="bi bi-check-lg success-status-text"></i>`);
            $(`.navbar-status-div #fileDiv${nameid} .progress-bar`).css({ 'width': `100%` });   
            $('.navbar-status-dropdown a i').addClass(`success-status-text`).removeClass(`pre-status-error-text`);
            
        })
        xhr.send(form_data);
    }

    navFor()
});







