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

    //Execute the submit new asset function
    RegisterNewUser();
    
  }); 

 //Handler for the Login page
 $("#login").click(function(){

    //Execute the submit new asset function
    LoginUser();
    
  }); 


//Handler for the Forgot Password page
$("#save").click(function(){

    //Execute the submit new asset function
    ForgotPassword();
    
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
    //console.log(submitData)
    //console.log(X)
    URL = "http://localhost:4000/users/password/" + submitData.get('username')
    console.log(URL)

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

   
}
