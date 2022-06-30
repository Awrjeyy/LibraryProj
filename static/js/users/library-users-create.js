$(document).ready(function () {
    var base_url = window.location.origin
    $('#userform').submit(function (event){
        event.preventDefault();
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            url: base_url + '/users/api/create/',
            data: {
                'email': $('#email').val(),
                'first_name': $('#first_name').val(),
                'last_name': $('#last_name').val(),
                'password': $('#password1').val(),
                'password2': $('#password2').val(),
                
            },
            success: function(response){
                console.log("User has been Created");
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
const csrftoken = getCookie('csrftoken');