/**
 * RegistrationClientSpec is used for testing the RegistrationClient, it performs unit 
 * testing on the following functionalities:
 * 1. validation of empty username and password.
 * 2. validation of matched passwords
 * 3. validating that the username is in an email form.
 * 4. validating that the password  contains at least one digit, one capital and small character 
 * and at least one special character, and 6 characters or more ...
 * 5. The user registration functionality is done correctly.
 */
describe("RegistrationClientSpec", function() {
   var registrationClient;
   var registrationForm;
   var userName; 
     
   beforeEach(function() {	   
	   	//jasmine.getFixtures().fixturesPath = '/test/spec/javascripts/fixtures/'; 
	    //loadFixtures("registrationFixture.html"); 
	   
	   jasmine.getFixtures().set("<label for=\"username\">Username (Email)  <span id=\"usernameMessage\" class=\"error\"></span></label>" + 
		 "<input type=\"text\" id=\"username\" name=\"username\"/>" + 
		 "<label for=\"password1\">Password  <span id=\"passwordMessage1\" class=\"error\"></span></label>" +
		 "<input type=\"password\" id=\"password1\" name=\"password1\"/>" + 
		 "<label for=\"password2\">Confirm your password</label>" + 
		 "<input type=\"password\" id=\"password2\" name=\"password2\"/>");	   
	   
	    registrationClient = new weatherapp.RegistrationClient();
	   
		registrationForm = {
				"userNameField" : "username",
				"passwordField1" : "password1",
				"passwordField2" : "password2",				
				"userNameMessage" : "usernameMessage",
				"passwordMessage1" : "passwordMessage1"
	    };		
	 });

	describe("when validating empty username and password", function() {
	    it("should be able to display an error message when username is not entered", function() {
	 		document.getElementById("username").value = ""; /* setting username to empty */
	 		document.getElementById("password1").value = "Admin@123";        	   	
	 		document.getElementById("password2").value = "Admin@123";
	 		
	 		registrationClient.validateRegistrationForm(registrationForm);
	 		
	 		expect(document.getElementById("usernameMessage").innerHTML).toEqual("(field is required)");	    	
	    });
	    
		it("should be able to display an error message when password is not entered", function() {
	 		document.getElementById("username").value = "someone@someDomain.com"; 
	 		document.getElementById("password1").value = ""; /* setting password to empty */        	   	
	 		document.getElementById("password2").value = "";
	 		
	 		registrationClient.validateRegistrationForm(registrationForm);
	 		
	 		expect(document.getElementById("passwordMessage1").innerHTML).toEqual("(field is required)");			
		});	    
	});
	
	describe("when validating matched passwords", function() {
	 	it("should be able to display an error message when passwords are not matched", function() {
	 		document.getElementById("username").value = "someone@someDomain.com"; 
	 		document.getElementById("password1").value = "Admin@123"; /* setting passwords unmatched */        	   	
	 		document.getElementById("password2").value = "Admins@123";
	 		
	 		registrationClient.validateRegistrationForm(registrationForm);
	 		
	 		expect(document.getElementById("passwordMessage1").innerHTML).toEqual("(Passwords must be identical)");		 		
	 	});	   
	});	

	describe("when validating username format", function() {
		it("should be able to display an error message when username format is not correct", function() {
	 		document.getElementById("username").value = "someone@someDomain";  /* setting username to invalid format */       
	 		document.getElementById("password1").value = "Admin@123"; 	   	
	 		document.getElementById("password2").value = "Admin@123";
	 		
	 		registrationClient.validateRegistrationForm(registrationForm);
	 		
	 		expect(document.getElementById("usernameMessage").innerHTML).toEqual("(format is invalid)");			
		});	   
	});  

	describe("when validating password format", function() {
	 	it("should be able to display an error message when password format is not correct", function() {
	 		document.getElementById("username").value = "someone@someDomain.com";      
	 		document.getElementById("password1").value = "Admin123"; /* setting password to invalid format */   
	 		document.getElementById("password2").value = "Admin123";
	 		
	 		registrationClient.validateRegistrationForm(registrationForm);
	 		
	 		expect(document.getElementById("passwordMessage1").innerHTML).toEqual("(format is invalid)");	 		
	 	});	   
	}); 
	
	describe("when user registration is requested", function() {
		it("should be able to register a valid user correctly", function(done) {
			userName = "hazems" + new Date().getTime() + "@apache.org";
	 		
			document.getElementById("username").value = userName;
	 		document.getElementById("password1").value = "Admin@123";
	 		document.getElementById("password2").value = "Admin@123";  	 		
	 		
	 		var successCallBack = function() {
	 			console.log("Registration succeeded");
	 			
	 			done();
	 		}; 
	 		
	 		var failureCallBack = function() {
	 			console.log("Registration failed");
	 			
	 			expect("Operation").toBe("passing"); /* fail test */
	 			done(); 			
	 		};
	 		
	 		registrationClient.registerUser(registrationForm, successCallBack, failureCallBack);	 		
		});
		
		it("should fail when a specific user id is already registered", function(done) {	 		
			document.getElementById("username").value = userName;
	 		document.getElementById("password1").value = "Admin@123";
	 		document.getElementById("password2").value = "Admin@123";  	 		
	 		
	 		var successCallBack = function() {
	 			console.log("Registration duplicated succeeded!!!");
	 			
	 			expect("Operation").toBe("passing"); /* fail test */
	 			done(); 	 			
	 		};
	 		
	 		var failureCallBack = function(error) {
	 			console.log("Registration of duplicate user failed");
	 			
	 			expect(error).toEqual("776"); //Expect error code "776" for duplicate user exception.
	 			
	 			done();
	 		};		

	 		registrationClient.registerUser(registrationForm, successCallBack, failureCallBack);			
		});	
		
	});	
});