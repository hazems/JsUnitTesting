/**
 * WeatherClientSpec is used for testing the WeatherClient, it performs unit 
 * testing on the following functionalities:
 * 1. Getting the weather of a valid location.
 * 2. Getting the weather for an invalid location (The system should display an error message for this case). 
 */
describe("WeatherClientSpec", function() {
    var originalTimeout;	
    var weatherClient;
  
    beforeEach(function() {
	    // Change the original default timeout interval
	    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	      
	    // Create the WeatherClient object ...	
	    weatherClient = new weatherapp.WeatherClient();  
    });

    describe("when getting the weather information", function() {	   
	    it("should be able to get the weather of a valid location (Cairo)", function(done) {	 		
	 		var successCallBack = function(response) {
	 			console.log("Getting the weather of a valid location (Cairo) succeeded");
	 			
	 			expect(response).not.toEqual("");
	 			done();
	 		};
	 		
	 		var failureCallBack = function(error) {
	 			console.log("failed");
	 			
	 			expect("Operation").toBe("passing"); /* fail test */
	 			done();
	 		};

	 		weatherClient.getWeatherCondition({
				   							  'location': '1521894'
				  						      }, 
				  						      successCallBack, 
				  						      failureCallBack);	 		
		});	   
		
		it("should fail when getting the weather information of an invalid location", function(done) {	 		
	 		var successCallBack = function() {
	 			console.log("Getting the weather information of an invalid location succeeded");
	 			
	 			expect("Operation").toBe("passing"); /* fail test */
	 			done();	 			
	 		};
	 		
	 		var failureCallBack = function(error) {
	 			console.log("Getting the weather information of an invalid location failed: " + error);
	 			
	 			expect(error).toEqual("777"); //Expect error code "777" for invalid location error
	 			
	 			done();
	 		};

	 		weatherClient.getWeatherCondition({
				   							  'location': 'INVALID_LOCATION'
				  						      },  
				  						      successCallBack, 
				  						      failureCallBack);	
		});			
	});	
   
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });   
});