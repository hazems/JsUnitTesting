<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Welcome to the Weather Application</title>
	<script type="text/javascript" src="js/js-src/WeatherClient.js"></script>
	
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/inputForms.css">			
</head>
<body>

<script type="text/javascript">
	function invokeWeatherClient() {
		var weatherClient = new weatherapp.WeatherClient();
		var location = document.getElementById("w").value;	
		
		weatherClient.getWeatherCondition({
										   'location': location,
										   'resultDivID': 'weatherInformation'
										  }, 
										  weatherClient.displayWeatherInformation, 
										  weatherClient.handleWeatherInfoError);		
	}
</script>

<div id="form">
	<div class="welcomePanel">Hello ${username}, <a href="/demo/logoutServlet">logout</a></div><br/>
	<h1>Welcome to the weather application</h1>
	<FORM method="post">
		<label class="label" for="postalCode">Select the Location: </label>
		<select id="w" class="selectField">
		  <option value="1521894">Cairo, Egypt</option>
		  <option value="906057">Stockholm, Sweden</option>	
		  <option value="551801">Vienna, Austria</option>
		  <option value="766273">Madrid, Spain</option>	
		  <option value="615702">Paris, France</option>
		  <option value="2459115">New York, USA</option>
		  <option value="418440">Lima, Peru</option>		  		  
		</select> 		
		
		<input type="button" class="button" onclick="invokeWeatherClient();" 
							 value="Get weather condition"/>
		<br/><br/>
							 
		<div id="weatherInformation" class="weatherPanel">
		</div>
	</FORM>
</div>
</body>
</html>