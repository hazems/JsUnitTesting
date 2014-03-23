if (typeof weatherapp == "undefined" || !weatherapp) {
	weatherapp = {};
}

weatherapp.RegistrationClient = function() {};
weatherapp.RegistrationClient.xmlhttp;
weatherapp.RegistrationClient.endpointURL = "";

// Public API
weatherapp.RegistrationClient.prototype.validateRegistrationForm =  function(registrationForm) {	
	var userNameMessage = registrationForm.userNameMessage;	
	var passwordMessage1 = registrationForm.passwordMessage1;
	
	var userNameField = registrationForm.userNameField;	
	var passwordField1 = registrationForm.passwordField1;
	var passwordField2 = registrationForm.passwordField2;	
	
	var password1 = document.getElementById(passwordField1).value;
	var password2 = document.getElementById(passwordField2).value;
	
	// Empty messages ...
	document.getElementById(userNameMessage).innerHTML = "";	
	document.getElementById(passwordMessage1).innerHTML = "";	
	
	// create the loginClient object in order to validate fields ...
	var loginClient = new weatherapp.LoginClient();
	
	var loginForm = {};
	
	loginForm.userNameField = userNameField;
	loginForm.userNameMessage = userNameMessage;
	loginForm.passwordField = passwordField1;
	loginForm.passwordMessage = passwordMessage1;		
	
	// validate empty username and password fields.
	if (! loginClient.validateEmptyFields(loginForm)) {
		return false;
	}	
	
	// validate that password fields have the same value ...
	if (password1 != password2) {
		document.getElementById(passwordMessage1).innerHTML = "(Passwords must be identical)";
		
		return false;
	}
	
	// check if the username is correct ...	
	if (! loginClient.validateUserName(loginForm) ) {
		document.getElementById(userNameMessage).innerHTML = "(format is invalid)";
		
		return false;
	}
	
	// check if the password is correct ...
	if (! loginClient.validatePassword(loginForm) ) {
		document.getElementById(passwordMessage1).innerHTML = "(format is invalid)";
		
		return false;
	}	
	
	return true;		
};

// Public API
weatherapp.RegistrationClient.prototype.registerUser =  function(registrationForm, successCallBack, failureCallBack) {
	var userNameField = registrationForm.userNameField;	
	var passwordField1 = registrationForm.passwordField1;
	var passwordField2 = registrationForm.passwordField2;	
	
	var userName = document.getElementById(userNameField).value;		
	var password1 = document.getElementById(passwordField1).value;
	var password2 = document.getElementById(passwordField2).value;
	
	if (window.XMLHttpRequest) {
		this.xmlhttp = new XMLHttpRequest();
	} else {
		this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var successCallBackLocal = successCallBack;
	var failureCallBackLocal = failureCallBack;	
	var registrationClientLocal = this;
	
	this.xmlhttp.onreadystatechange = function() {
		registrationClientLocal.registrationReady(successCallBackLocal, failureCallBackLocal);
	};
	
	if (typeof this.endpointURL == "undefined") {
		this.endpointURL = "";
	}
	
	this.xmlhttp.open("POST", 
					  this.endpointURL + 
					  "/demo/RegistrationServlet", 
					  true);
	
	this.xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	
	this.xmlhttp.send(userNameField + "=" + userName + "&" +
					  passwordField1 + "=" + password1 + "&" +
					  passwordField2 + "=" + password2);	
};

weatherapp.RegistrationClient.prototype.registrationReady =  function(successCallBack, failureCallBack) {	
	if (this.xmlhttp.readyState != 4) { 
		return; 
	}
	
	if (this.xmlhttp.status != 200)  {
		failureCallBack(this);
        return;
    }
    
	if (this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200) {
		successCallBack(this);
    }
};

weatherapp.RegistrationClient.prototype.displaySuccessMessage =  function(registrationClient) {
	alert("User registration went successfully ...");
};

weatherapp.RegistrationClient.prototype.handleRegistrationError =  function(registrationClient) {
	alert(registrationClient.xmlhttp.responseText);
};