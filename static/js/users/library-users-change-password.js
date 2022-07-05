$(document).ready(function () {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var userid = urlid.toString().split('/')[3]
    $('#passwordchange').submit(function (event){
        event.preventDefault();
        console.log('updating password');
        updatePWData = new FormData();
        updatePWData.append('old_password', $('#old_password').val());
        updatePWData.append('password1', $('#password1').val());
        updatePWData.append('password2', $('#password2').val());
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", userupdatepwcsrftoken);
            },
            url: base_url + '/users/api/change-password/' + userid + "/",
            data: updatePWData,
            processData: false,
            contentType: false,
            success: function(response){
                console.log("User has changed password");
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
const userupdatepwcsrftoken = getCookie('csrftoken');
