package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Hashtable;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <code>RegistrationServlet</code> is responsible for registering the users in the database.
 * @author hazems
 *
 */
public class RegistrationServlet extends HttpServlet {
    
	private static final long serialVersionUID = 8462431885847832248L;	 
	public static final String USERS_MAP_APP_ATTR_NAME = "usersMap";	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("In RegistrationServlet ...");
		
		response.setContentType("text/html");
		
		PrintWriter writer = null;
		
		try {
			String userName = request.getParameter("username");
			String password1 = request.getParameter("password1");		
			String password2 = request.getParameter("password2");
			
			performValidations(userName, password1, password2);	
			
			writer = response.getWriter();
			
			registerUser(userName, password1);
			
			writer.print("User is registered successfully ...");
		} catch (Exception exception) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	        response.getWriter().write(exception.getMessage());
	        response.flushBuffer();
		} finally {
			if (writer != null) {
				writer.flush();
				writer.close();
			}
		}
	}

	private void performValidations(String userName, String password1,
			String password2) throws ServletException, Exception {

		// Empty passwords ...
		if (! LoginServlet.validateEmptyFields(userName)) {
			throw new ServletException("(username field is required)");
		}
		
		if (! LoginServlet.validateEmptyFields(password1)) {
			throw new ServletException("(Password1 field is required)");
		}	
		
		// Equal Passwords?		
		if (! password1.equals(password2)) {
			throw new ServletException("(Passwords must be identical)");
		}
		
		// Validating rules of username and password ...
		if (! LoginServlet.validateUserName(userName)) {
			throw new ServletException("(username format is invalid)");			
		}
		
		if (! LoginServlet.validatePassword(password1)) {
			throw new ServletException("(password format is invalid)");			
		}
	}
	
	/**
	 * <code>registerUser</code> is registering the user in the Servlet context for demo purposes ...
	 * In real applications, this should be in a database ...
	 * @param userName
	 * @param password
	 */
	public synchronized void registerUser(String userName, String password) throws ServletException, Exception {
		
		Map<String, String>usersMap = (Map<String, String>) getServletContext().getAttribute(USERS_MAP_APP_ATTR_NAME);
		
		if (usersMap == null) {
			usersMap = new Hashtable<String, String>();
			getServletContext().setAttribute(USERS_MAP_APP_ATTR_NAME, usersMap);
		}
		
		if (usersMap.containsKey(userName)) {		
			throw new ServletException("A user with the same username is already registered ...", null);
		}
		
		usersMap.put(userName, password);
	}
}
