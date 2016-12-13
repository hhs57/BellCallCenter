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

import com.ale.entity.Admin;
import com.ale.entity.Customer;
import com.ale.util.CommUtils;
import com.ale.util.ConvertJSON;
import com.ale.util.DBUtil;

/**
 * Servlet implementation class CustomerEditServlet
 */
@WebServlet("/CustomerEditServlet")
public class CustomerEditServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8149969502222586893L;

	/**
     * Default constructor. 
     */
    public CustomerEditServlet() {
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
            int id = Integer.parseInt(request.getParameter("id"));
            String customername = request.getParameter("customername");
            String telephonenum = request.getParameter("telephonenum");
            String describe = request.getParameter("describe");
            System.out.println("id"+id);
            System.out.println("customername"+customername);
            System.out.println("telephonenum"+telephonenum);
            System.out.println("describe"+describe);
            
	        DBUtil db = new DBUtil();
			Object[] parameters = new Object[5];
			parameters[0] = customername;
			parameters[1] = telephonenum;
			parameters[2] = CommUtils.createTimeStamp();
			parameters[3] = describe;
			parameters[4] = id;
			String sql = "update customer set name = ?,telnum = ?,inserttime = ?,describe = ?  where id = ?";
			int abc=db.update(sql,parameters);
			System.out.println(sql+"&&&"+abc);
			List<String> list = new ArrayList<String>();
			list.add(String.valueOf(abc));
	        ConvertJSON c = new ConvertJSON();
	        String s = c.getJSON(list);
	        System.out.println(s);
	        out.write(s);
	        out.flush();
	        out.close();
	}


}
