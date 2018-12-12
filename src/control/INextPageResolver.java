package control;

import javax.servlet.http.HttpServletRequest;

public interface INextPageResolver {
	
	String nextPage(HttpServletRequest request);

}
