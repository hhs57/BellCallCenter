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

import com.ale.entity.Nav;
import com.ale.util.ConvertJSON;
import com.ale.util.DBUtil;

/**
 * Servlet implementation class NavServlet
 */
@WebServlet("/NavServlet")
public class NavServlet extends HttpServlet {

	private static final long serialVersionUID = 8686988690355291444L;

	/**
	 * Default constructor.
	 */
	public NavServlet() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");

		PrintWriter out = response.getWriter();
		DBUtil db = new DBUtil();
		Nav nav = new Nav();
		Object[] parameters = new Object[1];
		String sql = "";
		List<Nav> navList = null;
		String nid = request.getParameter("id") == null ? "0" : request
				.getParameter("id").trim();
		sql = "SELECT id,text,state,iconCls,url FROM nav WHERE nid=?";
		parameters[0] = nid;
		navList = db.query2(nav, sql, parameters);
		ConvertJSON c = new ConvertJSON();
		String s = "";
		if (navList.size() > 0) {
			s = c.getJSON(navList);
			HttpSession session = request.getSession();
			session.setAttribute("manager", request.getParameter("manager"));

		}
		out.print(s);
		out.flush();
		out.close();
	}

	
}
