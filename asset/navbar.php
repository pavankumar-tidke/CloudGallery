<?php
    if ($_SESSION['uid']) {
        ?>
<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-fluid d-flex justify-content-between">
        <div class="d-flex flex-column nb">
            <a class="navbar-brand mx-auto py-0 text" href="http://localhost/CloudGallery">S G</a>
            <p class="m-0 p-0 text">Smart Gallery</p>
        </div>
        <div class="right-item d-flex justify-content-between">
            <!-- uploading status -->
            <div class="dropdown mx-2 my-auto navbar-dropdown-upload navbar-status-dropdown">
                <a class="d-flex align-items-centertext link-dark text-decoration-none navbar-upload-icon"
                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="material-icons text p-0 m-0 icon-bold">file_upload</i>
                </a>
                <ul class="dropdown-menu navbar-drop-new-menu text-small shadow bg-dark dropdown-menu-end dropdown-menu-lg-start navbar-status-dropdown-menu border border-secondary"
                    aria-labelledby="dropdownUser2">
                    <div class="navbar-status-div"></div>
                </ul>
            </div>
            <!-- upload dropdown -->
            <div class="dropdown mx-4 my-auto navbar-dropdown-upload">
                <a class="d-flex align-items-centertext link-dark text-decoration-none navbar-upload-icon"
                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <!-- <i class="bi bi-upload p-0 m-0 text"></i> -->
                    <i class="material-icons text icon-bold">cloud_upload</i>
                </a>
                <ul class="dropdown-menu navbar-drop-new-menu text-small shadow bg-dark dropdown-menu-end dropdown-menu-lg-start"
                    aria-labelledby="dropdownUser2">
                    <li>
                        <form class="navForm" id="navFormUpload">
                            <label class="custom-file-upload text ">
                                <input type="file" name="file[]" id="navbarfile" multiple />
                                <i class="bi bi-file-earmark-plus me-2"></i>File upload
                            </label>
                            <input type="text" hidden name="navbar_upload_album_id" class="album_id_for_upload">
                            <input type="text" hidden name="navbar_upload_folder_id" class="folder_id_for_upload">
                        </form>
                    </li>
                    <li><a class="dropdown-item text" href="#"><i class="bi bi-folder-plus me-2"></i>Folder upload</a>
                    </li>
                    <!-- <li><a class="dropdown-item text" href="#"></a></li> -->
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><button class="dropdown-item default-text" data-bs-toggle="modal" data-bs-target="#newAlbum">New
                            Album...</button></li>
                    <li><button class="dropdown-item default-text" data-bs-toggle="modal"
                            data-bs-target="#newFolder">New Folder...</button></li>
                </ul>
            </div>
            <!-- pofile dropdown [START] -->
            <div class="dropdown my-auto profile-dropdown">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none " id="dropdownUser2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <!-- <img src="<?php echo $_SESSION['profileImg']?>" width="32" height="32" class="rounded-circle me-2" alt=""> -->
                    <img src="http://localhost/CloudGallery/public/image/default_user.png" alt="" width="32"
                        height="32" class="rounded-circle me-2">
                    <strong class="text"></strong>
                </a>
                <ul class="dropdown-menu text-small shadow bg-dark dropdown-menu-end dropdown-menu-lg-start"
                    aria-labelledby="dropdownUser2">
                    <li><a class="dropdown-item" href="#">Dashboard</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><a class="dropdown-item" href="#">Theams</a></li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li class="text-muted text-center">Albums <span class="mx-2 text-end album-count"></span></li>
                    <div class="display_all_albums text">
                        <!-- fetching all albums -->
                    </div>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li class="text-muted text-center">Folders <span class="mx-2 text-end folder-count"></span></li>
                    <div class="display_all_folder">
                        <!-- fetching all folders -->
                    </div>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><a class="dropdown-item text-danger signout">Log out</a></li>
                </ul>
            </div>
            <!-- pofile dropdown [END] -->

        </div>
    </div>
</nav>
<!-- file progress -->
<div class="navbar-file-status bg-dark px-0">
    <div class="progress m-2">
        <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0"
            aria-valuemax="100"></div>
    </div>
    <div class="d-flex justify-content-between m-2">
        <p class="m-0 p-0 progress-text text"></p>
        <p class="text m-0 p-0 progress-complete">0%</p>
    </div>

    <!-- warnings -->
    <div class="text-center text" id="status_warn"></div>
</div>

<?php     
    }
    else {
        echo '<nav class="navbar navbar-expand-lg sticky-top">
                <div class="container-fluid">
                <div class="d-flex flex-column nb">
                    <a class="navbar-brand mx-auto py-0 text" href="http://localhost/CloudGallery">S G</a>
                    <p class="m-0 p-0 text">Smart Gallery</p>
                </div>
                <button class="navbar-toggler btn-sm border border-light text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    </ul>
                    <div class="d-flex justify-content-center mx-5">
                        
                        <a class="text-light mx-5" href="http://localhost/CloudGallery/signup" role="button" style="text-decoration: none; font-weight: 600;">Sign In</a>
                    </div>
                </div>
                </div>
            </nav>';
    }
                        
                        




    