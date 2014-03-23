<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Login to the Weather Application</title>
	<script type="text/javascript" src="js/js-src/LoginClient.js"></script>
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/inputForms.css">		
</head>
<body>
	<script type="text/javascript">
		function validateLoginForm() {
			var loginClient = new weatherapp.LoginClient();
			
			var loginForm = {
				"userNameField" : "username",
				"passwordField" : "password",
				"userNameMessage" : "usernameMessage",
				"passwordMessage" : "passwordMessage"
			};
			
			return loginClient.validateLoginForm(loginForm);
		}
		
		window.onload = function() {
			var errorMessage = "${errorMessage}";
			
			if (errorMessage != "") {
				alert(errorMessage);
			}
		};
	</script>

	<form class="box login" action="/demo/LoginServlet" method="post">
		<fieldset class="boxBody">		
			<label for="username">Username  <span id="usernameMessage" class="error"></span></label>
			<input type="text" id="username" name="username"/>
			
			<label for="password">Password  <span id="passwordMessage" class="error"></span></label>
			<input type="password" id="password" name="password"/>
		</fieldset>				
		<div id="footer">
	  		<label><a href="register.jsp">Register</a></label>		
			<input id="btnLogin" class="btnLogin" type="submit" value="Login" onclick="return validateLoginForm();"/>			
		</div>				
	</form>
</body>
</html>