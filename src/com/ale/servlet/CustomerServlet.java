package com.ale.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ale.entity.Customer;
import com.ale.util.ConvertJSON;
import com.ale.util.DBUtil;

/**
 * Servlet implementation class CustomerServlet
 */
@WebServlet("/CustomerServlet")
public class CustomerServlet extends HttpServlet {

	private static final long serialVersionUID = -1528944174483974719L;

	/**
     * Default constructor. 
     */
    public CustomerServlet() {
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
		    int id = 0;
		    if(request.getParameter("id")!=null){
		    	id = Integer.parseInt(request.getParameter("id"));
		    }
		    int pageSize = 1 ;
		    if(request.getParameter("page")!=null){
		    	pageSize = Integer.parseInt(request.getParameter("page"));
		    }
		    int rows = 1;
		    if(request.getParameter("rows")!=null){
		    	rows = Integer.parseInt(request.getParameter("rows"));
		    }
            PrintWriter out = response.getWriter();
//	        System.out.println("pageSize: " + pageSize);
//	        System.out.println("rows: " + rows);
	        DBUtil db = new DBUtil();
	        ArrayList<Customer> data = db.getAllCustomerDataGrid(pageSize, rows,id);
	        int totalnum = db.getCountCustomer();
//	        String json = EasyUIUtil.stringToJSON(total, data);
	        ConvertJSON c = new ConvertJSON();
	        String json = c.getJSON(totalnum,data);
	        System.out.println(json);
	        out.write(json);
	        out.flush();
	        out.close();
	}


}
