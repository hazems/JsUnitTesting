if (typeof weatherapp == "undefined" || !weatherapp) {
	weatherapp = {};
}

weatherapp.WeatherClient = function() {};
weatherapp.WeatherClient.xmlhttp;
weatherapp.WeatherClient.endpointURL = "";

/**
 * Public API
 * @param weatherForm is a JSON object that contains the weather form information. For example:
    weatherForm = {
		'location': '1521894'
	};
 * @param successCallBack represents the callback that will be called when the operation succeeds.
 * @param failureCallBack represents the callback that will be called when the operation fails.
 * 
 */
weatherapp.WeatherClient.prototype.getWeatherCondition =  function(weatherForm, successCallBack, failureCallBack) {
	
	if (window.XMLHttpRequest) {
		this.xmlhttp = new XMLHttpRequest();
	} else {
		this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var successCallBackLocal = successCallBack;
	var failureCallBackLocal = failureCallBack;	
	var weatherClientLocal = this;
	
	this.xmlhttp.onreadystatechange = function() {
		weatherClientLocal.weatherInformationReady(successCallBackLocal, failureCallBackLocal);
	};
	
	if (typeof this.endpointURL == "undefined") {
		this.endpointURL = "";
	}
	
	this.xmlhttp.open("GET", 
					  this.endpointURL + 
					  "/demo/WeatherProxyServlet?w=" + weatherForm.location + "&preventCache=" + new Date().getTime(), 
					  true);
	
	this.xmlhttp.send();	
};

weatherapp.WeatherClient.prototype.weatherInformationReady =  function(successCallBack, failureCallBack) {	
	if (this.xmlhttp.readyState != 4) { 
		return; 
	}
	
	if (this.xmlhttp.status != 200)  {
		failureCallBack(this.xmlhttp.responseText);
        return;
    }
    
	if (this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200) {
		successCallBack(this.xmlhttp.responseText);
    }
};

weatherapp.WeatherClient.prototype.displayWeatherInformation =  function(result) {
	document.getElementById("weatherInformation").innerHTML = result;
};

weatherapp.WeatherClient.prototype.handleWeatherInfoError =  function(error) {
	alert ("Error: " + error);	
	document.getElementById("weatherInformation").innerHTML = "Error: " + error;	
};