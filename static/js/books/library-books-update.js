var base_url = window.location.origin
var base_url = window.location.origin
var urlid = window.location.pathname
var bookid = urlid.toString().split('/')[3]
function displayBookFormDetail(bookid) {
    
    var booktitle = bookid.title
    var bookauthor = bookid.authorName 
    var bookemail =  bookid.authorEmail
    var bookdesc =  bookid.book_description 
    
    var bookcon = bookid.book_condition 
    var bookloc = bookid.book_location
    
    
    $('#updttitle').val(booktitle).change();
    $('#updtauthor').val(bookauthor).change();
    $('#updtaemail').val(bookemail).change();
    $('#updtbkdesc').val(bookdesc).change();
    $('#updtbkcondition').val(bookcon).change();
    $('#updtbklocation').val(bookloc).change();

    
}

$(document).ready(function () {
    
    console.log(bookid)
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/detail/' + bookid,
        beforeSend: function(){
            console.log('Book Update is being initialized');
        },
        success: function(bookid){
            displayBookFormDetail(bookid);
            console.log("Book Updated Successfully: " + bookid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

$('#updatebooksdetails').submit(function (event){
    event.preventDefault();
    console.log('updating book');
    updateBookData = new FormData();
    if(($('#updtbkcover')[0].files[0] != null)){
        updateBookData.append('book_cover', $('#updtbkcover')[0].files[0])
        
    }
    else {
        updateBookData.append('book_cover', '');
        
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
            console.log(bookid)
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
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
