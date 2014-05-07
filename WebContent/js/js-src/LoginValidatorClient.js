if (typeof weatherapp == "undefined" || !weatherapp) {
	weatherapp = {};
}

weatherapp.LoginValidatorClient = function() {};

/**
 * Public API
 * @param loginForm is a JSON object that contains the ids of the login form. For example:
   loginForm = {
		"userNameField" : "username",
 		"passwordField" : "password",
 		"userNameMessage" : "usernameMessage",
 		"passwordMessage" : "passwordMessage"
   };
 * @returns {Boolean} which determines the operation result.
 */
weatherapp.LoginValidatorClient.prototype.validateLoginForm =  function(loginForm) {
	
	if (this.validateEmptyFields(loginForm) && 
			this.validateUserName(loginForm) && 
				this.validatePassword(loginForm)) {
		
		return true; 
	} 
	
	return false;
};

weatherapp.LoginValidatorClient.prototype.validateEmptyFields =  function(loginForm) {
	var passwordMessageID = loginForm.passwordMessage;
	var userNameMessageID = loginForm.userNameMessage;
	
	var passwordFieldID = loginForm.passwordField;
	var userNameFieldID = loginForm.userNameField;
	
	document.getElementById(passwordMessageID).innerHTML = "";
	document.getElementById(userNameMessageID).innerHTML = "";	
	
	if (! document.getElementById(userNameFieldID).value) {
		document.getElementById(userNameMessageID).innerHTML = "(field is required)";
		
		return false;
	}
	
	if (! document.getElementById(passwordFieldID).value) {
		document.getElementById(passwordMessageID).innerHTML = "(field is required)";

		return false;
	}	
	
	return true;
};

weatherapp.LoginValidatorClient.prototype.validateUserName =  function(loginForm) {

	// The username must be an email ...
	var userNameMessageID = loginForm.userNameMessage;
	var userNameFieldID = loginForm.userNameField;	

    var userNameRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;	
	var userName = document.getElementById(userNameFieldID).value;

    if(! userNameRegex.test(userName)) {
		document.getElementById(userNameMessageID).innerHTML = "(format is invalid)";

    	return false;
    }	
    
	return true;    
};

weatherapp.LoginValidatorClient.prototype.validatePassword =  function(loginForm) {
	
	// The password contains at least one digit, one capital and small character 
	// and at least one special character, and 6 characters or more ...
	var passwordMessageID = loginForm.passwordMessage;
	var passwordFieldID = loginForm.passwordField;
	
	var passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
	var password = document.getElementById(passwordFieldID).value;	
	
	if (! (passwordRegex.test(password) && password.length >= 6)) {
		document.getElementById(passwordMessageID).innerHTML = "(format is invalid)";
		
		return false;
	}
	
	return true;
};