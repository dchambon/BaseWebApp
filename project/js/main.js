// $(document).ready(function(){
//   getWeather();
// })

function showPicture(){
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
  $("p").html("High five! You're building your first web app!");

  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
}

function getWeather(searchQuery) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery +  "&units=imperial&appid=" + apiKey;

  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("")
  
  $.ajax(url,{success: function(data){
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
  }, error: function(error){
    $(".error-message").text("An error occured")
  }})
}

function searchWeather(){
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to acces the Google API.
    var token = result.credential.accessToken;

    // The signed-in user info
    var user = result.user;

    console.log(user.email);
    
  }).catch(function(error) {
    // Handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;

    // The email fo the user's account used.
    var email = error.email;

    // The firebase.auth.AuthCredential type that was used
    var credential = error.credential;
  });

}

function addMessage(postTitle, postBody){
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref("posts");

  var newPostRef = database.push();
  newPostRef.set(postData, function(error){
    if (error){

    } else {
      window.location.reload();
    }
  });
}

function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle, postBody);
}