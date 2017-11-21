//给登录绑定事件：
$('#login').on('click',function(){//绑定登录按钮
	$('#modal section').css('display','none');//影藏注册框样式，
	$('#modal aside').css('display','block');//显示登录框
	$('#modal aside').css('background','green');
	$('#content').css('opacity','0.3');//背景透明度
});
$('#loginConfirm').on('click',function(){//绑定确定按钮
	var user = $('#loginIndex').val();//html();text();获取用户名
	var passwd = $('#loginPasswd').val();//获取登录密码的值
	var arr = [],flag=0;
	//获取后台数据
	$.getJSON(bashpath+'/users/findByName?name='+user,function(data){
		if(data.length>0){
			data.forEach(function(item){
				arr.push(item.passwd);
			});
			for(var i=0;i<arr.length;i++){
				if(passwd == arr[i]){
					flag = 1;
				}
			}
			if(flag == 1){
				alert('登录成功！');
				$('#loginBack').trigger('click');
				window.location.href = 'main.html?'+user;//页面之间不用写user=，前端拿值更方便。
			}else{
				alert('密码错误！请重新输入！');
				$('#loginPasswd').val('');
			}
		}else{
			alert('用户名不存在，请先注册！');
			$('#register').trigger('click');
		}
	});
});
$('#loginBack').on('click',function(){
	$('#modal aside').css('display','none');
	$('#content').css('opacity','1');
});
//给注册绑定事件：
$('#register').on('click',function(){
	$('#modal aside').css('display','none');
	$('#modal section').css('display','block');
	$('#modal section').css('background','green');
	$('#content').css('opacity','0.3');
});
$('#registerConfirm').on('click',function(){
	var user = $('#registerIndex').val();
	var passwd = $('#registerPasswd').val();
	var repasswd = $('#registerRePasswd').val();
	var phone = $('#registerPhone').val();
	var email = $('#registerEmail').val();
	if(passwd == repasswd){
		$.getJSON(bashpath+'/users/adds?name='+user+'&passwd='+passwd+'&email='+email+'&phone='+phone,function(){
			alert('注册成功！');
			$('#registerBack').trigger('click');
		});
	}else{
		alert('密码输入前后不一致，请重新输入！');
		$('#registerPasswd').val('');
		$('#registerRePasswd').val('');
	}
	
});
$('#registerBack').on('click',function(){
	$('#modal section').css('display','none');
	$('#content').css('opacity','1');
});