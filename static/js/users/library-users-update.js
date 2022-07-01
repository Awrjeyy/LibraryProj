$(document).ready(function () {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var userid = urlid.toString().split('/')[3]
    $('#updateuserdetails').submit(function (event){
        event.preventDefault();
        console.log('updating user');
        updateData = new FormData();
        updateData.append('user_img', $('#updtusrimg')[0].files[0]);
        updateData.append('first_name', $('#updtfname').val());
        updateData.append('last_name', $('#updtlname').val());
        updateData.append('bio', $('#updtbio').val());
        $.ajax({
            type:'POST',
            beforeSend: function(xhr, settings){
                xhr.setRequestHeader("X-CSRFToken", userupdatecsrftoken);
            },
            url: base_url + '/users/api/update/' + userid + "/",
            data: updateData,
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
const userupdatecsrftoken = getCookie('csrftoken');
