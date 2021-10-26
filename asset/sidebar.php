<div class="Sidebar d-flex flex-column flex-shrink-0 p-2" id="sidebar">
    <a href="http://localhost/CloudGallery" class="text-decoration-none">
        <div class="d-flex flex-column sb">
            <a class="mx-auto py-0 text side-brand">S G</a>
            <!-- <p class="my-0 mx-auto p-0 text">Smart Gallery</p> -->
        </div>
    </a>
    <hr class="text">
    <ul class="nav nav-pills flex-column sideul mb-auto">
        
            <li class="nav-item sidebar-dropdown sidebar-dropdown-">
                <div class="dropdown">
                    <a class="d-flex align-items-center py-2 text border link-dark text-decoration-none dropdown-new"
                        id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        New
                    </a>
                    <ul class="dropdown-menu drop-new-menu text-small border-1 border-secondary shadow bg-dark" aria-labelledby="dropdownUser2">
                        <!-- <li><button class="dropdown-item default-text" data-bs-toggle="modal" data-bs-target="#newAlbum">New Album...</button></li> -->
                        <!-- <li>
                            <button class="dropdown-item text" data-bs-toggle="modal" data-bs-target="#newFolder"><i class="bi bi-folder-plus me-3"></i>New Folder...</button>
                        </li> -->
                        <!-- <li>
                            <hr class="dropdown-divider text my-1 mx-2">
                        </li> -->
                        <li>
                            <form class="sidebarForm" id="sideFormUpload">
                                <label class="custom-file-upload text">
                                    <input type="file" name="file[]" id="sideFileUploadSelect" multiple />
                                    <i class="bi bi-file-earmark-arrow-up me-3"></i>File Upload
                                </label>
                                <input type="text" hidden name="navbar_upload_album_id" value="" class="album_id_for_upload">
                                <input type="text" hidden name="navbar_upload_folder_id" value="" class="folder_id_for_upload">
                            </form>
                        </li>
                        <li>
                            <a class="dropdown-item text" href="#"><i class="bi bi-folder-plus me-3"></i>Folder (Coming Soon)</a>
                        </li>
                            <!-- <li><a class="dropdown-item text" href="#"></a></li> -->
                    </ul>
                </div>
            </li>
            <li>
                <hr class="text">
            </li>
        
            <li class="nav-item normal-link my_gallery mt-2 folder-extend" >
                <div class="d-flex">
                    <!-- <div class="d-flex  folder-extend-icon folder-extend-icon-main my-auto ">
                        <i class="bi bi-caret-right-fill my-auto ms-1 text  "></i>
                    </div> -->
                    <a class="ps-4" id="sidebar-my-gallery-btn">
                        <i class="bi bi-hdd-stack my-auto me-3"></i>My Gallery
                    </a>
                </div> 
            </li> 
            <!-- <li class="nest-folders my-0" >
                <ul class="tree"> 
                </ul>
    
            </li> -->
            <li class="nav-item normal-link fav mt-2">
                <a class="ps-4 " id="sidebar-favourite-btn"><i class="bi bi-star me-3"></i>Favourite</a>
            </li>
            <li class="nav-item normal-link bin bin mt-2">
                <a class="ps-4 " id="sidebar-favourite-btn"><i class="bi bi-trash me-3"></i>Bin</a>
            </li> 
        
        <!-- <li class="nav-item my-1 sidebar-dropdown">
            <div class="dropdown">
                <a class="d-flex align-items-center text link-dark text-decoration-none dropdown-a"
                    id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-star-fill me-2"></i>Favourte
                </a>
                <ul class="dropdown-menu text-small shadow bg-dark dropdown-right" aria-labelledby="dropdownUser2">
                    <li><a class="dropdown-item text" href="#">Photos</a></li>
                    <li><a class="dropdown-item text" href="#">Videos</a></li>
                </ul>
            </div>
        </li>  -->
    </ul>
    <!-- file progress -->
    <div class="d-flex justify-content-end">
        <button class="p-0 m-0 btn" id="side_status_hide"><i class="bi bi-x text"></i></button>
    </div>
    <div class="file-status px-0">
        <div class="multi-file-div"></div>
        
        <!-- warnings -->
        <div class="text-center text" id="status_warn"></div>
    </div>


    <!-- user dropdown [START] -->
    
    <!-- user dropdown [END] -->
</div>


