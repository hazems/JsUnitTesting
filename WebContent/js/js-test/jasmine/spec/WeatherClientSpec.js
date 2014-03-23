/**
 * WeatherClientSpec is used for testing the WeatherClient, it performs unit 
 * testing on the following functionalities:
 * 1. Getting the weather of a valid location.
 * 2. Getting the weather for an invalid location (The system should display an error message for this case). 
 */
describe("WeatherClientSpec", function() {
   var weatherClient;
  
   beforeEach(function() {
	    jasmine.getFixtures().set('<div id="weatherInformation" class="weatherPanel"></div>');  	
	   
	    weatherClient = new weatherapp.WeatherClient();  
   });

   describe("when getting the weather information", function() {
		it("should be able to get the weather of a valid location (Cairo)", function() {	 		
	 		var successCallBack = jasmine.createSpy();
	 		var failureCallBack = jasmine.createSpy();	 	

	 		weatherClient.getWeatherCondition({
				   							  'location': '1521894',
				   							  'resultDivID': 'weatherInformation'
				  						      }, 
				  						      successCallBack, 
				  						      failureCallBack);	 		
	 		
	 		waitsFor(function() {
	 	        return successCallBack.callCount > 0;
	 	    }, "getting the weather information is never completed", 10000);
	 	    
	 		runs(function() {
	 	        expect(successCallBack).toHaveBeenCalled();
	 	        expect(failureCallBack).not.toHaveBeenCalled();	 	        
	 	    });
		});
		
		it("should fail when getting the weather information of an invalid location", function() {	 		
	 		var successCallBack = jasmine.createSpy();
	 		var failureCallBack = jasmine.createSpy();	 	

	 		weatherClient.getWeatherCondition({
				   							  'location': 'INVALID_LOCATION',
				   							  'resultDivID': 'weatherInformation'
				  						      }, 
				  						      successCallBack, 
				  						      failureCallBack);	 		
	 		
	 		waitsFor(function() {
	 	        return failureCallBack.callCount > 0;
	 	    }, "getting the weather information is never completed", 10000);
	 	    
	 		runs(function() {
	 	        expect(failureCallBack).toHaveBeenCalled();
	 	        expect(successCallBack).not.toHaveBeenCalled();	 	        
	 	    });
		});	
		
	});	
});