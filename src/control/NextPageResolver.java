package control;

import static java.util.Optional.ofNullable;

import javax.enterprise.context.ApplicationScoped;
import javax.servlet.http.HttpServletRequest;

@ApplicationScoped
public class NextPageResolver implements INextPageResolver {
	
	private static final String OPERATION_GOTO_PAGE = "goto_page";
	
	private static final String PAGE_LIST = "list";
	private static final String PAGE_WORD = "word";
	private static final String PAGE_GUESS = "guess";
	
	public String nextPage(HttpServletRequest request) {
		String oper = ofNullable(request.getParameter("operation")).orElse("");
		String data = ofNullable(request.getParameter("data")).orElse("");
		String nextPage = ofNullable(request.getParameter("nextPage")).orElse("");
		String currentPage = ofNullable(request.getParameter("currentPage")).orElse("");
		
		if (OPERATION_GOTO_PAGE.equals(oper) && !data.isEmpty()) {
			return gotoPageName(data);
		} else if (!nextPage.isEmpty()) {
			return gotoPageName(nextPage);
		} else {
			return "";
		}
	}
	
	private String gotoPageName(String pageName) {
		switch(pageName) {
		case PAGE_LIST : return pageJsp(PAGE_LIST); 
		case PAGE_WORD : return pageJsp(PAGE_WORD); 
		case PAGE_GUESS : return pageJsp(PAGE_GUESS);
		}
		return "";
	}
	
	private String pageJsp(String pageName) {
		return pageName.concat(".jsp");
	}

}
