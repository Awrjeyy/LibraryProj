$(document).ready(function () {
    var base_url = window.location.origin
    $('#bookcondition').click(function (event){
        
        var bkcondition = $('#bookcondition').val();
        if (bkcondition == 'Digital'){
            $('#condition1').prop('disabled', true);
            $('#condition2').prop('disabled', true);
        }
        else if (bkcondition == 'Physical'){
            $('#condition3').prop('disabled', true);
        }
        else{
            $('#condition1').prop('disabled', false);
            $('#condition2').prop('disabled', false);
            $('#condition3').prop('disabled', false);
        }
        $('#booklocation').val();
        console.log(bkcondition);
        
    });
    
    $('#createbkbtn').click(function (event){
        event.preventDefault();
        console.log("A new book is about to be created.");
        var userid = id
        console.log(userid);
        createBookData = new FormData();
        console.log(($('#bookcover')[0].files[0] != null));
        if(($('#bookcover')[0].files[0] != null)){
            createBookData.append('book_cover', $('#bookcover')[0].files[0]);
        }
        
        createBookData.append('title', $('#title').val());
        createBookData.append('authorName', $('#authorName').val());
        createBookData.append('authorEmail', $('#authorEmail').val());
        createBookData.append('book_condition', $('#bookcondition').val());
        createBookData.append('book_location', $('#booklocation').val());
        createBookData.append('owner', userid);
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
            error: function(error){
                console.log('Error: Something Wrong ' + error);
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



