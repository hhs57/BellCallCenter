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
 * Servlet implementation class CustomerDeleteServlet
 */
@WebServlet("/CustomerDeleteServlet")
public class CustomerDeleteServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8149969502222586893L;

	/**
     * Default constructor. 
     */
    public CustomerDeleteServlet() {
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
            String ids = request.getParameter("ids");
            System.out.println("ids:"+ids);
	        DBUtil db = new DBUtil();
	        String[] idssStrings = ids.split(",");
	        int abc = 0;
	        for (String ss : idssStrings) {
	        	System.out.println("截取内容："+ss);
				Object[] parameters = new Object[1];
				parameters[0] = ss;
				String sql = "DELETE FROM customer WHERE id IN (?)";
				abc=db.update(sql,parameters);
				System.out.println("abc"+abc);
			}
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
