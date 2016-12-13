<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<table id="customer"></table>

<div id="customer_tool" style="padding:5px;">
	<div style="margin-bottom:5px;">
		<a href="#" class="easyui-linkbutton" iconCls="icon-add-new" plain="true" onclick="customer_tool.add();">添加</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-edit-new" plain="true" onclick="customer_tool.edit();">修改</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-delete-new" plain="true" onclick="customer_tool.remove();">删除</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-reload" plain="true" id="save" onclick="customer_tool.reload();">刷新</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-redo" plain="true" id="redo" onclick="customer_tool.redo();">取消选择</a>		
	</div>
	<div style="padding:0 0 0 7px;color:#333;">
		客户姓名：<input type="text" class="textbox" name="user" style="width:110px">
		创建时间从：<input type="text" name="date_from" class="easyui-datebox" editable="false" style="width:110px">
		到：<input type="text" name="date_to" class="easyui-datebox" editable="false" style="width:110px">
		<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="obj.search();">查询</a>
	</div>
</div>

<form id="customer_add" style="margin:0;padding:5px 0 0 25px;color:#333;">
	<p>客户姓名：<input type="text" name="customername" class="textbox" style="width:200px;"></p>
	<p>电话号码：<input type="text" name="telephonenum" class="textbox" style="width:200px;"></p>
	<p>信息描述：<input class="easyui-textbox" name="describe" data-options="multiline:true" style="height:60px;width:200px;"></input></p>
</form>

<form id="customer_edit" style="margin:0;padding:5px 0 0 25px;color:#333;">
    <input type="hidden" name="id_edit" class="textbox" style="width:200px;">
	<p>客户姓名：<input type="text" name="customername_edit" class="textbox" style="width:200px;"></p>
	<p>电话号码：<input type="text" name="telephonenum_edit" class="textbox" style="width:200px;"></p>
	<p>信息描述：<input class="easyui-textbox" name="describe_edit" data-options="multiline:true" style="height:60px;width:200px;"></input></p>
</form>

<script type="text/javascript" src="js/customer.js"></script>
