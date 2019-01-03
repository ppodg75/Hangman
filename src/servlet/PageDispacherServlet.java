package servlet;

import static java.util.Optional.ofNullable;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageDispacherServlet extends HttpServlet {	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public static final String PROCESS_ERROR = "ERROR";
	private static final String OPERATION_SET_PLAYER_NAME = "setPlayerName";
	private static final String OPERATION_PLAY_GAME = "playGame";
	
	private static final String PAGE_INDEX = "index";
	private static final String PAGE_LIST = "list";
	private static final String PAGE_WORD = "word";
	private static final String PAGE_GUESS = "guess";
	
	private String errorMessage;
	
	private static final String ATTR_NAME_ERROR = "errormsg";
	private static final String ATTR_NAME_PLAYERNAME = "username";

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("HttpServlet::doPost");
		
		String oper = request.getParameter("operation");
		String data = request.getParameter("data");
		String un = request.getParameter("username");
		
		System.out.println(String.format("operation: %s, data: %s, username: %s",oper,data,un));
		
		setErrorMessage(request, "");
		
		updatePageAttributes(request);
		
		forwardToPage("list.jsp", request, response);
		
//		String operationResponse = pageDispacherService.processOperationAndIfOkReturnNextPage(oper, data, currentPlayerService);
//		
//		updatePageAttributes(request);
//
//		if (IPageDispacherService.PROCESS_ERROR.equals(operationResponse)) {
//
//            forwardToPage(operationResponse, request, response);
//			
//		} else {
//			setErrorMessage(request, operationResponse); 
//		    forwardToPage(pageDispacherService.currentPageJsp(request), request, response);
//		}
	}
	
	private void updatePageAttributes(HttpServletRequest request) {
		String username = request.getParameter("username");
		request.setAttribute(ATTR_NAME_PLAYERNAME, username);  	   	
	}
	private void setErrorMessage(HttpServletRequest request, String message) {		
		request.setAttribute(ATTR_NAME_ERROR, message);
	}
	
	private void forwardToPage(String pageNameJsp, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher requestDispatcher = request.getRequestDispatcher(pageNameJsp);
		requestDispatcher.forward(request, response);
	}
	
	
	public String processOperationAndIfOkReturnNextPage(String operation, String data) {
		errorMessage = new String("");
		if (operation.isEmpty()) {
			errorMessage = "Application error: empty or unknown operation: "+operation;
			return PROCESS_ERROR;
		}
		
		return  doOperation(operation, data);
	}
	
	private String doOperation(String operation, String data) {		
	   if (OPERATION_SET_PLAYER_NAME.equals(operation)) {		   
		   return pageJsp(PAGE_LIST);
	   }
	   return PROCESS_ERROR;
	}
		
	
	public  String getErrorMessage() {
		return errorMessage;
	}

	private String pageJsp(String pageName) {
		return pageName.concat(".jsp");
	}
	
	
	public String currentPageJsp(HttpServletRequest request) {
		return pageJsp(ofNullable(request.getParameter("currentPage")).orElse(""));
	}

}
