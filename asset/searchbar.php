
<div class="searchbar sticky-top pt-2 border-secondary border-bottom">
    <div class="my-auto mx-3"> 
        <div class="form-group d-flex">
            <div class="sidebar-toggle mx-2 mt-2">
                <i class="material-icons">filter_list</i>
            </div>
            <input type="text" class="form-control align-middle" placeholder="Search..." />
            <button class="btn userDropBtn m-0 p-0 my-auto" data-bs-toggle="modal" data-bs-target="#userDrop" >
                    <img src="http://localhost/CloudGallery/public/image/default_user.png" alt=""
                                width="32" height="32" class="rounded-circle mx-1 align-middle"> 
            </button>  
                <!-- user dropdown [START] -->
            <div class="dropdown sidebar-dropdown user-dropdown  my-auto align-middle">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none  my-auto" id="dropdownUser2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="http://localhost/CloudGallery/public/image/default_user.png" alt=""
                                width="32" height="32" class="rounded-circle mx-1 align-middle"> 
                </a>
                <ul class="dropdown-menu dropdown-menu-lg-start drop-menu text-small border border-secondary shadow bg-dark" aria-labelledby="dropdownUser2">
                    <li><a class="dropdown-item" href="#"><i class="material-icons me-4 my-auto">space_dashboard</i><span> Dashboard</span></a></li>
                    <li><a class="dropdown-item" href="#"><i class="material-icons me-4 my-auto">settings</i><span> Settings</span></a></li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#theam"><i class="bi bi-moon-fill me-4 my-auto"></i><span class="my-auto"> Theams</span></button></li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><a class="dropdown-item text-danger signout"><i class="material-icons my-auto me-4">logout</i><span> Log out</span></a></li>
                </ul>
            </div>
            <!-- user dropdown [END] -->
        </div>
    </div>
</div>



 




<div class="bottombar ">
    <hr class="m-0 p-0">
    <div class="my-auto">
        <div class="d-flex justify-content-between menu px-3 ">
            <button class="btn d-flex flex-column menu-icon">
                <i class="material-icons mx-auto">home</i>
                <span>Home</span>
            </button>
            <button class="btn d-flex flex-column menu-icon">
                <i class="material-icons mx-auto">favorite_border</i>
                <span>Favourite</span>
            </button> 
            <!-- <button class="btn d-flex flex-column menu-icon">
                <i class="material-icons mx-auto">folder_open</i>
                <span>Folder</span>
            </button> -->
            <button class="btn d-flex flex-column menu-icon text-danger">
                <i class="material-icons mx-auto">upload</i>
                <span>Upload</span>
            </button>
        </div>
    </div>
</div>