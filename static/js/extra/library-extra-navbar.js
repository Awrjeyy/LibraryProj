var base_url = window.location.origin

$(document).ready(function(){
    console.log('Ready.')
    
    $.ajax({
        beforeSend: function(){
            console.log('Set');
        },
        success: function(){
            putBookhref();
            putUserhref();
            console.log('GO!');
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

function putBookhref() {
    let template = "";
    
        console.log()
        template = "<a class='nav-link' href='/books/'>Books</a>"
                    
    
    $('#for-books-home').append(template)
}
function putUserhref() {
    let template = "";
    
        console.log()
        template = "<a class='nav-link' href='/users/'>Usres</a>"
                    
    
    $('#for-users-home').append(template)
}