$(function() {
	$('#nav').tree({
				url : 'NavServlet',
				type : 'post',
				lines : true,
				onLoadSuccess : function(node, data) {
					// var _this = this;
					if (data) {
						$(data).each(function(index, value) {
									if (this.state == 'closed') {
										// $(_this).tree('expandAll');
									}
								});
					}
				},
				onClick : function(node) {
					if (node.url) {
						if ($('#tabs').tabs('exists', node.text)) {
							$('#tabs').tabs('select', node.text);
						} else {
							$('#tabs').tabs('add', {
										title : node.text,
										iconCls : node.iconCls,
										closable : true,
										href : node.url + '.jsp'
									});
						}
					}
				}
			});
	//客户新增弹屏
	$('#customer_add').dialog({
		width : 350,
		title : '新增客户信息',
		modal : true,
		closed : true,
		iconCls : 'icon-user-add',
		buttons : [{
			text : '提交',
			iconCls : 'icon-add-new',
			handler : function() {
				if ($('#customer_add').form('validate')) {
					$.ajax({
								url : 'CustomerAddServlet',
								type : 'post',
								data : {
									customername : $('input[name="customername"]')
											.val(),
									telephonenum : $('input[name="telephonenum"]')
											.val(),
									describe : $('input[name="describe"]')
											.val()
								},
								beforeSend : function() {
									$.messager.progress({
												text : '正在新增中...'
											});
								},
								success : function(data, response, status) {
									$.messager.progress('close');
									var dataObj = eval("(" + data + ")");
									// alert(dataObj[0]);
									if (dataObj[0] = 1) {
										$.messager.show({
													title : '提示',
													msg : '新增客户信息成功'
												});
										$('#customer_add').dialog('close')
												.form('reset');
										$('#customer').datagrid('reload');
									} else {
										$.messager.alert('新增失败！',
												'未知错误导致失败，请重试！', 'warning');
									}
								}
							});
				}
			}
		}, {
			text : '取消',
			iconCls : 'icon-redo',
			handler : function() {
				$('#customer_add').dialog('close').form('reset');
			}
		}]
	});
	// 欢迎tab页和新的页面
	$('#tabs').tabs({
				fit : true,
				border : false
			});

	$('#callNum').textbox({
				height : '55',
				iconAlign : 'left',
				label : '电话号码:',
				labelPosition : 'top',
				iconWidth : 22,
				icons : [{
							iconCls : 'icon-redo'
						}]
			});
	$('#customerName').textbox({
				height : '55',
				iconAlign : 'left',
				label : '客户姓名:',
				labelPosition : 'top',
				iconWidth : 22,
				icons : [{
							iconCls : 'icon-user'
						}]
			});
	$('#dnID').textbox({
				height : '55',
				iconAlign : 'left',
				label : '用户分机:',
				labelPosition : 'top',
				iconWidth : 22,
				icons : [{
							iconCls : 'icon-place'
						}]
			});
	$('#agentID').textbox({
				height : '55',
				iconAlign : 'left',
				label : '坐席号码:',
				labelPosition : 'top',
				iconWidth : 22,
				icons : [{
							iconCls : 'icon-user'
						}]
			});

	// 按钮js
	// 签入按钮
	$('#login').linkbutton({
				iconCls : 'icon-logining',
				size : 'large',
				iconAlign : 'top'
			});
	// 签出按钮
	$('#logout').linkbutton({
				iconCls : 'icon-logout',
				size : 'large',
				iconAlign : 'top'
			});
	// 示闲
	$('#ready').linkbutton({
				iconCls : 'icon-ready',
				size : 'large',
				iconAlign : 'top'
			});
	// 示忙
	$('#notReady').linkbutton({
				iconCls : 'icon-notReady',
				size : 'large',
				iconAlign : 'top'
			});
	// 应答
	$('#answer').linkbutton({
				iconCls : 'icon-answer',
				size : 'large',
				iconAlign : 'top'
			});
	// 挂断
	$('#release').linkbutton({
				iconCls : 'icon-release',
				size : 'large',
				iconAlign : 'top'
			});
	// 拨打
	$('#makeCall').linkbutton({
				iconCls : 'icon-makeCall',
				size : 'large',
				iconAlign : 'top'
			});
	// 保留
	$('#hold').linkbutton({
				iconCls : 'icon-hold',
				size : 'large',
				iconAlign : 'top'
			});
	// 拾回
	$('#retrieve').linkbutton({
				iconCls : 'icon-retrieve',
				size : 'large',
				iconAlign : 'top'
			});
	// 会议
	$('#conference').linkbutton({
				iconCls : 'icon-conference',
				size : 'large',
				iconAlign : 'top'
			});
	// 转接
	$('#transfer').linkbutton({
				iconCls : 'icon-transfer',
				size : 'large',
				iconAlign : 'top'
			});
	// 完成
	$('#complete').linkbutton({
				iconCls : 'icon-complete',
				size : 'large',
				iconAlign : 'top'
			});

	// 请求事件事件

	// 页面加载事件
	window.onload = function() {
		initStatus();
		// 全屏代码
		/*
		 * var Request = new Array();//保存参数 var s =
		 * location.search.substring(1); if (s && s!=""){ var list =
		 * s.split("&"); for (var i=0; i < list.length; i++){ var pair =
		 * list[i].split("="); if (pair[0] && pair[0] !=""){
		 * Request[unescape(pair[0])] = unescape(pair[1]); } } } var
		 * fullscreen=Request["fullscreen"]; if(fullscreen!="yes"){ var file
		 * =self.location; var a =
		 * window.open("about:blank","","fullscreen=yes"); self.opener=null;
		 * self.close(); a.location=file + "?fullscreen=yes"; }
		 */
	};
	window.onkeydown = function() {
		if (event.keyCode == 116) {
			event.keyCode = 0;
			event.cancelBubble = true;
			return false;
		}
	};
	// 禁止右键弹出菜单
	window.oncontextmenu = function() {
		return false;
	};
	// 浏览器关闭事件
	window.onunload = function() {
		agentLogout();
	};
	// 登录按钮事件
	$(function() {
				$('#login').bind('click', function() {
							// 隐藏登录界面，打开软电话界面
							agentLogin();
						});
			});

	// 签出按钮事件
	$(function() {
				$('#logout').bind('click', function() {
							agentLogout();
						});
			});
	// 示闲按钮事件
	$(function() {
				$('#ready').bind('click', function() {
							agentFree();
						});
			});
	// 示忙按钮事件
	$(function() {
				$('#notReady').bind('click', function() {
							agentBusy();
						});
			});
	// 接听按钮事件
	$(function() {
				$('#answer').bind('click', function() {
							agentAnswer();
						});
			});
	// 外拨按钮事件
	$(function() {
				$('#makeCall').bind('click', function() {
							var outnum = $('#callNum').textbox('getValue');
							agentDialing(outnum);
						});
			});
	// 挂机按钮事件
	$(function() {
				$('#release').bind('click', function() {
							agentRelease();
						});
			});
	// 挂起按钮事件
	$(function() {
				$('#hold').bind('click', function() {
							agentHold();
						});
			});
	// 拾回按钮事件
	$(function() {
				$('#retrieve').bind('click', function() {
							agentRetrieve();
						});
			});
	// 会议按钮事件
	$(function() {
				$('#conference').bind('click', function() {
							agentMeeting();
						});
			});
	// 转接按钮事件
	$(function() {
				$('#transfer').bind('click', function() {
							var otherNum = $('#callNum').textbox('getValue');
							agentTransfer(otherNum, currentTelNum);
						});
			});
});

