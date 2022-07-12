var base_url = window.location.origin
var userid = id

function DisplayLike(bookid){


    userExist = bookid.likes.filter(function(){
        a = bookid.likes
        b = bookid.likes.length
        for(var i = 0; i < b; i++){
        
            if((a[i] !== userid).length<=1){
                userExistbool = false;
                
            }
            else if((a[i] !== userid).length>1){
                userExistbool = true;
            }
            else{
                userExistbool = false;
            }
            console.log((a[i] !== userid).length)
            
        }
        
    })

    let likecount = bookid.likes.length
    let like = "<p><button id='like' type='submit' href='" +  "' class='btn btn-primary btn-sm' >Like</button><b> -"+likecount+"</b></p>"
    let dislike = "<p><button id='dislike' type='submit' href='" +  "' class='btn btn-danger btn-sm ' >Dislike</button><b> -"+likecount+"</b></p>"

    if(userExistbool == true){
        $('#dislike').append(dislike)
    }else{
        $('#like').append(like)
    }

};

$(document).ready(function(){
    
    var urlid = window.location.pathname
    var last = urlid.toString().split('/')
    var bookid = last[3]
    
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/detail/' + bookid,
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(bookid){
            DisplayLike(bookid);
            console.log(bookid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });
    

});


$('#like').click(function (event){
    $.ajax({
        type:'POST',
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", likecsrftoken);
        },
        url: base_url + '/books/api/like/' + bookid ,
        
        success: function(response){
            console.log("User has been Updated");
            console.log(response);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });
});
$('#dislike').click(function (event){

    $.ajax({
        type:'DELETE',
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", dislikecsrftoken);
        },
        url: base_url + '/books/api/dislike/' + bookid ,
        
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
const dislikecsrftoken = getCookie('csrftoken');

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
const likecsrftoken = getCookie('csrftoken');