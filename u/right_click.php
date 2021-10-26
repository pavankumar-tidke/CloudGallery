
<!-- body menu -->
<ul class='custom-menu dropdown-menu drop-new-menu text-small shadow bg-dark'>
    <li><a class="dropdown-item text" href="#"><i class="bi bi-person-fill me-2"></i><?php echo $_SESSION['name'] ?></a></li>
    <li>
        <hr class="dropdown-divider text my-1 mx-2">
    </li>
    <li>
        <form class="sidebarForm" id="sideFormUpload">
            <label class="custom-file-upload text">
                <input type="file" name="file[]" id="sideFile" multiple />
                <i class="bi bi-file-earmark-plus me-2"></i>File Upload
            </label>
            <input type="text" hidden name="navbar_upload_album_id" value="" class="album_id_for_upload">
            <input type="text" hidden name="navbar_upload_folder_id" value="" class="folder_id_for_upload">
        </form>
    </li>
    <li><a class="dropdown-item text" href="#"><i class="bi bi-folder-plus me-2"></i>Folder Upload</a></li>
    <!-- <li><a class="dropdown-item text" href="#"></a></li> -->
    <li>
        <hr class="dropdown-divider text my-1 mx-2">
    </li>
    <li><button class="dropdown-item default-text" data-bs-toggle="modal" data-bs-target="#newAlbum">New
            Album...</button></li>
    <li><button class="dropdown-item default-text" data-bs-toggle="modal" data-bs-target="#newFolder">New
            Folder...</button></li>
</ul>



<!-- music div menu -->
<ul class='folder-context-menu dropdown-menu drop-new-menu text-small border border-secondary shadow bg-dark'>
    <!-- <li><a class="dropdown-item text" href="#"><i class="bi bi-person-fill me-2"></i>Folder actions</a></li>
    <li>
        <button class="dropdown-item text" data-bs-toggle="modal" data-bs-target="#newFolder"><i class="bi bi-folder-plus me-3"></i>New Folder...</button>
    </li>
    <li>
        <hr class="dropdown-divider text my-1 mx-2">
    </li> -->
    <li class="text" id="folder_rename">
        <button class="dropdown-item"   data-bs-toggle="modal" data-bs-target="#renameItem"><i class="material-icons me-2 my-auto">drive_file_rename_outline</i>Rename</button>
    </li>
    <li class="text" id="folder_share">
        <button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#shareItem"><i class="material-icons me-2 my-auto">share</i>Share</button>
    </li>
    <!-- <li class="text" id="folder_moveto">
        <button class="dropdown-item"   data-bs-toggle="modal" data-bs-target="#moveItem"><i class="material-icons me-2 my-auto">drive_file_move</i>Move to</button>
    </li> -->
    <li>
        <hr class="dropdown-divider text my-1 mx-2">
    </li>
    <li class="text" id="folder_remove">
        <a class="dropdown-item" ><i class="material-icons me-2 my-auto">delete</i>Remove</a>
    </li>
</ul>