// 软电话方法
function agentLogin() { // 签入
	var dn = $('#dnID').textbox('getValue');
	var username = $('#agentID').textbox('getValue');
	// alert('进入签入方法'+controlbyid+'###'+dn+'###'+username);
	controlbyid.userLogin(dn, username);
}
function agentLogout() { // 签出
	controlbyid.AgentLogout();
}
function agentBusy() { // 示闲
	controlbyid.NotReady();
}

function agentFree() { // 示忙
	controlbyid.Ready();
}

function agentAnswer() { // 接入电话
	// alert("进入接入电话方法");
	controlbyid.Answer();
}

function agentDialing(telNum) { // 外拨电话
	controlbyid.MakeCall(telNum, "");
}

function agentRelease() { // 挂机
	controlbyid.ReleasePhone();
}

function agentHold() { // 挂起
	controlbyid.Hold();
}

function agentRetrieve() { // 拾回
	controlbyid.Retrieve();
}

function agentMeeting(otherDN) { // 会议
	controlbyid.InitiateConference(otherDN, "huiyi");
}
function agentCompleteh() { // 完成
	controlbyid.CompleteConference("");
}
function agentTransfer(otherDN, telnum) { // 转接
	// 该处现在使用单步转接方法
	controlbyid.InitiateTransfer(otherDN, telnum, "", "", "");
}
function agentCompletez() { // 完成
	controlbyid.CompleteTransfer();
}

