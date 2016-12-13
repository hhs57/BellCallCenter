package com.ale.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.ale.entity.Customer;


public class DBUtil {
	/* 连接数据库用的参数 */
	private static String driver;
	private static String url;
	private static String user;
	private static String password;

	/* 数据库参数 */
	private static Connection conn = null;
	private static PreparedStatement ps = null;
	private static ResultSet rs = null;

	static {
		Properties prop = new Properties();
		try {
			// 得到属性文件的路径
			InputStream is = DBUtil.class.getClassLoader().getResourceAsStream(
					"db.properties");
			// InputStream is =new FileInputStream(new File("db.properties"));
			prop.load(is);
			driver = prop.getProperty("driver");
			url = prop.getProperty("url");
			user = prop.getProperty("user");
			password = prop.getProperty("password");
			Class.forName(driver);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 得到数据库连接
	 * 
	 * @return
	 */
	public Connection getConnection() {
		try {
			conn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

	/**
	 * 关闭资源
	 * 
	 * @param conn
	 * @param ps
	 * @param rs
	 */
	public void close(Connection conn, PreparedStatement ps, ResultSet rs) {
		if (conn != null) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (ps != null) {
			try {
				ps.close();
				ps = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (rs != null) {
			try {
				rs.close();
				rs = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 普通查询，在封装的时候麻烦
	 * 
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public List query(String sql, Object[] parameters) {
		List list = new ArrayList();
		try {
			conn = getConnection();
			ps = conn.prepareStatement(sql);
			// 传递参数
			if (parameters != null && parameters.length > 0) {
				for (int j = 0; j < parameters.length; j++) {
					ps.setObject(j + 1, parameters[j]);
				}
			}
			rs = ps.executeQuery();
			// 得到有多少列，getMetaData()得到数据源，
			int columnCount = rs.getMetaData().getColumnCount();
			while (rs.next()) {
				// 将获得的数据封装到Object数组中
				Object[] obj = new Object[columnCount];
				for (int i = 0; i < columnCount; i++) {
					obj[i] = rs.getObject(i + 1);
				}
				list.add(obj);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(conn, ps, rs);
		}
		return list;
	}

	/**
	 * 通用查询，适合所有entity，但是表的字段名必须和实体类中的属性名相同
	 * 
	 * @param <T>
	 * @param entity
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public <T extends Object> List<T> query2(T entity, String sql,
			Object... parameters) {
		List<T> list = new ArrayList<T>();
		try {
			Connection conn = getConnection();
			ps = conn.prepareStatement(sql);
			// 传递参数
			if (parameters != null && parameters.length > 0) {
				for (int j = 0; j < parameters.length; j++) {
					ps.setObject(j + 1, parameters[j]);
//					System.out.println(parameters[j]);
				}
			}
			rs = ps.executeQuery();
			// 得到数据源
			ResultSetMetaData rsmd = rs.getMetaData();
			// 得到有多少列
			int columnCount = rsmd.getColumnCount();
			// 得到列名
			String[] columnName = new String[columnCount];
			for (int i = 0; i < columnCount; i++) {
				columnName[i] = rsmd.getColumnName(i + 1);
			}
			// 得到entity的Class对象，
			Class clazz = entity.getClass();
			// 得到所有属性
			Field[] fields = clazz.getDeclaredFields();
			Object obj = null;
			while (rs.next()) {
				obj = clazz.newInstance();
				for (int i = 0; i < columnCount; i++) {
					for (int j = 0; j < fields.length; j++) {
						// 判断表列名是否与属性名相同
						if (columnName[i].equals(fields[j].getName())) {
							fields[j].setAccessible(true);
							fields[j].set(obj, rs.getObject(columnName[i]));
							break;
						}

					}
				}
				list.add((T) obj);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} finally {
			close(conn, ps, rs);
		}
		return list;
	}

	/**
	 * 增删改
	 * 
	 * @param sql
	 * @param parameters
	 * @return
	 */
	public int update(String sql, Object[] parameters) {
//		System.out.println("====="+sql);
		int res = 0;
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			ps = conn.prepareStatement(sql);
			if (parameters != null) {
				for (int i = 0; i < parameters.length; i++) {
					ps.setObject(i+1, parameters[i]);
				}
			}
			res = ps.executeUpdate();
			conn.commit();
			conn.setAutoCommit(true);
			return res;
		} catch (SQLException e) {
			try {
				conn.rollback();
				conn.setAutoCommit(true);
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}

			e.printStackTrace();
			return 0;
		} finally {
			close(conn, ps, rs);
		}

	}
	
	
	public ArrayList<Customer> getAllCustomerDataGrid(int pageSize, int rows,int id) {
        ArrayList<Customer> list = new ArrayList<Customer>();
        //--40是这么计算出来的：10*(5-1)
        String sql = "select top " + rows +" * from customer where id not in(select top "
                      + rows*(pageSize-1)+" id from customer order by id) "; 
        if (id == 0) {
           sql = sql+" "+ "order by id";
		}else {
		   sql = sql+" "+ "and id ="+id + " order by id";
		}
        System.out.println("sql==="+sql); 
        try {
        	conn = getConnection();
        	ps = conn.prepareStatement(sql.toString());
            rs = ps.executeQuery();
            while(rs.next()) {
            	Customer customer = new Customer();
            	customer.setId(rs.getInt("id"));
            	customer.setName(rs.getString("name"));
            	customer.setTelnum(rs.getString("telnum"));
            	customer.setInserttime(rs.getString("inserttime"));
            	customer.setDescribe(rs.getString("describe"));
                list.add(customer);
            }
        } catch (SQLException e) {
            list = null;
            e.printStackTrace();
        } finally {
            if(ps != null) {
                try {
                	ps.close();
                	ps = null;
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
             
            if(rs != null) {
                try {
                    rs.close();
                    rs = null;
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
         
        return list;
    }
	
	public int getCountCustomer() {
        String sql = "select count(1) totalnum from customer";
        int totalnum = 0;
//        System.out.println("sql==="+sql); 
        try {
        	conn = getConnection();
        	ps = conn.prepareStatement(sql.toString());
            rs = ps.executeQuery();
            while(rs.next()) {
            	totalnum = rs.getInt("totalnum");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if(ps != null) {
                try {
                	ps.close();
                	ps = null;
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if(rs != null) {
                try {
                    rs.close();
                    rs = null;
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
         
        return totalnum;
    }
	
	
	public static void main(String[] args) {
		DBUtil db = new DBUtil();
		
		Object[] parameters = new Object[4];
		parameters[0] = "韩洪双11";
//		parameters[1] = "123456";
		parameters[1] = "17710371034";
		parameters[2] = "2016-10-21 14:45:46:367";
		parameters[3] = "asdfasdf";
		String sql = "insert into customer (name,telnum,inserttime,describe) values(?,?,?,?)";
		db.update(sql, parameters);
		

		
//		Customer cus = new Customer();
//		String sql = "select * from customer where name = ?";
//		Object[] parameters = new Object[1];
//		parameters[0] = "hanhongshuang";
//		List<Customer> cusList=db.query2(cus, sql, parameters);
//		for(Customer cus1:cusList){
//			System.out.println("====="+cus1.getInserttime());
//			
//			
//		}
        

	} 
}