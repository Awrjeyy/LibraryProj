var base_url = window.location.origin
$(document).ready(function(){
    console.log('Test 1: Enter')
    
    $.ajax({
        method: 'GET',
        url: base_url + '/users/api/data/',
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(data){
            displayUserList(data);
            console.log(data);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

function displayUserList(data) {
    let template = "";
    $.each(data, function(index, value){
        console.log(value)
        template += "<div class='card mx-auto ' style='width: 18rem;'>" + 
                        "<img src=" + value.user_img + " class='rounded-circle account-img'>" +
                        "<div class='card-body '>" +
                        "<h5 class='card-title'><label> Name : </label> "+ value.first_name + ' ' + value.last_name + "</h5>" +
                        "<p class='card-text'><label> Bio : </label>" + value.bio + "</p>" +
                        "<a id='"+ value.id + "' href='" + base_url + "/users/profile/"+ value.id + "' class='btn btn-primary'>Check it out &rarr;</a>" +
                        "</div>" +
                    "</div><br>"
                    
    });
    $('#users-views').append(template)
}