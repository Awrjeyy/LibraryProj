$(document).ready(function () {
    var base_url = window.location.origin
    $('#loginform').submit(function (event){
        console.log('Initializing Login')
        event.preventDefault();
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", csrftokenlogin);
            },
            url: base_url + '/users/api/login/',
            data: {
                'email': $('#loginemail').val(),
                'password': $('#loginpassword').val(),
                
            },
            success: function(response){
                console.log("User has Logged In and redirected");
                a = window.location.replace(base_url + '/users/')
                console.log(a);
            },
            error: function(){
                console.log('Username or Password is incorrect');
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
const csrftokenlogin = getCookie('csrftoken');


