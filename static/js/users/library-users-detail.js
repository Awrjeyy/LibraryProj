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
    console.log(id)
    console.log(userid.id)


    let fullname = "<label> Name: </label> " + userid.first_name + userid.last_name
    let userpic = "<img src=" + userid.user_img + " class='rounded-circle account-img'>"
    let useremail = "<label> Email: </label> " + userid.email
    let userbio = "<label> Bio: </label> " + userid.bio
    let userupdate = ""
    if(userid.id == id){
        userupdate = "<a id='"+ userid.id + "' href='" + base_url + "/users/update/"+ userid.id + "' class='btn btn-primary btn-sm'>Update</a>"
    }
    else{
        userupdate = ""
    }


    $('#userpic').append(userpic)
    $('#userfirstlastname').append(fullname)
    $('#userEmail').append(useremail)
    $('#userBio').append(userbio)
    $('#userupdate').append(userupdate)
   
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


