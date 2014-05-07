/**
 * LoginValidatorClientSpec is used for testing the LoginValidatorClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validating that the username is in an email form.
 * 3. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 */
describe("LoginValidatorClientSpec", function() {
   var loginValidatorClient;
   var loginForm;
  
   beforeEach(function() {	   
	   //jasmine.getFixtures().fixturesPath = '/test/spec/javascripts/fixtures/'; 	
	   //loadFixtures("loginFixture.html");    
	   jasmine.getFixtures().set("<label for=\"username\">Username  <span id=\"usernameMessage\" class=\"error\"></span></label>" +
		 "<input type=\"text\" id=\"username\" name=\"username\"/>" + 
		 "<label for=\"password\">Password  <span id=\"passwordMessage\" class=\"error\"></span></label>" + 
		 "<input type=\"password\" id=\"password\" name=\"password\"/>");
	   
	   loginValidatorClient = new weatherapp.LoginValidatorClient();
	   
	   loginForm = {
	 			"userNameField" : "username",
	 			"passwordField" : "password",
	 			"userNameMessage" : "usernameMessage",
	 			"passwordMessage" : "passwordMessage"
	   };
	 });

	describe("when validating empty username and password", function() {
	    it("should be able to display an error message when username is not entered", function() {
	 		document.getElementById("username").value = ""; /* setting username to empty */
	 		document.getElementById("password").value = "Admin@123";        	   	
	 		
	 		loginValidatorClient.validateLoginForm(loginForm);
	 		
	 		expect(document.getElementById("usernameMessage").innerHTML).not.toEqual("");
	    });	 
	    
	   it("should be able to display an error message when password is not entered", function() {
	 		document.getElementById("username").value = "someone@yahoo.com";
	 		document.getElementById("password").value = "";   /* setting password to empty */  	   	
	 	
	 		loginValidatorClient.validateLoginForm(loginForm);
	 	
	 		expect(document.getElementById("passwordMessage").innerHTML).not.toEqual("");
	   });		    
	});

	describe("when validating username format", function() {
	   it("should be able to display an error message when username format is not correct", function() {
	 	document.getElementById("username").value = "someone@yahoo"; /* setting username to incorrect format */
	 	document.getElementById("password").value = "Admin@123";        	   	
	 	
	 	loginValidatorClient.validateLoginForm(loginForm);
	 	
	 	expect(document.getElementById("usernameMessage").innerHTML).not.toEqual("");
	   });	   
	});  

	describe("when validating password format", function() {
	 	  it("should be able to display an error message when password format is not correct", function() {
	 		document.getElementById("username").value = "someone@yahoo.com";
	 		document.getElementById("password").value = "admin@123";  /* setting password to incorrect format */       	   	
	 		
	 		loginValidatorClient.validateLoginForm(loginForm);
	 		
	 		expect(document.getElementById("passwordMessage").innerHTML).not.toEqual("");
	 	  });	   
	}); 
});