let searchfilter = ""
let q = ""
var base_url = window.location.origin
var serachurl = ""
var searchlist = ""
let newurl = ""
$(document).ready(function(){
    newurl = base_url + '/users/search/' + searchlist
    
    console.log(searchfilter);
    
    searchfilterfunc();
    
});

function searchfilterfunc(){
    $('#searchfilter').click(function (event){
        
        searchurl = window.location.href
        searchlist = searchurl.split("/")
        searchlist = searchlist[searchlist.length-1]
        console.log(searchfilter)
        console.log(q)
        console.log(searchurl)
        console.log(searchlist)
        
        
        console.log(newurl)
        
        
        
        
        
    })
    $('#submitsearch').click(function(event){
        q = $("#searchingbar").val();
        searchfilter = $("#searchfilter").val();
        newurl = base_url + '/users/search/?q=' + q +"&searchfilter=" + searchfilter
        
        $.ajax({
            method: 'GET',
            url: base_url + '/users/api/search/?q=' + q +"&searchfilter=" + searchfilter,
            beforeSend: function(){
                console.log('Before Send');
                console.log(q);
            },
            success: function(searchlist){
                
                console.log(searchlist);
                displaySearchResultList(searchlist)
                
            },
            error: function(){
                console.log('Error: Something Wrong');
            }
        });
        
         
    });
    $('#searchingbar').click(function(event){
        counter=0;
        $('#forremove').remove();
        counter++;
         
    });
    
};
function displaySearchResultList(searchlist) {
    let bookresult = "";
    let templatefordelall = "<div id='forremove'></div>";
    console.log(searchfilter=="book")
    console.log(searchfilter=="users")
    $('#views-results').append(templatefordelall)
    if (searchfilter=="book"){
        $.each(searchlist, function(index, value){
            console.log(index)
            bookresult += "<div class='card mx-auto ' style='width: 18rem;'>" + 
                            "<img src=" + value.book_cover + " >" +
                            "<div class='card-body '>" +
                            "<h5 class='card-title'>Title : " + value.title +"</h5>" +
                            "<p class='card-text'><label> Author : </label>" + value.authorName + "</p>" +
                            "<a id='"+ value.id + "' href='" + base_url + "/books/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a>" +
                            "</div>" +
                        "</div></div><br>"
    
                        
        });
    }
    else if(searchfilter=="users"){
        $.each(searchlist, function(index, value){
            console.log(index)
            bookresult += "<div id='forremove'><div class='card mx-auto ' style='width: 18rem;'>" + 
                            "<img src=" + value.user_img + " >" +
                            "<div class='card-body '>" +
                            "<h5 class='card-title'>Title : " + value.first_name + " " + value.last_name +"</h5>" +
                            "<p class='card-text'><label> Author : </label>" + value.bio + "</p>" +
                            "<a id='"+ value.id + "' href='" + base_url + "/users/detail/"+ value.id + "' class='btn btn-primary'>Check it out</a>" +
                            "</div>" +
                        "</div></div><br>"
    
                        
        });
    }
    else{
        bookresult = "<div id='forremove'><h1>No Results</h1></div>"
    }
    
    $('#forremove').append(bookresult)
}
