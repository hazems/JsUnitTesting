package servlets;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;

/**
 * <code>WeatherProxyServlet</code> is a proxy servlet that wraps Yahoo weather REST service.
 * @author hazems
 *
 */
public class WeatherProxyServlet extends HttpServlet {
	private static final long serialVersionUID = 8732370454506907957L;	
	private static final String INVALID_LOCATION_EXCEPTION_CODE = "777";

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("In WeatherProxyServlet ...");
		
		String WOEID = request.getParameter("w");
		HttpURLConnection connection = null;
		
		response.setContentType("text/html");

		PrintWriter writer = null;
		
		try {
			URL url = new URL("http://weather.yahooapis.com/forecastrss?u=c&w=" + WOEID);
			
			connection = createHTTPConnection(url);
			
			String output = getHTTPOutputResponse(connection);
			
			SyndFeedInput input = new SyndFeedInput();
			SyndFeed feed = input.build(new InputStreamReader(new ByteArrayInputStream(output.getBytes("UTF-8"))));  		
			
		    if (feed.getEntries() != null && feed.getEntries().size() > 0) {
	            SyndEntry entry = ((SyndEntry) feed.getEntries().get(0));
	                        
	            String title = entry.getTitle();
	            String description = entry.getDescription().getValue();
	            
	            if (description.contains("Invalid")) {
	            	throw new ServletException(INVALID_LOCATION_EXCEPTION_CODE); 
	            }
	    		
	    		writer = response.getWriter();	            
	            writer.print(title + "<br/>" + description);
	        }	
		} catch (Exception exception) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        response.getWriter().write(exception.getMessage());
	        response.flushBuffer();			
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
			
			if (writer != null) {
				writer.flush();
	        	writer.close();		
			}
		}
	}
	
	private static HttpURLConnection createHTTPConnection(URL url) throws IOException, ProtocolException {
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setDoOutput(true);
		conn.setDoInput(true);
		conn.setRequestMethod("GET"); 
		conn.setRequestProperty("Accept", "text/html"); 
		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		
		return conn;
	}

	private static String getHTTPOutputResponse(HttpURLConnection conn) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		String httpOutputResponse = ""; 
		String outputLine;
		
		while ((outputLine = br.readLine()) != null) {
			httpOutputResponse += outputLine;
		}
		
		return httpOutputResponse;
	}
}
