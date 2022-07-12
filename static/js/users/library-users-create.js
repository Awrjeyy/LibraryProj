$(document).ready(function () {
    var base_url = window.location.origin
    $('#resgisterbtn').click(function (event){
        event.preventDefault();
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", createcsrftoken);
            },
            url: base_url + '/users/api/create/',
            data: {
                'email': $('#email').val(),
                'password': $('#password1').val(),
                'first_name': $('#first_name').val(),
                'last_name': $('#last_name').val(),
                'password2': $('#password2').val(),
                
            },
            success: function(response){
                console.log("User has been Created");
                console.log(response);
            },
            error: function(error){
                console.log('Error: Something Wrong: ' + error);
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
const createcsrftoken = getCookie('csrftoken');