// 接收事件
var currentTelNum;
function DriveSoftPhoneFlex(msg) {
	// alert("msg++++++" + msg);
	var arr1 = new Array();
	if (msg.toString().indexOf("++||++") >= 0) {
		arr1 = msg.split("++||++");
		if (arr1[0] == "EventRinging") {
			if (arr1[2] == "") {
				telNum = arr1[1];
			} else {
				telNum = arr1[2];
			}
			currentTelNum = telNum;
			$('#callNum').textbox('setValue', telNum);
			$('#customerName').textbox('setValue', "韩洪双");
			// document.getElementById("customerName").value = '用户姓名:'+'韩洪双';
			// 应答按钮变振铃模式
			$('#answer').linkbutton({
						id : 'answer',
						iconCls : 'icon-ringing',
						size : 'large',
						iconAlign : 'top'
					});
			callingStatus();
		}
	} else {
		switch (msg) {
			case "EventAgentLogin" : {
				// alert("登录状态");
				loginStatus();
				break;
			}
			case "EventAgentLogout" : {
				// alert("签出状态");
				logoutStatus();
				break;
			}
			case "EventAbandoned" : {
				// alert("未接电话放弃状态");
				busyStatus();
				break;
			}
			case "EventEstablished" : {
				// alert("接通状态");
				// 振铃模式变回应答模式
				$('#answer').linkbutton({
							id : 'answer',
							iconCls : 'icon-answer',
							size : 'large',
							iconAlign : 'top'
						});
				//在EventEstablished事件后打开客户新增窗口
				$('#customer_add').dialog('open');
				establishedStatus();
				break;
			}
			case "EventDialing" : {
				// alert("外拨状态");
				calloutStatus();
				break;
			}
			case "EventHeld" : {
				// alert("挂起状态");
				holdStatus();
				break;
			}
			case "EventRetrieved" : {
				// alert("拾回状态");
				establishedStatus();
				break;
			}
			case "EventAgentNotReady" : {
				// alert("示忙状态");
				busyStatus();
				break;
			}
			case "EventAgentReady" : {
				// alert("示闲状态");
				freeStatus();
				break;
			}
			case "EventAgentLogout1" : {
				// alert("转接状态");
				break;
			}
			case "EventAgentLogout2" : {
				// alert("会议状态");
				break;
			}
			case "EventReleased" : {
				// alert("挂机状态");
				// 振铃模式变回应答模式
				$('#answer').linkbutton({
							id : 'answer',
							iconCls : 'icon-answer',
							size : 'large',
							iconAlign : 'top'
						});
				releaseStatus();
				break;
			}
			case "EventAgentLogout3" : {
				// alert("完成状态");
				break;
			}
			case "EventAgentLogout4" : {
				// alert("转接成功状态");
				break;
			}
				/*
				 * case "EventAgentLogout":{ //alert("监听状态"); break; } case
				 * "EventAgentLogout":{ //alert("协助状态"); break; } case
				 * "EventAgentLogout":{ //alert("强插状态"); break; } case
				 * "EventAgentLogout":{ //alert("拦截状态"); break; }
				 */
			case "EventError" : {
				$.messager.alert('错误消息', '您的软电话系统有错误，请检查后继续操作！');
				// alert("您的软电话系统有错误，请检查后继续操作！");
				break;
			}

		}
	}
}

// 按钮状态设置
// 页面初始化状态
function initStatus() {
	// 隐藏登录界面,打开软电话界面
	// 设置按钮状态
	$('#login').linkbutton('enable');
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('disable');
}
// 签入状态
function loginStatus() {
	// 隐藏登录界面,打开软电话界面
	$('#callNum').textbox('setValue', '');
	$('#soft_login').css('display', 'none');
	$('#soft_text').css('display', 'block');
	// 设置按钮状态
	$('#login').linkbutton('disable');
	$('#makeCall').linkbutton('enable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('enable');
	$('#notReady').linkbutton('enable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('enable');

}
// 签出状态
function logoutStatus() {
	// alert("进入软电话签出状态方法");
	// 隐藏软电话界面，打开登录界面
	$('#callNum').textbox('setValue', '');
	$('#soft_login').css('display', 'block');
	$('#soft_text').css('display', 'none');
	$('#login').linkbutton('enable');
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('disable');
}
// 来电显示状态
function callingStatus() {
	// alert("进入软电话来电显示状态方法");
	// 设置按钮状态
	$('#login').linkbutton('disable');
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('enable');
	$('#release').linkbutton('enable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('disable');
}
// 示忙状态
function busyStatus() {
	// 设置按钮状态
	$('#makeCall').linkbutton('enable');
	$('#answer').linkbutton('enable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('enable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('enable');
}
// 示闲状态
function freeStatus() {
	// 设置按钮状态
	$('#makeCall').linkbutton('enable');
	$('#answer').linkbutton('enable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('enable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('enable');
}
// 外拨状态
function calloutStatus() {
	// 设置按钮状态
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('enable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('enable');
}
// 电话接通状态
function establishedStatus() {
	// 设置按钮状态
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('enable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('enable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('enable');
	$('#transfer').linkbutton('enable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('disable');
}
// 挂起状态
function holdStatus() {
	// 设置按钮状态
	$('#makeCall').linkbutton('disable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('enable');
	$('#ready').linkbutton('disable');
	$('#notReady').linkbutton('disable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('enable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('disable');
}
//挂机状态
function releaseStatus() {
	//设置按钮状态
	$('#makeCall').linkbutton('enable');
	$('#answer').linkbutton('disable');
	$('#release').linkbutton('disable');
	$('#ready').linkbutton('enable');
	$('#notReady').linkbutton('enable');
	$('#hold').linkbutton('disable');
	$('#retrieve').linkbutton('disable');
	$('#conference').linkbutton('disable');
	$('#transfer').linkbutton('disable');
	$('#complete').linkbutton('disable');
	$('#logout').linkbutton('enable');
}
