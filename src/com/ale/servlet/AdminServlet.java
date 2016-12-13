package com.ale.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ale.entity.Admin;
import com.ale.util.ConvertJSON;
import com.ale.util.DBUtil;

/**
 * Servlet implementation class AdminServlet
 */
@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = -1528944174483974719L;

	/**
     * Default constructor. 
     */
    public AdminServlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response); 
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		
		PrintWriter out = response.getWriter();
		DBUtil db = new DBUtil();
		Admin cus = new Admin();
		String sql = "select top 1 id,name,telnum,inserttime,describe from admin where name = ? and password = ?";
		Object[] parameters = new Object[2];
		parameters[0] = request.getParameter("manager");
		parameters[1] = request.getParameter("password");
		List<Admin> cusList=db.query2(cus, sql, parameters);
		ConvertJSON c = new ConvertJSON();
		String s = "";
		if(cusList.size()>0){
			 s = c.getJSON(cusList);
			 HttpSession session = request.getSession();
			 session.setAttribute("manager",request.getParameter("manager"));
			 
		}	
        out.print(s);
        out.flush();
        out.close();
	}


}
