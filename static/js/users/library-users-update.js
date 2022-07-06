function displayFormUserDetail(userid) {
    let template = "";
    var logintimedata = userid.last_login.toString().split('-').join(',').split('T').join('|').split('.')
    var logintime = logintimedata[0].split(',').join('-').split('|')
    var joineddata = userid.date_joined.toString().split('-').join(',').split('T').join('|').split('Z')
    var joinedtime = joineddata[0].split(',').join('-').split('|')
    console.log(userid.date_joined)
    console.log(logintimedata)
    console.log(logintime[0])
    console.log(id)
    console.log(userid.id)
    var userimg = userid.user_img
    var firstname = userid.first_name
    var lastname = userid.last_name
    var bio = userid.bio
    console.log(userimg)

    $('#updtfname').val(firstname).change();
    $('#updtlname').val(lastname).change();
    $('#updtbio').val(bio).change();
   
}


$(document).ready(function () {
    var base_url = window.location.origin
    var urlid = window.location.pathname
    var userid = urlid.toString().split('/')[3]
    $.ajax({
        method: 'GET',
        url: base_url + '/users/api/detail/' + userid + '/',
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(userid){
            displayFormUserDetail(userid);
            console.log(userid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });
    

});

$('#updateuserdetails').submit(function (event){
    event.preventDefault();
    console.log('updating user');
    updateData = new FormData();
    updateData.append('user_img', $('#updtusrimg')[0].files[0])
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
