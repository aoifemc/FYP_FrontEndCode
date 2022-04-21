document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        // console.log("This works");
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");

    });

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        // console.log("Test run")
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");


    });

    

});
 //Handler for the new user continue button
 $("#continue").click(function(){

    //Execute the RegisterNewUser function
    RegisterNewUser();
    
  }); 

 //Handler for the Login page
 $("#login").click(function(){

    //Execute the LoginUser function
    LoginUser();
    
    
  }); 


//Handler for the button on the Users page to retrieve all users
$("#getusers").click(function(){

    //Execute the ForgotPassword function
    //ForgotPassword();
    GetAllUsers();
    
  }); 

//Handler for the Forgot Password page
 $("#save").click(function(){

    //Execute the GetAllUsers function
    ForgotPassword();
    //GetAllUsers();
    
  }); 


  



function RegisterNewUser(){

    //Create a form data object
    submitData = new FormData();
    var X = $("form").serializeArray()
  
    //Get form variables and append them to the form data object
    submitData.append('firstName', $('#firstName').val());
    submitData.append('lastName', $('#lastName').val());
    submitData.append('username', $('#username').val());
    submitData.append('password', $("#password").val());
    submitData.append('confirm', $("#confirm").val());
    //console.log(submitData)
    //console.log(X)

    if (
        submitData.get('password')== submitData.get('confirm')
    ){
        console.log('passwords match')
        //Post the form data to the endpoint, note the need to set the content type header
            alert("Posted")
            $.ajax({
            url: 'http://localhost:4000/users/register',
            //data: JSON.stringify(Input),
            data: JSON.stringify(Object.fromEntries(submitData)),
            // data: submitData.get('username') && submitData.get('password')
            cache: false,
            //enctype: 'application/x-www-form-urlencoded',
            contentType: 'application/json',
            processData: false,
            type: 'POST',
            success: function(data){
                var message = data;
                alert(message)
  
        }
    })
    } else {
        console.log('passwords do not match')
        alert("Passwords do not match")
    }

    // testing hard code to post createNewUser
    // Input = {
    //     "firstName": "test2",
    //     "lastName": "test2",
    //     "username": "test2",
    //     "password": "testing"
    // }
    
  
}
function LoginUser(){

    //Create a form data object
    submitData = new FormData();

  
    //Get form variables and append them to the form data object
    submitData.append('username', $('#UserName').val());
    submitData.append('password', $("#Password").val());
    //console.log(submitData)
    //console.log(X)

    if(FormData.username != "" && FormData.password != "")
    {
            $.ajax({
            url: 'http://localhost:4000/users/authenticate',
            data: JSON.stringify(Object.fromEntries(submitData)),
            // data: submitData.get('username') && submitData.get('password')
            cache: false,
            //enctype: 'application/x-www-form-urlencoded',
            contentType: 'application/json',
            processData: false,
            type: 'POST',
            success: function(data){
                alert("Successfully Logged In")
                document.location.href="getStarted.html"

            }
                
  
        
    })   
} else {
    
        alert("Please enter your credentials")
    }

}

function RegisterUserDetails(){

    //Create a form data object
    submitData = new FormData();
    var X = $("form").serializeArray()
  
    //Get form variables and append them to the form data object
    submitData.append('Name', $('#name').val());
    submitData.append('User', $('#uName').val());
    submitData.append('Feelings', $('#feelings').val());
    submitData.append('Year', $("#year").val());
    //console.log(submitData)
    //console.log(X)

        console.log('passwords match')
        //Post the form data to the endpoint, note the need to set the content type header
            alert("Posted")
            $.ajax({
            url: 'http://localhost:4000/users/register',
            //data: JSON.stringify(Input),
            data: JSON.stringify(Object.fromEntries(submitData)),
            // data: submitData.get('username') && submitData.get('password')
            cache: false,
            //enctype: 'application/x-www-form-urlencoded',
            contentType: 'application/json',
            processData: false,
            type: 'POST',
            success: function(data){
                var message = data;
                alert(message)
                document.location.href="index2.html"
  
        }
    })
    
  
}

function ForgotPassword(){

    //Create a form data object
    submitData = new FormData();

  
    //Get form variables and append them to the form data object
    submitData.append('username', $('#UserName').val());
    submitData.append('password', $("#NewPassword").val());
    submitData.append('confirmNewPassword', $("#ConfirmNewPassword").val());
    //console.log(submitData)
    //console.log(X)
    URL = "http://localhost:4000/users/password/" + submitData.get('username')
    console.log(URL)

    if (
        submitData.get('password')== submitData.get('confirmNewPassword')
    ){
            $.ajax({
            url: URL,
            data: JSON.stringify(Object.fromEntries(submitData)),
            // data: submitData.get('username') && submitData.get('password')
            cache: false,
            //enctype: 'application/x-www-form-urlencoded',
            contentType: 'application/json',
            processData: false,
            type: 'PUT',
            success: function(data){
                document.location.href="index2.html"
                alert("Password Changed Successfully")
                

            }
                
  
        
    })
} else {
    console.log('passwords must match')
    alert("Passwords must match to continue")
}

   
}

function GetAllUsers(){

    URL = "http://localhost:4000/users/"
    var items = []
    console.log("Hello")
            $.getJSON(URL, function( data){ 
                $.each(data, function(key, val){
                    items.push("User ID: " + val["id"]+ "<br />");
                    items.push("<br />");
                    items.push("Name: " + val["firstName"]+ " " + val["lastName"] + "<br />");
                    items.push("Username: " + val["username"] + "<br />");
                    items.push("<br />");
                    items.push('<button style="color: rgb(59, 201, 135);" type="button" id= "subNewForm" class="btn btn-danger" value= "' + val.username + '" onclick="deleteUser(this)">Delete</button> <br/><br/>');
                    items.push("<br />");
    

                })
                $('#UsersList').empty();

    //Append the contents of the items array to the ImageList Div

    $( "<ul/>",{
      "class": "my-new-list",
      html: items.join( "")
    }).appendTo( "#UsersList");
    });
}
    
function deleteUser(id){
    id = id.value;
    console.log(id);
    $.ajax({
  
      type: "DELETE",
  
      url: "http://localhost:4000/users/" + id,
  
    }).done(function( msg ) {
      // On success, update the UsersList
      alert("User Has Been deleted")
      GetAllUsers();
    });
  }
            
    

