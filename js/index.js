var siteNameInput = document.getElementById("bookmarkName");
var webUrlInput = document. getElementById("bookmarkURL");
var tableBody = document.getElementById("tableContent");

var content=[]

if (localStorage.getItem("website")==null){
    content=[]
}else{
    content = JSON.parse(localStorage.getItem("website"))

    display()
}
function addWeb(){
    if(
        validateInput(siteNameInput) &&
        validateInput(webUrlInput) 
    ){
        var site = {
            name: siteNameInput.value,
            url: webUrlInput.value
        }
        content.push(site);
        localStorage.setItem("website", JSON.stringify(content))
        console.log(content);
        clearForm();
        display()

    }
    
}

function display(){
    var cartona=""
    for (i = 1; i < content.length; i++) {
        cartona += `
        
                <tr>
                <td>${i}</td>
                <td>${content[i].name}</td>
                <td>
                  <button onclick="visitWbsite()" class="btn btn-visit" data-index="0">
                    <i  class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteWebsite(${i})" class="btn btn-delete pe-2" data-index="0">
                    <i  class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `
    }
    document.getElementById("tableContent").innerHTML = cartona;
}
function clearForm(){
    siteNameInput.value=null;
    webUrlInput.value=null;
}

function deleteWebsite(deletedindex){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            content.splice(deletedindex, 1);
            display()
            localStorage.setItem("website", JSON.stringify(content));
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

}


function validateInput(ele) {
    
    var regex = {
        bookmarkName: /^[A-Z][a-z]{3,10}$/,
        bookmarkURL:/^.{2,}\.com$/
      
}
    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');

        return true
    } else {
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');

        return false

    }
}