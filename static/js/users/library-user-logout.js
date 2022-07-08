
$(document).ready(function () {
    $('#logoutbutton').click(function (event){
        console.log('Pizza')
        event.preventDefault();
        $.ajax({
            type:'GET',
            url: base_url + '/users/api/logout/',
            data: {},
            success: function(response){
                console.log("User has Logged out");
                a = window.location.replace(base_url + '/users/login/')
                console.log(a);
            },
            error: function(){
                console.log('Error: Something Wrong');
            }
        });
    });
    

});

