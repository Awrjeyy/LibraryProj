$(document).ready(function () {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var bookid = urlid.toString().split('/')[3]
    $('#updatebooksdetails').submit(function (event){
        event.preventDefault();
        console.log('updating book');
        updateBookData = new FormData();
        if(updateBookData.append('user_img', $('#updtbkcover')[0].files[0] != null)){
            updateBookData.append('user_img', $('#updtbkcover')[0].files[0]);
        }
        else {
            updateBookData.append('user_img', '');
        }
        updateBookData.append('title', $('#updttitle').val());
        updateBookData.append('authorName', $('#updtauthor').val());
        updateBookData.append('autherEmail', $('#updtaemail').val());
        updateBookData.append('book_description', $('#updtbkdesc').val());
        updateBookData.append('book_condition', $('#updtbkcondition').val());
        updateBookData.append('book_location', $('#updtbklocation').val());
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", bookupdatecsrftoken);
            },
            url: base_url + '/books/api/update/' + bookid ,
            data: updateBookData,
            processData: false,
            contentType: false,
            success: function(response){
                console.log("User has been Updated");
                console.log(response);
            },
            error: function(){
                console.log('Error: Something Wrong');
            }
        });
    });

});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const bookupdatecsrftoken = getCookie('csrftoken');
