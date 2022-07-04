$(document).ready(function () {
    var base_url = window.location.origin
    $('#bookform').submit(function (event){
        event.preventDefault();
        console.log("A new book is about to be created.");
        createBookData = new FormData();
        createBookData.append('title', $('#title').val());
        createBookData.append('authorName', $('#authorName').val());
        createBookData.append('authorEmail', $('#authorEmail').val());
        createBookData.append('book_condition', $('#bookcondition').val());
        createBookData.append('book_location', $('#booklocation').val());
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", createbookcsrftoken);
            },
            url: base_url + '/books/api/create/',
            data: createBookData,
            processData: false,
            contentType: false,
            success: function(response){
                console.log("BookLog has been Created");
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
const createbookcsrftoken = getCookie('csrftoken');

