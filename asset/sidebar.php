<div class="Sidebar d-flex flex-column flex-shrink-0 p-2" id="sidebar">
    <a href="http://localhost" class="text-decoration-none">
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
                        
                        <li>
                            <form class="sidebarForm" id="sideFormUpload">
                                <label class="custom-file-upload text">
                                    <input type="file" name="file[]" id="sideFileUploadSelect" multiple />
                                    <i class="bi bi-file-earmark-arrow-up me-3"></i>File Upload
                                </label> 
                                <input type="text" hidden name="navbar_upload_folder_id" value="" class="folder_id_for_upload">
                            </form>
                        </li>
                        <!-- <li>
                            <a class="dropdown-item text" href="#"><i class="bi bi-folder-plus me-3"></i>Folder (Coming Soon)</a>
                        </li>  -->
                    </ul>
                </div>
            </li>
            <li>
                <hr class="text">
            </li>
        
            <li class="nav-item normal-link my_gallery mt-2 folder-extend" >
                <div class="d-flex"> 
                    <a class="ps-4" id="sidebar-my-gallery-btn">
                        <i class="bi bi-hdd-stack my-auto me-3"></i>My Gallery
                    </a>
                </div> 
            </li>  
            <li class="nav-item normal-link fav mt-2">
                <a class="ps-4 " id="sidebar-favourite-btn"><i class="bi bi-star me-3"></i>Favourite</a>
            </li> 
            <li class="nav-item normal-link bin bin mt-2">
                <a class="ps-4 " id="sidebar-favourite-btn"><i class="bi bi-trash me-3"></i>Recycle</a>
            </li> 
         
    </ul>

    <!-- file progress [START] -->
    <div class="d-flex justify-content-end">
        <button class="p-0 m-0 btn" id="side_status_hide"><i class="bi bi-x text"></i></button>
    </div>
    <div class="file-status px-0">
        <div class="multi-file-div"></div>
        
        <!-- warnings -->
        <div class="text-center text" id="status_warn"></div>
    </div>
    <!-- file progress [END] -->
 
</div>


