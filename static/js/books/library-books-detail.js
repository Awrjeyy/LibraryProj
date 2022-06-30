var base_url = window.location.origin

function displayBookDetail(bookid) {
    let template = "";
    var Date = bookid.added.toString().split('-').join(',').split('T').join(',').split('.')
    var temp = Date[0].split(',')
    var ymd = temp[0]+'-'+temp[1]+'-'+temp[2]
    var time = temp[3]
    console.log(Date)
    console.log(ymd)
    console.log(temp[3])
        template = "<div class='row'>" +
                    "<p><label> Title :</label> <span id='title-"+ bookid.id + "'>" + bookid.title + "</span></p>" +
                    "<p><label> Author :</label> <span id='authorName-"+ bookid.id + "'>" + bookid.authorName + "</span></p>" +
                    "<p><label> Email :</label> <span id='authorEmail-"+ bookid.id + "'>" + bookid.authorEmail + "</span></p>" +
                    "<p><label> Condition : </label> <span id='condition-"+ bookid.id + "'>" + bookid.book_condition + "</span></p>" +
                    "<p><label> Date Added : </label> <span id='added-"+ bookid.id + "'>" + ymd + " " + time + "</span></p>" +
                    "</div>"
                    
    
    $('#book-detail').append(template)
}

$(document).ready(function(){
    
    var urlid = window.location.pathname
    var last = urlid.toString().split('/')
    var bookid = last[3]
    console.log('Test 1: Enter')
    console.log('This is urlid ' + bookid )
    console.log(last[3])
    $.ajax({
        method: 'GET',
        url: base_url + '/books/api/detail/' + bookid,
        beforeSend: function(){
            console.log('Before Send');
        },
        success: function(bookid){
            displayBookDetail(bookid);
            console.log(bookid);
        },
        error: function(){
            console.log('Error: Something Wrong');
        }
    });

});

