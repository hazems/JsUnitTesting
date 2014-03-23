package servlets;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * SecurityFilter is responsible for protecting the application pages from 
 * malicious access.
 * @author hazems
 */
public class SecurityFilter implements Filter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest sRequest = (HttpServletRequest) request;
		HttpServletResponse sResponse = (HttpServletResponse) response;
		
		String userName = (String) sRequest.getSession().getAttribute("username");
		
		if (userName == null) {
			sResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		} else {
			
			// pass the request along the filter chain
			chain.doFilter(request, response);
		}

	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}
}
