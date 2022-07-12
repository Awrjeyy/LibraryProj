var base_url = window.location.origin
function displayBookFormDetail(bookid) {
    let template = "";
    var Date = bookid.added.toString().split('-').join(',').split('T').join(',').split('.')
    var temp = Date[0].split(',')
    var ymd = temp[0]+'-'+temp[1]+'-'+temp[2]
    var time = temp[3]
    
        
    
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
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var bookid = urlid.toString().split('/')[3]
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/detail/' + bookid,
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(bookid){
            displayBookFormDetail(bookid);
            console.log(bookid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

$('#updatebooksdetails').submit(function (event){
    event.preventDefault();
    var urlid = window.location.pathname
    var bookid = urlid.toString().split('/')[3]
    console.log('updating book');
    updateBookData = new FormData();
    if(($('#updtbkcover')[0].files[0] != null)){
        updateBookData.append('book_cover', $('#updtbkcover')[0].files[0]);
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
