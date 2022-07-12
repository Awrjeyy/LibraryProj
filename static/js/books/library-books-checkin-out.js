var base_url = window.location.origin
var urlid = window.location.pathname
var last = urlid.toString().split('/')
var bookid = last[3]
var userid = id

function CheckIfAvail(bookid){
    let button = "<p><a id='borrow' href='" +  "' class='btn btn-primary btn-sm' >Borrow</a></p>"
    let downloadbtn = "<p><a id='download' href='" +  "' class='btn btn-primary btn-sm' >Download</a></p>"
    let disablebutton = "<p><a id='borrow' href='" +  "' class='btn btn-primary btn-sm disabled' >Borrow</a></p>"
    let returnbook = "<p><a id='returnbook' href='" +  "' class='btn btn-danger btn-sm' >Return</a></p>"
    let availabletext = ""
    let bookcon = $("#bookcondition").text()
    // console.log(bookid.book)
    // console.log(bookcon=="Digital")
    // console.log(bookid.book_available)
    // console.log(bookid.book_return)
    // console.log(bookid.book == null)
    // console.log(bookid.borrow == userid)
    if(bookcon == "Digital"){
        $('#checkin').append(downloadbtn)
    }
    else if(bookid.book == null){
        $('#checkin').append(button)
    }
    else if(bookid.borrow == userid){
        if((bookid.book_return == 1)||(bookid.book == null)){
            $('#checkin').append(button)
        }
        else{
            $('#checkin').append(returnbook)
        }
        
    }
    else if(bookid.book_available == 1){
        $('#checkin').append(button)
    }
    
    else{
        $('#checkin').append(disablebutton)
    }
    
    // else{
    //     $('#checkin').append(disablebutton)
    // }
    
    if((bookid.book_available == 1)||(bookid.book == null)){
        availabletext = "Available"
    }
    else{
        availabletext = "Borrowed"
    }
    let bookstatus = "<label> Status : </label>" + availabletext
    $('#bookstatus').append(bookstatus)


}

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/borrowed-book/' + bookid,
        beforeSend: function(){
            console.log(bookid)
            console.log('Before Send');
            
        },
        success: function(bookid){
            CheckIfAvail(bookid);
            console.log(bookid);
        },
        error: function(error){
            console.log('Error: Something Wrong', error);
        }
    });
   
});

$('#checkin').click(function (event){
    event.preventDefault();
    console.log("Check")
    updateBorrowBookData = new FormData();
    updateBorrowBookData.append('book_available', '0');
    updateBorrowBookData.append('borrow', userid);
    updateBorrowBookData.append('book', bookid);
    $.ajax({
        type:'POST',
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", bookborrowcsrftoken);
        },
        url: base_url + '/books/api/borrow/' + bookid,
        data: updateBorrowBookData,
        processData: false,
        contentType: false,
        success: function(response){
            CheckIfAvail(bookid);
            console.log("Book has been Borrowed");
            console.log(response);
            location.reload();
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });
});

$('#checkout').click(function (event){
    event.preventDefault();
    console.log("Returning in Progress")
    updateBorrowBookData = new FormData();
    updateBorrowBookData.append('book_available', '1');
    updateBorrowBookData.append('book_return', '1');
    $.ajax({
        type:'POST',
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", bookborrowcsrftoken);
        },
        url: base_url + '/books/api/return/' + bookid,
        data: updateBorrowBookData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log("Book has been Borrowed");
            console.log(response);
            location.reload();
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
const bookborrowcsrftoken = getCookie('csrftoken');
