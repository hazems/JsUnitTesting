package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <code>LogoutServlet</code> is responsible for allowing the user to logout from  
 * the weather application ...
 * @author hazems
 *
 */
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 3037031971056516798L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setHeader("Cache-Control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
	
		request.getSession().invalidate();
		response.sendRedirect(request.getContextPath() + "/login.jsp");
	}
	
}
