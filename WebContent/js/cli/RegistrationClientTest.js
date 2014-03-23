/**
 * RegistrationClientTest is used for testing the RegistrationClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validation of matched passwords
 * 3. validating that the username is in an email form.
 * 4. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 * 5. The user registration functionality is done correctly.
 */
// Registration Validation Testcase ...
RegValTestcase = TestCase("Registration Validation Testcase");

RegValTestcase.prototype.setUp = function() {
	/*:DOC += <label for="username">Username (Email)  <span id="usernameMessage" class="error"></span></label>
	 <input type="text" id="username" name="username"/>
	 <label for="password1">Password  <span id="passwordMessage1" class="error"></span></label>
	 <input type="password" id="password1" name="password1"/>
	 <label for="password2">Confirm your password</label>
	 <input type="password" id="password2" name="password2"/>*/
	
	this.registrationClient = new weatherapp.RegistrationClient();
	
	this.registrationForm = {
			"userNameField" : "username",
			"passwordField1" : "password1",
			"passwordField2" : "password2",				
			"userNameMessage" : "usernameMessage",
			"passwordMessage1" : "passwordMessage1"
    };	
};

RegValTestcase.prototype.tearDown = function() {
	delete this.registrationClient;
	delete this.registrationForm;
};

RegValTestcase.prototype.testEmptyUserName = function() {
	document.getElementById("username").value = ""; /* setting username to empty */
	document.getElementById("password1").value = "Admin@123";        	   	
	document.getElementById("password2").value = "Admin@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	assertEquals("(field is required)", document.getElementById("usernameMessage").innerHTML);
};

RegValTestcase.prototype.testEmptyPassword = function() {
	document.getElementById("username").value = "someone@someDomain.com"; 
	document.getElementById("password1").value = ""; /* setting password to empty */        	   	
	document.getElementById("password2").value = "";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	assertEquals("(field is required)", document.getElementById("passwordMessage1").innerHTML);		
};

RegValTestcase.prototype.testMatchedPasswords = function() {
	document.getElementById("username").value = "someone@someDomain.com"; 
	document.getElementById("password1").value = "Admin@123"; /* setting passwords unmatched */        	   	
	document.getElementById("password2").value = "Admins@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	assertEquals("(Passwords must be identical)", document.getElementById("passwordMessage1").innerHTML);
};

RegValTestcase.prototype.testUsernameFormat = function() {
	document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	document.getElementById("password1").value = "Admin@123"; 	   	
	document.getElementById("password2").value = "Admin@123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	assertEquals("(format is invalid)", document.getElementById("usernameMessage").innerHTML);	
};

RegValTestcase.prototype.testPasswordFormat = function() {
	document.getElementById("username").value = "someone@someDomain.com";      
	document.getElementById("password1").value = "Admin123"; /* setting password to invalid format */   
	document.getElementById("password2").value = "Admin123";
	
	this.registrationClient.validateRegistrationForm(this.registrationForm);
	
	assertEquals("(format is invalid)", document.getElementById("passwordMessage1").innerHTML);	
};

// User Registration Testcase ...
RegistrationTestcase = AsyncTestCase("Registration Testcase");

RegistrationTestcase.prototype.setUp = function() {
	/*:DOC += <label for="username">Username (Email)  <span id="usernameMessage" class="error"></span></label>
	<input type="text" id="username" name="username"/>
	<label for="password1">Password  <span id="passwordMessage1" class="error"></span></label>
	<input type="password" id="password1" name="password1"/>
	<label for="password2">Confirm your password</label>
	<input type="password" id="password2" name="password2"/>*/
	
	this.registrationClient = new weatherapp.RegistrationClient();
	
	this.registrationForm = {
			"userNameField" : "username",
			"passwordField1" : "password1",
			"passwordField2" : "password2",				
			"userNameMessage" : "usernameMessage",
			"passwordMessage1" : "passwordMessage1"
    };	
};

RegistrationTestcase.prototype.tearDown = function() {
	delete this.registrationClient;
	delete this.registrationForm;
};

RegistrationTestcase.prototype.testRegisterUser = function(queue) {
	var this_local = this;
	
	queue.call('Registering a new user ...', function(callbacks) {
		this_local.userName = "hazems" + new Date().getTime() + "@apache.org";
		
		document.getElementById("username").value = this_local.userName;
		document.getElementById("password1").value = "Admin@123";
		document.getElementById("password2").value = "Admin@123";
	 		  
	    var successCallback = callbacks.add(function(response) {
	    	var resultMessage = response.xmlhttp.responseText;	
	    	assertEquals("User is registered successfully ...", resultMessage);
	    	
	    	jstestdriver.console.log("[Success] User is registered successfully ...");
        });
       
	    var failureCallback = callbacks.addErrback('Unable to register the user');     
	     
	    // call asynchronous API    
	    this_local.registrationClient.registerUser(this_local.registrationForm, successCallback, failureCallback);		  
	});
	
	queue.call('Registering a user whose id is already existing ...', function(callbacks) {
		document.getElementById("username").value = this_local.userName;
		document.getElementById("password1").value = "Admin@123";
		document.getElementById("password2").value = "Admin@123";
	 		  
	    var failureCallback = callbacks.add(function(response) {
	    	var resultMessage = response.xmlhttp.responseText;	
	    	assertEquals("A user with the same username is already registered ...", resultMessage);
	    	
	    	jstestdriver.console.log("[Success] User is not created because the user id is already registered ...");
        });
       
	    var successCallback = callbacks.addErrback('[Error] A user with the same id is created !!!');     
	     
	    // call asynchronous API	    
	    this_local.registrationClient.registerUser(this_local.registrationForm, successCallback, failureCallback);		  
	});			
};