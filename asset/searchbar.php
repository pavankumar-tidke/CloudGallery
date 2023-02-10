
<div class="searchbar sticky-top pt-2 border-secondary border-bottom">
    <div class="my-auto mx-1"> 
        <div class="form-group d-flex">
            <div class="sidebar-toggle mx-2 mt-2">
                <i class="material-icons">filter_list</i>
            </div>
            <input type="text" name="searchbar" id="search_query" onkeyup="searchmedia()" class="form-control align-middle" placeholder="Search..." />
            <button class="btn userDropBtn m-0 p-0 my-auto" data-bs-toggle="modal" data-bs-target="#userDrop" >
                    <img src="http://localhost/public/image/default_user.png" alt=""
                                width="32" height="32" class="rounded-circle mx-1 align-middle"> 
            </button>  
                <!-- user dropdown [START] -->
            <div class="dropdown sidebar-dropdown user-dropdown  my-auto align-middle">
                <a href="#" class="d-flex align-items-center link-dark text-decoration-none  my-auto" id="dropdownUser2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="http://localhost/public/image/default_user.png" alt=""
                                width="32" height="32" class="rounded-circle mx-1 align-middle"> 
                </a>
                <ul class="dropdown-menu dropdown-menu-lg-start drop-menu text-small border border-secondary shadow bg-dark" aria-labelledby="dropdownUser2">
                    <li class="my-profile-btn"><a class="dropdown-item" ><i class="material-icons me-4 my-auto">space_dashboard</i><span> Dashboard</span></a></li>
                    <li>
                        <hr class="dropdown-divider text my-1 mx-2">
                    </li>
                    <li><button class="dropdown-item" ><i class="bi bi-moon-fill me-4 my-auto"></i><span class="my-auto"> Themes</span></button></li>
                    <li>
                        <div class="d-flex justify-content-start ms-5">
                            <button type="button" class="btn  border border-secondary text-secondary theam-btn bold rounded-circle py-3 mx-1" id="Light" 
                                style="background: rgb(255,255,255)  !important; background: linear-gradient(142deg, rgba(255,255,255,1) 54%, rgba(164,164,164,1) 54%) !important;">.</button>
                            <button type="button" class="btn  border border-secondary text-secondary theam-btn bold  rounded-circle border py-3 mx-1" id="Dark" 
                                style="background: rgb(0,0,0) !important; background: linear-gradient(142deg, rgba(0,0,0,1) 54%, rgba(153,152,152,1) 54%) !important;">.</button> 
                        </div>  
                    </li>
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
            <button class="btn d-flex flex-column menu-icon" id="botNavHomeCont">
                <i class="material-icons-outlined mx-auto">home</i>
                <span>Home</span>
            </button>
            <button class="btn d-flex flex-column menu-icon" id="botNavFavBtn">
                <i class="material-icons mx-auto">favorite_border</i>
                <span>Favourite</span>
            </button> 
            <!-- <button class="btn d-flex flex-column menu-icon">
                <i class="material-icons mx-auto">folder_open</i>
                <span>Folder</span>
            </button> -->
            <button class="btn d-flex flex-column menu-icon text-danger" id="file-status">
                <i class="material-icons-outlined mx-auto">upload</i>
                <span>Files</span>
            </button>
        </div>
    </div>
</div>