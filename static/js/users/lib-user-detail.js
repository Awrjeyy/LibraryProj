var base_url = window.location.origin

function displayUserDetail(userid) {
    let template = "";
    var logintimedata = userid.last_login.toString().split('-').join(',').split('T').join('|').split('.')
    var logintime = logintimedata[0].split(',').join('-').split('|')
    var joineddata = userid.date_joined.toString().split('-').join(',').split('T').join('|').split('Z')
    var joinedtime = joineddata[0].split(',').join('-').split('|')
    console.log(userid.date_joined)
    console.log(logintimedata)
    console.log(logintime[0])
        template = "<div class='row'>" +
                    "<p><div class='media'><img src=" + userid.user_img + " class='card-img-top'></div></p>" +
                    "<p><label> Name :</label> <span id='title-"+ userid.id + "'>" + userid.first_name + " " + userid.last_name + "</span></p>" +
                    "<p><label> Email :</label> <span id='authorName-"+ userid.id + "'>" + userid.email + "</span></p>" +
                    "<p><label> Bio :</label> <span id='authorEmail-"+ userid.id + "'>" + userid.bio + "</span></p>" +
                    "<p><label> Last Login : </label> <span id='condition-"+ userid.id + "'>" + logintime[0] + ' ' + logintime[1] + "</span></p>" +
                    "<p><label> Date Joined : </label> <span id='added-"+ userid.id + "'>" + joinedtime[0] + ' ' + joinedtime[1] + "</span></p>" +
                    "<p><a id='"+ userid.id + "' href='" + base_url + "/users/update/"+ userid.id + "' class='btn btn-primary'>Update</a></p>" +
                    "<p><a id='"+ userid.id + "' href='" + base_url + "/users/delete/"+ userid.id + "' class='btn btn-danger'>Delete</a></p>" +
                    "</div>"
                    
    
    $('#users-detail').append(template)
    console.log(userid.user_img)
}

$(document).ready(function(){
    
    var urlid = window.location.pathname
    var userid = urlid.toString().split('/')[3]
    console.log('Test 1: Enter')
    console.log('This is base_url ' + base_url)
    console.log('This is userid ' + userid )
    $.ajax({
        method: 'GET',
        url: base_url + '/users/api/detail/' + userid + '/',
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(userid){
            displayUserDetail(userid);
            console.log(userid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});


