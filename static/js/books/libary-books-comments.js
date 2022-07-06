var base_url = window.location.origin
var urlid = window.location.pathname
var last = urlid.toString().split('/')
var bookid = last[3]
var userid = id
var first_name = firstname
var last_name = lastname

$('#commentform').submit(function (event){
    event.preventDefault();
    console.log("A new book is about to be created.");
    CommentBookData = new FormData();
    CommentBookData.append('book', bookid);
    CommentBookData.append('user', userid);
    CommentBookData.append('user_firstname', first_name);
    CommentBookData.append('user_lastname', last_name);
    CommentBookData.append('bookcontent', $('#bookcommentcontent').val());
    console.log(first_name)
    console.log(last_name)
    $.ajax({
        type:'POST',
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", commentcsrftoken);
        },
        url: base_url + '/books/api/create-comment/',
        data: CommentBookData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log("BookLog has been Created");
            console.log(response);
            location.reload();
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });
});

function displayBookComment(bookid){
    let template = ""
    $.each(bookid, function(index, value){
        console.log(value)
        template += "<div class=' card mx-auto justify-content-center align-middle' >" + 
                        "<div class='card-body w-50'>" +
                        "<div class='row'><div class = 'col'>" +
                        "<h5 class='card-title'>User : " + value.user_firstname + " " + value.user_lastname  +"</h5>" +
                        "</div></div>" +
                        "<p class='card-text'><label> Says : </label>" + value.bookcontent + "</p>" +
                        "</div>" +
                    "</div><br>"

                    
    });
    $('#commentdisplay').append(template)
};

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/display/' + bookid,
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(bookid){
            displayBookComment(bookid);
            console.log(bookid);
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
const commentcsrftoken = getCookie('csrftoken');

