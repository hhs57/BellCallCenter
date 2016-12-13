package com.ale.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

public class CommUtils {
	/**
	 * 将时间戳转换成字符串
	 * 返回值如：2010-10-06
	 * @param time 要转换的时间戳
	 * @return
	 */
	public static String timestampToString(int time) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//定义将日期格式要换成的格式
		String stringTime = format.format(time);

		return stringTime;

	}
	
	public static String createTimeStamp() {
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS")
				.format(new GregorianCalendar().getTime());
	}
	
	public static String timestampToStringL(long TimeStamp){
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = sdf.format(new Date(TimeStamp*1000L));
		return date;
		
	}
	

	
	
	public static void main(String[] args) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = sdf.format(new Date(1474274211*1000L));
		System.out.println(date);
	}

}
