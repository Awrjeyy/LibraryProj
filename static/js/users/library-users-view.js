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
        template += "<div class='row'>" +
                    "<p><label> Name :</label> <span id='title-"+ value.id + "'>" + value.first_name + ' ' + value.last_name + "</span></p>" +
                    "<p><label> Bio :</label> <span id='authorName-"+ value.id + "'>" + value.bio + "</span></p>" +
                    "<p><a id='"+ value.id + "' href='" + base_url + "/users/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a></p>" +
                    "</div>"
                    
    });
    $('#users-views').append(template)
}