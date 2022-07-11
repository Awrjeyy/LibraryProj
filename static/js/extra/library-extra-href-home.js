$(document).ready(function(){
    
    var urlid = window.location.pathname
    var last = urlid.toString().split('/')
    var bookid = last[1]
    console.log(bookid)
    if (bookid == "books"){
        $("#idkanymore").attr("href", "/books/")

    }
    else{
        $("#idkanymore").attr("href", "/users/")
        console.log("sulod2")
    }

});