$(function() {

	// 登录界面
	$('#login').dialog({
		title : '登录',
		width : 300,
		height : 180,
		modal : true,
		iconCls : 'icon-login',
		buttons : '#btn'
	});

	// 管理员帐号验证    
	$('#manager').validatebox({
		required : true,
		missingMessage : '请输入用户帐号信息',
		invalidMessage : '帐号信息不得为空'
		
	});

	// 管理员密码验证
	$('#password').validatebox({
		required : true,
		validType : 'length[6,30]',
		missingMessage : '请输入用户密码',
		invalidMessage : '用户密码不得为空，并且密码为6-30位'
	});

	// 加载时判断验证
	if (!$('#manager').validatebox('isValid')) {
		$('#manager').focus();
	} else if (!$('#password').validatebox('isValid')) {
		$('#password').focus();
	}

	// 单击登录
	$('#btn a').click(
			function() {
				if (!$('#manager').validatebox('isValid')) {
					$('#manager').focus();
				} else if (!$('#password').validatebox('isValid')) {
					$('#password').focus();
				} else {
					$.ajax({
						url : 'AdminServlet',
						type : 'post',
						data : {
							manager : $('#manager').val(),
							password : $('#password').val()
						},
						beforeSend : function() {
							$.messager.progress({
								text : '正在登录中...'
							});
						},
						success : function(data, response, status) {
							$.messager.progress('close');
							// var dataObj = eval("(" + data + ")");
							// // 输出
							// alert(dataObj[0].id);
							if (data.length > 0) {
								location.href = 'Main.jsp';
							} else {
								$.messager.alert('登录失败！', '用户名或密码错误！',
										'warning', function() {
											$('#password').select();
										});
								
							}
						}

					});
				}
			});
	

});
