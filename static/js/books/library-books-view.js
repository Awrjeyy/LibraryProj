var base_url = window.location.origin
$(document).ready(function(){
    console.log('Test 1: Enter')
    
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/data/',
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(data){
            displayBookList(data);
            console.log(data);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

function displayBookList(data) {
    let template = "";
    $.each(data, function(index, value){
        console.log(value)
        template += "<div class='row'>" +
                    "<p><label> Title :</label> <span id='title-"+ value.id + "'>" + value.title + "</span></p>" +
                    "<p><label> Author :</label> <span id='authorName-"+ value.id + "'>" + value.authorName + "</span></p>" +
                    "<p><a id='"+ value.id + "' href='" + base_url + "/books/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a></p>" +
                    "</div>"
                    
    });
    $('#book-views').append(template)
}
// "<p><a id='"+ value.id + "' href='" + base_url + "/books/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a></p>" +