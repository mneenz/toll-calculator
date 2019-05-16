/* Toggle between adding and removing the "responsive" class to the menu when the user clicks on the icon */
function menuFunction() {
  var menu = document.getElementById("menu"); //Set the variable 'menu' to the #menu element
  var header = document.getElementById("header"); //Set the variable 'header' to the #menu element
  if (menu.className === "menu" && header.className === "header" )  { //if the 'menu' class is 'menu' and 'header' class is 'header' (we want to change them simultaneously)
    menu.className += " responsive"; //Change the class to 'responsive'
    header.className += " responsive";
  } else {
    menu.className = "menu"; //Change the class to 'menu'
    header.className = "header";  //Change the class to 'header'
  }
}//Close menuFunction


//Search function
function searchFunction() {
  var input, filter, ul, li, a, i; //create variable
  input = document.getElementById("searchInput"); //input variable = #searchInput
  filter = input.value.toUpperCase(); //filter variable = turn #input value into uppercase
  contentSection = document.getElementById("content"); // variable contentSection = #content
  article = contentSection.getElementsByTagName("article"); // variable article = #content article
  for (i = 0; i < article.length; i++) { //For loop the article variable (go through the index of the elements in the array)
    h2 = article[i].getElementsByTagName("h2")[0]; //h2 = the relevant 'i' with the h2 tag
    if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) { //if the h2 tag (in uppercase) has an index (has the search term). -1 means that it doesn't
      article[i].classList.add('show'); //Display the relevant article
      article[i].classList.remove('hide'); //Hide the relevant article
      article[i].classList.remove('moveUp'); //Hide the relevant article
    } else {
      article[i].classList.add('hide'); //Display the relevant article
      article[i].classList.remove('show'); //Hide the relevant article
      article[i].classList.remove('moveUp'); //Hide the relevant article
    }
  }//Close for loop

  //No more results text
  var shown = document.getElementById("content").querySelectorAll(".show"); //Set the variable 'shown' to the .show articles within 'content'
  var noResults = document.getElementById("no-results"); //Set the variable noResults to #no-results

  if (shown.length == 0 ) { //If there are 0 shown articles
    noResults.style.display = "block"; //Show the no results text
  } else {
    noResults.style.display = "none"; //Hide the no results text
  }
}//Close searchFunction

//REQUEST JS

var articlesRequest = new XMLHttpRequest(); //Create articlesRequestRequest object
var articlesUrl = "https://s3.eu-west-2.amazonaws.com/enfo-test-resources/api/articles.json?action=query&format=json&orderby=key&origin=*"; //Get JSON articles

articlesRequest.onreadystatechange = function() { //Function that executes on status change for the "xhttp" object
  if (this.readyState == 4 && this.status == 200) { //If readyState is 4 (DONE) & status property is 200 (OK) https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    var articlesArray = JSON.parse(this.responseText); // make articlesArray equal to responseText (text received from server response)
    articlesFunction(articlesArray.articles); //Calling function with articlesArray.articles as the argument
  }
};

articlesRequest.open("GET", articlesUrl, true); //Initialize the request at the same time as the response is the received from ".send" (asynchronously)
articlesRequest.send(); //Send xhttp request

function articlesFunction(arr) { //Create articlesFunction

  //Sort the articles based on the 'publishedAt' field
  function compare(a,b) {
    if (a.publishedAt < b.publishedAt)
      return -1;
    if (a.publishedAt > b.publishedAt)
      return 1;
    return 0;
  }

  arr.sort(compare); //Run sort method on compare function

  // var myObj = JSON.parse('{"date_created":"20171025T08:12:07Z"}'),
  //     myDate = new Date(1000*myObj.date_created);
  //
  // console.log(myDate.toString());
  // console.log(myDate.toLocaleString());
  // console.log(myDate.toUTCString());
    var noResults = '<div id="no-results"><h1>No Search Results</h1><p>Try another search</p></div>'; //Define the noResults variable so that we have something to show when there are no search results defined
    var res = []; //Create array and set to variable res
    var out = ""; //Create out variable and set to string
    var i; //Create i variable
    for(i = 0; i < arr.length; i++) { //For loop the array object (go through the index of the elements in the array)

      //Reformat the date value
      var publishedDate = arr[i].publishedAt; //Get the date value for the relevant object
      var hyphenDate = publishedDate.replace(/(\d{4})(\d{2})(\d+)/, '$1-$2-$3'); //Add hyphens to string so that it looks more like the JavaScript Date format
      var shortenedDate = hyphenDate.substring(0, 10); //Shorten string to 10 chracters so that it looks more like the JavaScript Date format
      var dateString = new Date(shortenedDate).toUTCString(); //Create the variable dateString and set it to the date
      var dateString = dateString.split(' ').slice(0, 4).join(' '); //Remove the time from the date

      /*Fix the missing value in the author key*/
      if (arr[i].author == null) { //If the author value is equal to null
        var author = "Bamse"; //Bamse wrote this article :) :) (set variable author to Bamse)
      } else {
        var author = arr[i].author; //Set variable author to the author value
      }


      out += '<article id="article" class="moveUp article-'+ i +'">' +
        '<a href="'+ arr[i].url +'" title="' + arr[i].title + '" class="img-link"><img src="' + arr[i].urlToImage + '" alt="' + arr[i].title + '" width="100%" height="auto"></a>' +
        '<div class="info">' +
          '<p class="date-author">Published ' + dateString + ' by ' + author + '</p>' +
          '<h2><a href="'+ arr[i].url +'" title="' + arr[i].title + '">' + arr[i].title + '</a></h2>' +
          '<p class="description"><a href="'+ arr[i].url +'" title="' + arr[i].title + '">' + arr[i].description + '</a></p>' +
          '<p><a href="'+ arr[i].url +'" title="' + arr[i].title + '" class="btn"> Read More</a></p>' +
        '</div>' +
      '</article>';
  }

 //Fill the #content tag with the content within the variables 'noResults' & 'out' & weatherWidget
  document.getElementById("content").innerHTML = noResults + out;
}

// Will add the toll fee calculator JS here
