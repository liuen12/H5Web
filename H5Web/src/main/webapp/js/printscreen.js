// 这段代 主要是获取摄像头的视频流并显示在Video 签中
window
		.addEventListener(
				"DOMContentLoaded",
				function() {
					var canvas = document.getElementById("canvas"), context = canvas
							.getContext("2d"), video = document
							.getElementById("video"), videoObj = {
						"video" : true
					}, errBack = function(error) {
						if (error.PERMISSION_DENIED) {
							alert('提示：用户拒绝了浏览器请求媒体的权限');
						} else if (error.NOT_SUPPORTED_ERROR) {
							alert('提示：对不起，您的浏览器不支持拍照功能，请使用其他浏览器');
						} else if (error.MANDATORY_UNSATISFIED_ERROR) {
							alert('提示：指定的媒体类型未接收到媒体流');
						} else {
							alert('提示：系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试');
						}
					};

					// 拍照
					document.getElementById("snap").onclick = function() {
						$("#vid").show();
						var myVideo = document.getElementById("vid");
						myVideo.play();
						context.drawImage(video, 0, 0, 330, 250);
						// CatchCode();
					}
					// 兼容性,支持，PC端：chrome，Firefox，360;移动端：chrome,Firefox,UC,Safair
					// navigator.getUserMedia这个写法在Opera中好像是navigator.getUserMedianow
					navigator.getUserMedia = navigator.getUserMedia
							|| navigator.webkitGetUserMedia
							|| navigator.mozGetUserMedia
							|| navigator.msGetUserMedia;
					window.URL = window.URL || window.webkitURL
							|| window.mozURL || window.msURL;
					if (navigator.getUserMedia) {
						navigator.getUserMedia(videoObj, successCallback,
								errorCallback);
					} else {
						console
								.log('Native device media streaming (getUserMedia) not supported in this browser.');
					}

				}, false);

// 成功回调
function successCallback(stream) {
	if (video.mozSrcObject != undefined) {
		video.mozSrcObject = stream;
	} else {
		video.src = window.webkitURL.createObjectURL(stream);
		// video.src = (window.URL && window.URL.creatObjectURL(stream)) ||
		// stream;
	}
	video.play();
}
// 失败回调
function errorCallback(error) {
	if (error.code == undefined) {
		alert("未发现摄像头！");
	}
	console.error('An error occurred:[CODE:' + error.code + ']');
}
// video 播放完
function showPhotograph() {
	$("#canvas").toggle();
	$("#vid").toggle();
}
// 图片最大张数
var max = 3;
var start = 1;
// 上传服务器
function CatchCode() {
	if (start > max) {
		alert("图片最多上传" + max + "张！");
		return;
	}
	// 获取浏览器页面的画布对象
	var canvans = document.getElementById("canvas");
	// 以下开始编 数据
	var imgData = canvans.toDataURL();
	// 将图像转换为base64数据
	var base64Data = imgData.substr(22);
	// 在前端截取22位之后的字符串作为图像数据

	// 开始异步上
	$.post("base64ImgUpload", {
		"img" : base64Data,
		"folderName" : "img/QAImg"
	}, function(data, status) {
		if (status == "success") {
			if (data.success == true) {
				$("#imgUrl" + start).val(data.imgUrl);
				alert("拍照保存成功！");
			} else {
				alert("拍照保存失败！");
			}
			start++;
		} else {
			alert("拍照保存失败！");
		}
	}, "JSON");
}