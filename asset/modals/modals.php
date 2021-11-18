


<!-- Error Exception -->
<div class="modal fade " id="ERROREXCEPTIONMODAL"  data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content border">
            <div class="modal-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex justify-content-start my-auto" id="ERROREXCEPTIONMSG"></div>
                    <button type="button" class="btn-close text my-auto p-0 m-0" data-bs-dismiss="modal" aria-label="Close"><i class="material-icons p-0 m-0 text-muted">close</i></button>
                </div>
            </div>
        </div>
    </div>
</div>








<!-- userDrop Modal -->
<div class="modal fade" id="userDrop" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- <div class="modal-header">
                <h5 class="modal-title text" id="staticBackdropLabel">Create New Album</h5>
                <button type="button" class="btn-close text" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
            <div class="modal-body border border-secondary user-dropdown-modal"> 
                <div class="p-0">
                    <ul class="m-0 p-0">
                        <li class="my-profile-btn"><a class="dropdown-item"><i class="material-icons me-4 my-auto">space_dashboard</i><span> Dashboard</span></a></li>
                        <li><a class="dropdown-item" href="#"><i class="material-icons me-4 my-auto">settings</i><span> Settings</span></a></li>
                        <li>
                            <hr class="dropdown-divider text my-1 mx-2">
                        </li>
                        <li><button class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#theam"><i class="bi bi-moon-fill me-4 my-auto"></i> Themes</button></li>
                        <li>
                            <div class="d-flex justify-content-start ms-5">
                                <button type="button" class="btn  border border-secondary text-dark theam-btn bold rounded-circle py-3 mx-1" id="Light" 
                                    style="background: rgb(255,255,255) !important; background: linear-gradient(142deg, rgba(255,255,255,1) 54%, rgba(164,164,164,1) 54%) !important;"></button>
                                <button type="button" class="btn  border border-secondary text-secondary theam-btn bold  rounded-circle border py-3 mx-1" id="Dark" 
                                    style="background: rgb(0,0,0) !important; background: linear-gradient(142deg, rgba(0,0,0,1) 54%, rgba(153,152,152,1) 54%) !important;"></button> 
                            </div>
                        </li>
                        <li>
                            <hr class="dropdown-divider text my-1 mx-2">
                        </li>
                        <li><a class="dropdown-item text-danger signout"><i class="material-icons my-auto me-4">logout</i><span> Log out</span></a></li>
                    </ul> 
                </div>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn default-btn px-5 py-1" id="new-album-create-btn" >Create</button>
            </div> -->
        </div>
    </div>
</div>


<!-- creating folder Modal -->
<div class="folderModal">
    <div class="modal fade" id="newFolder"  data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-1 border-secondary">
                <div class="modal-header m-0 p-0 border-bottom-0">
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-end mb-1 rounded-pill ">
                        <button type="button" class="btn-close text text-light" data-bs-dismiss="modal" aria-label="Close">X</button>
                    </div>
                    <div class="m-1">
                        <h6 class="text">New Folder</h6>
                        <div class="form-group">
                            <!-- <input type="text" class="form-control my-1" id="r_foleder_id"  value=""> -->
                            <input type="text" class="form-control my-1" id="new-folder-name" aria-selected value="Untitled_Folder">
                            <div class="d-flex justify-content-start my-1" id="newFolder_warn"></div>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button type="button" class="btn default-btn px-5 py-1" id="new-folder-create-btn" >Create</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer m-0 p-0 border-top-0">
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Preview -->
<div class="preview-div">
    <div class="modal fade" id="previweModal"  data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content border-1 border-secondary">
                <div class="modal-header m-0 p-0 border-bottom-0">
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-end  rounded-pill ">
                        <button type="button" class="btn text-light preview-close" data-bs-dismiss="modal" aria-label="Close"><span class="text-light">CLOSE</span></button>
                    </div>
                    <div class="m-1">
                        <h6 class="media-name text-light"></h6> 
                        <div class="d-flex justify-content-center">
                            <div class="my-3" >
                                <div class="media-view text-light" style="margin-top: 100px !important;"> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer m-0 p-0 border-top-0">
                </div>
            </div>
        </div>
    </div>
</div>









<!-- Rename the media items -->
<div class="modal fade " id="renameItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content border ">
            <div class="modal-header">
                <h5 class="modal-title text" id="staticBackdropLabel">Rename </h5>
                <button type="button" class="btn-close text" data-bs-dismiss="modal" aria-label="Close"><i class="material-icons p-0 m-0 text-muted">close</i></button>
            </div>
            <div class="modal-body">
                <div class="m-3">
                    <div class="form-group">
                        <input type="text" class="form-control" id="rename-item-name" value="">
                        <input type="text" class="form-control" hidden id="rename-item-original-name" value="">
                        <input type="text" class="form-control" hidden id="rename-item-id" value="">
                        <input type="text" class="form-control" hidden id="rename-item-category" value="">
                        <input type="text" class="form-control" hidden id="card-id" value="">
                        <div class="d-flex justify-content-start my-1" id="renameItem_warn"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default-btn px-5 py-1" id="rename-item-btn" >Rename</button>
            </div>
        </div>
    </div>
</div>

<!-- Sharing media items -->
<div class="modal fade " id="shareItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content border ">
            <div class="modal-header p-2">
                <h5 class="modal-title text" id="staticBackdropLabel">Share Link </h5>
                <button type="button" class="btn-close text" data-bs-dismiss="modal" aria-label="Close"><i class="material-icons p-0 m-0 text-muted">close</i></button>
            </div>
            <div class="modal-body">
                <div class="my-4">
                    <div class="d-flex justify-content-start" id="shareItem_warn"></div>
                    <div class="d-flex justify-content-center link-div text"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Move to other folder or album -->
<div class="modal fade " id="moveItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content border ">
            <div class="modal-header">
                <h5 class="modal-title text" id="staticBackdropLabel">Move to </h5>
                <button type="button" class="btn-close text" data-bs-dismiss="modal" aria-label="Close"><i class="material-icons p-0 m-0 text-muted">close</i></button>
            </div>
            <div class="modal-body">
                <div class="m-3">
                    <div class="form-group">
                        
                        <div class="d-flex justify-content-start my-1" id="moveItem_warn"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default-btn px-5 py-1" id="move-item-btn" >Move to</button>
            </div>
        </div>
    </div>
</div>


<!-- theams -->
<div class="modal fade " id="theam" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content border ">
            <div class="modal-header">
                <h5 class="modal-title text" id="staticBackdropLabel">Select Theam </h5>
                <button type="button" class="btn-close text" data-bs-dismiss="modal" aria-label="Close"><i class="material-icons p-0 m-0 text-muted">close</i></button>
            </div>
            <div class="modal-body">
                <div class="m-3">
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn bg-light border border-dark text-dark theam-btn bold py-2 px-4 " id="lightTheam">Light</button>
                        <button type="button" class="btn bg-dark border border-primary text-info theam-btn bold py-2 px-4 border" id="darkTheam">Dark</button>
                        <button type="button" class="btn bg-danger border border-danger text-light theam-btn bold py-2 px-4 " id="">Reeed</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>





