$(function () {
	
	$('#customer').datagrid({
		url : 'CustomerServlet',
		type : 'post',
		fit : true,
		fitColumns : true,
		striped : true,
		rownumbers : true,
		border : false,
		pagination : true,
		pageSize : 10,
		pageList : [10, 20, 30, 40, 50],
		pageNumber : 1,
		sortName : 'id',
		sortOrder : 'desc',
		toolbar : '#customer_tool',
		columns : [[
			{
				field : 'id',
				title : '自动编号',
				width : 100,
				checkbox : true
			},
			{
				field : 'name',
				title : '客户姓名',
				width : 50
			},
			{
				field : 'telnum',
				title : '电话号码',
				width : 50
			},
			{
				field : 'inserttime',
				title : '创建日期',
				width : 50
			},
			{
				field : 'describe',
				title : '信息描述',
				width : 300
			}
		]]
	});
	$('#customer_add').dialog({
		width : 350,
		title : '新增客户信息',
		modal : true,
		closed : true,
		iconCls : 'icon-user-add',
		buttons : [{
			text : '提交',
			iconCls : 'icon-add-new',
			handler : function () {
				if ($('#customer_add').form('validate')) {
					$.ajax({
						url : 'CustomerAddServlet',
						type : 'post',
						data : {
							customername : $('input[name="customername"]').val(),
							telephonenum : $('input[name="telephonenum"]').val(),
							describe : $('input[name="describe"]').val()
						},
						beforeSend : function () {
							$.messager.progress({
								text : '正在新增中...'
							});
						},
						success : function (data, response, status) {
							$.messager.progress('close');
							var dataObj = eval("(" + data + ")");
//							alert(dataObj[0]);
							if (dataObj[0] = 1) {
								$.messager.show({
									title : '提示',
									msg : '新增客户信息成功'
								});
								$('#customer_add').dialog('close').form('reset');
								$('#customer').datagrid('reload');
							} else {
								$.messager.alert('新增失败！', '未知错误导致失败，请重试！', 'warning');
							}
						}
					});
				}
			}
		},{
			text : '取消',
			iconCls : 'icon-redo',
			handler : function () {
				$('#customer_add').dialog('close').form('reset');
			}
		}]
	});
	
	$('#customer_edit').dialog({
		width : 350,
		title : '修改管理',
		modal : true,
		closed : true,
		iconCls : 'icon-user-add',
		buttons : [{
			text : '提交',
			iconCls : 'icon-edit-new',
			handler : function () {
				if ($('#customer_edit').form('validate')) {
					$.ajax({
						url : 'CustomerEditServlet',
						type : 'post',
						data : {
							id : $('input[name="id_edit"]').val(),
							customername : $('input[name="customername_edit"]').val(),
							telephonenum : $('input[name="telephonenum_edit"]').val(),
							describe : $('input[name="describe_edit"]').val()
						},
						beforeSend : function () {
							$.messager.progress({
								text : '正在修改中...'
							});
						},
						success : function (data, response, status) {
							$.messager.progress('close');
							var dataObj = eval("(" + data + ")");
							if (dataObj[0] = 1) {
								$.messager.show({
									title : '提示',
									msg : '修改管理成功'
								});
								$('#customer_edit').dialog('close').form('reset');
								$('#customer').datagrid('reload');
							} else {
								$.messager.alert('修改失败！', '未知错误或没有任何修改，请重试！', 'warning');
							}
						}
					});
				}
			}
		},{
			text : '取消',
			iconCls : 'icon-redo',
			handler : function () {
				$('#customer_edit').dialog('close').form('reset');
			}
		}]
	});
	
	customer_tool = {
			reload : function () {
			    $('#customer').datagrid('reload');
		    },
		    redo : function () {
			    $('#customer').datagrid('unselectAll');
		    },
			add : function () {
				$('#customer_add').dialog('open');
				$('input[name="customername"]').focus();
			},
			remove : function () {
				var rows = $('#customer').datagrid('getSelections');
				if (rows.length > 0) {
					$.messager.confirm('确定操作', '您正在要删除所选的记录吗？', function (flag) {
						if (flag) {
							var ids = [];
							for (var i = 0; i < rows.length; i ++) {
								ids.push(rows[i].id);
							}
							//console.log(ids.join(','));
							$.ajax({
								type : 'POST',
								url : 'CustomerDeleteServlet',
								data : {
									ids : ids.join(',')
								},
								beforeSend : function () {
									$('#customer').datagrid('loading');
								},
								success : function (data) {
									if (data) {
										$('#customer').datagrid('loaded');
										$('#customer').datagrid('load');
										$('#customer').datagrid('unselectAll');
										$.messager.show({
											title : '提示',
											msg : data + '客户被删除成功！'
										});
									}
								}
							});
						}
					});
				} else {
					$.messager.alert('提示', '请选择要删除的记录！', 'info');
				}
			},
		    edit : function () {
			    var rows = $('#customer').datagrid('getSelections');
				if (rows.length > 1) {
					$.messager.alert('警告操作！', '编辑记录只能选定一条数据！', 'warning');
				} else if (rows.length == 1) {
					$.ajax({
						url : 'CustomerServlet',
						type : 'post',
						data : {
							id : rows[0].id
						},
						beforeSend : function () {
							$.messager.progress({
								text : '正在获取中...'
							});
						},
						success : function (data, response, status) {
							$.messager.progress('close');
							if (data) {
								var obj=$.parseJSON(data).rows; 
//								alert(obj[0].name);
								$('#customer_edit').form('load', {
									id_edit : obj[0].id,
									customername_edit : obj[0].name,
									telephonenum_edit : obj[0].telnum,
									describe_edit : obj[0].describe
								}).dialog('open');
							} else {
								$.messager.alert('获取失败！', '未知错误导致失败，请重试！', 'warning');
							}
							
						}
					});
				} else if (rows.length == 0) {
					$.messager.alert('警告操作！', '编辑记录至少选定一条数据！', 'warning');
				}
			}
		};
	
	
	
	
	
	
	
	
});