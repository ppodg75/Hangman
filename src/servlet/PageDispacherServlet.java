package servlet;

import static java.util.Optional.ofNullable;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dto.GameDto;
import feign.IGameClientEndpoint;
import feign.IPlayerClientEndpoint;


public class PageDispacherServlet extends HttpServlet {	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public static final String PROCESS_ERROR = "ERROR";
	private static final String OPERATION_SET_PLAYER_NAME = "setPlayerName";
	private static final String OPERATION_START_GAME = "playGame";
	private static final String OPERATION_DISCONNECT = "disconnect";
	private static final String OPERATION_SEND_LETTER = "letter";
	private static final String OPERATION_WORD_UPDATED = "word_updated";
	
	private static final String PAGE_INDEX = "index";
	private static final String PAGE_LIST = "list";
	private static final String PAGE_WORD = "word";
	private static final String PAGE_GUESS = "guess";
	
	private String errorMessage;
	
	private static final String ATTR_NAME_ERROR = "errormsg";
	private static final String ATTR_NAME_PLAYERNAME = "username";
	private static final String ATTR_NAME_GAME = "game";
	
	@Inject
	private IPlayerClientEndpoint playerClientEndpoint;
	
	@Inject
	private IGameClientEndpoint gameClientEndpoint;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("HttpServlet::doPost");
		
		String oper = request.getParameter("operation");
		String data = request.getParameter("data");
		
//		String un = request.getParameter("username");
//		System.out.println(String.format("operation: %s, data: %s, username: %s",oper,data,un));
		
		setErrorMessage(request, "");
		
		String operationResponse = processOperationAndIfOkReturnNextPage(request, oper, data);
		
		System.out.println("HttpServlet::operationResponse = "+operationResponse);
		
		if (!oper.equals(pageJsp(PAGE_INDEX))) { 
    		 updatePageAttributes(request);
		}
		
		if (PROCESS_ERROR.equals(operationResponse)) {
			setErrorMessage(request, errorMessage);
			forwardToPage(currentPageJsp(request), request, response);
		}
		else {
		    forwardToPage(operationResponse, request, response);
		}

	}
	
	private void updatePageAttributes(HttpServletRequest request) {
		System.out.println("HttpServlet::updatePageAttributes");
		String username = request.getParameter("username");
		request.setAttribute(ATTR_NAME_PLAYERNAME, username);
		
        if (username != null) {            
            ofNullable(playerClientEndpoint.getPlayer(username))
              	.ifPresent(p -> { request.setAttribute("player", p); System.out.println("HttpServlet::updatePageAttributes > player set to attribute <<< "+p.getName()); });
            
            if (request.getAttribute("game")==null) { // this attribute could have been set in sendLetter operation
	            ofNullable(gameClientEndpoint.getGame(username))
	          	    .ifPresent(g -> { request.setAttribute("game", g); System.out.println("HttpServlet::updatePageAttributes > game set to attribute <<< ");});
            }            
        }
	}
	
	private void setErrorMessage(HttpServletRequest request, String message) {		
		request.setAttribute(ATTR_NAME_ERROR, message);
	}
	
	private void forwardToPage(String pageNameJsp, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher requestDispatcher = request.getRequestDispatcher(pageNameJsp);
		requestDispatcher.forward(request, response);
	}
	
	private String processOperationAndIfOkReturnNextPage(HttpServletRequest request, String operation, String data) {
		System.out.println("HttpServlet::processOperationAndIfOkReturnNextPage > "+operation);
		if (operation.isEmpty()) {
			errorMessage = "Application error: empty or unknown operation: "+operation;
			return PROCESS_ERROR;
		}		
		return  doOperation(request, operation, data);
	}
	
	private boolean sendToServerPlayGameReturnIfGuess(String playerName, String opponentName) {
		 System.out.println("HttpServlet::sendToServerPlayGameReturnIfGuess > "+playerName+" vs "+opponentName);
	 	 return gameClientEndpoint.createGameReturnTrueIfGuess(playerName, opponentName);
	}
	
	
	private String getPlayerPage(String playerName, String opponentName) {
         if (sendToServerPlayGameReturnIfGuess(playerName, opponentName)) {
           return PAGE_GUESS;
         } else { 
        	 return PAGE_WORD;
         }
	}
	
	private void sendLetter(HttpServletRequest request, String userName, String letter) {
		GameDto game = gameClientEndpoint.sendLetter(userName, letter);
		if (game!=null) {
		  request.setAttribute(ATTR_NAME_GAME, game);
		} 
	}
	
	private String doOperation(HttpServletRequest request, String operation, String data) {		
	   System.out.println("HttpServlet::doOperation > "+operation);
	   String username = request.getParameter("username");
	   
	   if (OPERATION_SET_PLAYER_NAME.equals(operation)) {		   
		   return pageJsp(PAGE_LIST);
	   } else if (OPERATION_DISCONNECT.equals(operation)) {
		   request.setAttribute(ATTR_NAME_PLAYERNAME, null);
		   return pageJsp(PAGE_INDEX);
	   } else if (OPERATION_START_GAME.equals(operation)) {
		   return pageJsp(getPlayerPage(username, data));
	   } else if (OPERATION_SEND_LETTER.equals(operation)) {		   
		   sendLetter(request, username, data);
		   return currentPageJsp(request);
	   } else if (OPERATION_WORD_UPDATED.equals(operation)) {
		   return currentPageJsp(request);
	   } 
	   return PROCESS_ERROR;
	}		
	
//	private  String getErrorMessage() {
//		return errorMessage;
//	}

	private String pageJsp(String pageName) {
		return pageName.concat(".jsp");
	}	
	
	private String currentPageJsp(HttpServletRequest request) {
		return pageJsp(ofNullable(request.getParameter("currentPage")).orElse(""));
	}

}
