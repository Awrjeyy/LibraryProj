var base_url = window.location.origin
var userid = id
function displayBookDetail(bookid) {
    let template = "";
    var Date = bookid.added.toString().split('-').join(',').split('T').join(',').split('.')
    var temp = Date[0].split(',')
    var ymd = temp[0]+'-'+temp[1]+'-'+temp[2]
    var time = temp[3]
    console.log(Date)
    console.log(ymd)
    console.log(temp[3])
    console.log(bookid.owner)
    console.log(id == bookid.owner)
    console.log("Function side: " + id)
    console.log("Amount of likes in book: " + bookid.likes)
    
    // console.log()
    // userExistbool = false
    // console.log(bookid.likes.length)
    // console.log(bookid.likes.id)
    // console.log(bookid.likes.length==0)
    // userExist = bookid.likes.filter(function(){
    //     a = bookid.likes
    //     b = bookid.likes.length
    //     for(var i = 0; i < b; i++){
        
    //         if(a[i] !== userid){
    //             userExistbool = true;
    //             console.log(a[i])
    //         }
    //         else{
    //             userExistbool = false;
    //         }
            
            
    //     }
        
    // })


    let bookcover = "<div class='media'><img src=" + bookid.book_cover + " class='card-img-top'></div>"
    let booktitle = "<label> Title :</label> <span id='title-"+ bookid.id + "'>" + bookid.title + "</span>"
    let bookauthor = "<label> Author :</label> <span id='authorName-"+ bookid.id + "'>" + bookid.authorName + "</span>"
    let bookemail =  "<label> Email :</label> <span id='authorEmail-"+ bookid.id + "'>" + bookid.authorEmail + "</span>"
    let bookdesc = "<label> Book Description : </label> <span id='book_description-"+ bookid.id + "'>" + bookid.book_description + "</span>"
    let bookadded = "<label> Date Added : </label> <span id='added-"+ bookid.id + "'>" + ymd + " " + time + "</span>"
    let bookcon = "<label> Condition : </label> <span id='bookcondition'>" + bookid.book_condition + "</span>"
    let bookloc = "<label> Location : </label> <span id='location-"+ bookid.id + "'>" + bookid.book_location + "</span>"
    let bookupdate = "<p><a id='"+ bookid.id + "' href='" + base_url + "/books/update/"+ bookid.id + "' class='btn btn-primary btn-sm'>Update</a></p>"
  


    $('#bookcover').append(bookcover)
    $('#booktitle').append(booktitle)
    $('#bookauthor').append(bookauthor)
    $('#bookemail').append(bookemail)
    $('#bookdesc').append(bookdesc)
    $('#bookadded').append(bookadded)
    $('#bookcon').append(bookcon)
    $('#bookloc').append(bookloc)
    if(bookid.owner == id){
        $('#bookupdate').append(bookupdate)
    }
    

    
}



$(document).ready(function(){
    
    var urlid = window.location.pathname
    var last = urlid.toString().split('/')
    var bookid = last[3]
    console.log('Test 1: Enter')
    console.log('This is urlid ' + bookid )
    console.log(last[3])
    console.log("Document.ready side: " + id)
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


