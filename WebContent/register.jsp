<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Registration Form</title>
	
	<script type="text/javascript" src="js/js-src/LoginValidatorClient.js"></script>	
	<script type="text/javascript" src="js/js-src/RegistrationClient.js"></script>
	
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/inputForms.css">		
</head>
<body>
	<script type="text/javascript">
		function registerUser() {
			var registrationClient = new weatherapp.RegistrationClient();
			
			var registrationForm = {
				"userNameField" : "username",
				"passwordField1" : "password1",
				"passwordField2" : "password2",				
				"userNameMessage" : "usernameMessage",
				"passwordMessage1" : "passwordMessage1"
			};
			
			if (registrationClient.validateRegistrationForm(registrationForm)) {
				
				registrationClient.registerUser(registrationForm, 
												registrationClient.displaySuccessMessage, 
												registrationClient.handleRegistrationError);
			}
		}
	</script>
	
	<form class="box register" method="post">			
		<fieldset class="boxBody">			
					
			<label for="username">Username (Email)  <span id="usernameMessage" class="error"></span></label>
			<input type="text" id="username" name="username"/>
			
			<label for="password1">Password  <span id="passwordMessage1" class="error"></span></label>
			<input type="password" id="password1" name="password1"/>

			<label for="password2">Confirm your password</label>
			<input type="password" id="password2" name="password2"/>
			
		</fieldset>				
		<div id="footer">
	  		<label><a href="login.jsp">Login</a></label>		
			<input id="btnRegister" class="btnLogin" type="button" value="Register" onclick="registerUser();" />
		</div>			
		
	</form>
</body>
</html>