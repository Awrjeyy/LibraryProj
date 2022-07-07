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
        
        template += "<div class='card mx-auto ' style='width: 18rem;'>" + 
                        "<img src=" + value.book_cover + " >" +
                        "<div class='card-body '>" +
                        "<h5 class='card-title'>Title : " + value.title +"</h5>" +
                        "<p class='card-text'><label> Author : </label>" + value.authorName + "</p>" +
                        "<a id='"+ value.id + "' href='" + base_url + "/books/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a>" +
                        "</div>" +
                    "</div><br>"

                    
    });
    $('#book-views').append(template)
}
// "<p><a id='"+ value.id + "' href='" + base_url + "/books/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a></p>" +