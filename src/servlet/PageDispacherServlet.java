package servlet;

import static java.util.Optional.ofNullable;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageDispacherServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	private static final String defOperPage = "page";
       
    public PageDispacherServlet() {
        super();
    }
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String oper = ofNullable(request.getParameter("operation")).orElse(defOperPage);
		String data = ofNullable(request.getParameter("data")).orElse("");
		
		
		
 	    RequestDispatcher requestDispatcher = request.getRequestDispatcher("list.jsp");
 	    requestDispatcher.forward(request, response);
		if (defOperPage.equals(oper)) {		
			String nextPage = ofNullable(request.getParameter("data")).orElse(request.getServletPath()); 
			// String nextPage = ofNullable(request.getParameter("data")).orElse(request.getParameter("currentPage")); 
//			System.out.println("forward to: "+nextPage);
//	 	    RequestDispatcher requestDispatcher = request.getRequestDispatcher("list.jsp");
//	 	    requestDispatcher.forward(request, response);
		}
	}

}
