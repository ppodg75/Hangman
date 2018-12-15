package servlet;

import static java.util.Optional.ofNullable;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import control.INextPageResolver;

public class PageDispacherServlet extends HttpServlet {
	
		
	private static final long serialVersionUID = 1L;
	
	@Inject
	private INextPageResolver nextPageResolver; 
	
	private static final String defOperPage = "page";
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String oper = ofNullable(request.getParameter("operation")).orElse(defOperPage);
		String data = ofNullable(request.getParameter("data")).orElse("");
		String UID = ofNullable(request.getParameter("UID")).orElse("");
		request.setAttribute("UID", UID);
		
		String dispachToPage = nextPageResolver.nextPage(request);		

		if (!dispachToPage.isEmpty()) {
		 	    RequestDispatcher requestDispatcher = request.getRequestDispatcher(dispachToPage);
		 	    requestDispatcher.forward(request, response);
		}
	}

}
