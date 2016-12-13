package com.ale.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ale.entity.Admin;
import com.alibaba.fastjson.JSON;

public class ConvertJSON {

	public ConvertJSON() {
		// TODO Auto-generated constructor stub
	}
	
	public String getJSON(List list){
		
		return JSON.toJSONString(list);
		
	}
	
	public String getJSON(int total,List list){
        Map<String, Object> jsonMap = new HashMap<String, Object>();//定义map  
        jsonMap.put("total", total);//total键 存放总记录数，必须的  
        jsonMap.put("rows", list);//rows键 存放每页记录 list  	
		return JSON.toJSONString(jsonMap);
		
	}
	
	

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		DBUtil db = new DBUtil();
		Admin cus = new Admin();
		String sql = "select top 1 id,name from admin where name = ? ";
		Object[] parameters = new Object[1];
		parameters[0] = "hanhongshuang";
		List<Admin> cusList=db.query2(cus, sql, parameters);
		ConvertJSON c = new ConvertJSON();
		String s = c.getJSON(cusList);
//		System.out.println("====="+s);

	}

}
