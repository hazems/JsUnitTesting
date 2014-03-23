package servlets;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <code>LoginServlet</code> is responsible for allowing the user to login to 
 * the weather application ...
 * @author hazems
 *
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 3282193949240670250L;
	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	private static final String PASSWORD_PATTERN = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})";	
	private static final String USER_NAME = "admin@123.com";
	private static final String USER_PASSWORD = "Admin@123";	

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		String userName = (String) request.getSession().getAttribute("username");
		
		if (userName == null) {
			redirectToLoginPage(request, response);
		} else {
			forwardToWelcomePage(request, response);
		}
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
		String userName = request.getParameter("username");
		String password = request.getParameter("password");
		
		try {
			performValidations(userName, password);		
			
			if (authenticatedUser(userName, password)) {
				request.getSession(true).setAttribute("username", userName);
				forwardToWelcomePage(request, response);
				
				return;
			} else {
				throw new ServletException("invalid credentials");
			}
		} catch (Exception exception) {
			request.setAttribute("errorMessage", exception.getMessage());
			forwardToLoginPage(request, response);			
		}
	}
	
	public static boolean validateEmptyFields(String value) {
		return (value.trim().length() == 0) ? false : true;
	}
	
	public static boolean validateUserName(String userName) {
		 Pattern pattern = Pattern.compile(EMAIL_PATTERN);
		 Matcher matcher = pattern.matcher(userName);
		 
		 return matcher.matches();
	}
	
	public static boolean validatePassword(String password) {
		 Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
		 Matcher matcher = pattern.matcher(password);
		 
		 return matcher.matches();		
	}		
	
	private boolean authenticatedUser(String userName, String password) throws Exception {
		Map<String, String> usersMap = (Map<String, String>) getServletContext().getAttribute(RegistrationServlet.USERS_MAP_APP_ATTR_NAME);
		
		if ((USER_NAME.equals(userName) && USER_PASSWORD.equals(password)) || 
				(usersMap != null && usersMap.get(userName) != null && usersMap.get(userName).equals(password))) {
			
			return true;
		}
		
		return false;
	}	
	
	private void performValidations(String userName, String password) throws ServletException {

		// Empty passwords ...
		if (! validateEmptyFields(userName)) {
			throw new ServletException("(username field is required)");
		}
		
		if (! validateEmptyFields(password)) {
			throw new ServletException("(password field is required)");
		}
		
		// Validating rules of username and password ...
		if (! validateUserName(userName)) {
			throw new ServletException("(username format is invalid)");			
		}
		
		if (! validatePassword(password)) {
			throw new ServletException("(password format is invalid)");			
		}
	}	
	
	private void forwardToLoginPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/login.jsp").forward(request, response);		
	}
	
	private void redirectToLoginPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect(request.getContextPath() + "/login.jsp");		
	}	

	private void forwardToWelcomePage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/protected/welcome.jsp").forward(request, response);		
	}
}
