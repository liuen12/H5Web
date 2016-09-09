<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<head>
<style type="text/css">
.div1 {
	border: 1px solid black;
}

.div2 {
	width: 320px;
	border: 1px solid blue;
	float: left;
	height: 320px;
}

.div3 {
	border: 1px solid red;
	margin-left: 320px;
	height: 320px;
}

.photoBut {
	width: 100px;
	height: 35px;
}

.videoAncestor {
	margin-top: -41px;
	width: 320px;
	height: 320px;
}

.videoFunny {
	width: 320px;
	height: 320px;
}
</style>
</head>
<body>
	<h2>Hello Myself!</h2>
	<div class="div1">
		<!-- <div class="div">
			
		</div> -->
		<div class="div2">
			<video id="video" class="videoAncestor" autoplay></video>
			<input type="button" class="photoBut" id="snap" value="拍照" />
		</div>
		<div class="div2">
			<canvas id="canvas" width="320" height="320" hidden="true"></canvas>
			<video id="vid" class="videoFunny" hidden="true" onended="showPhotograph();"
				autobuffer="autobuffer" preload="auto"
				src="//az29176.vo.msecnd.net/videocontent/DwarfFlyingSquirrel_GettyRM-516611677_768_ZH-CN.mp4"></video>
		</div>
	</div>
	<script src="js/common/jquery-1.10.2.min.js"></script>
	<script src="js/printscreen.js"></script>
</body>
</html>
