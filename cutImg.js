var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	cutDiv = document.getElementById("cutDiv"),
	cutResult = document.getElementById("cutResult"),
	image = new Image(),
	mousedown = {},
	cutArea = {},
	dragging = false;

// 按下
function cutStart(x,y) {
	mousedown.x = x;
	mousedown.y = y;

	cutArea.left = mousedown.x;
	cutArea.top = mousedown.y;

	console.log("mousedown.x : " + mousedown.x + " mousedown.y : " + mousedown.x);

	moveCutDiv();
	showCutDiv();

	dragging = true;
}
// 移动
function cutmove(x,y){
	// 移动时计算裁剪区到窗口的距离
	cutArea.left = x<mousedown.x?x:mousedown.x;
	cutArea.top = y<mousedown.y?y:mousedown.y;

	// console.log("cutArea.left: " + cutArea.left + " ; cutArea.top : " + cutArea.top);

	cutArea.width = Math.abs(x-mousedown.x);
	cutArea.height = Math.abs(y-mousedown.y);

	// console.log("cutArea.width : "+cutArea.width + " ; cutArea.height : " +cutArea.height);
	moveCutDiv();
	resizeCutDiv();
}
// 停止
function cutEnd(){
	/*
	context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	img	规定要使用的图像、画布或视频。
	sx	可选。开始剪切的 x 坐标位置。画布上的坐标
	sy	可选。开始剪切的 y 坐标位置。画布上的坐标
	swidth	可选。被剪切图像的宽度。
	sheight	可选。被剪切图像的高度。
	x	在画布上放置图像的 x 坐标位置。
	y	在画布上放置图像的 y 坐标位置。
	width	可选。要使用的图像的宽度。（伸展或缩小图像）
	height	可选。要使用的图像的高度。（伸展或缩小图像）
	*/

	var cvsBox = canvas.getBoundingClientRect();
	var sx = cutArea.left - cvsBox.left,
		sy = cutArea.top - cvsBox.top,
		swidth = cutArea.width,
		sheight = cutArea.height,
		x = 0,
		y = 0,
		width = canvas.width,
		height = canvas.height;

	console.log(sx+" , "+sy+" , "+swidth+" , "+sheight+" , "+x+" , "+y+" , "+width+" , "+height);
	
	try{		
		context.drawImage(canvas,sx,sy,swidth,sheight,x,y,width,height);
		// var imgData = context.getImageData(sx,sy,swidth,sheight);
		image.src = canvas.toDataURL("image/png");
		console.log(image.src);
		cutResult.append(image);
	}catch(e){

	}

	resetCutArea();

	cutDiv.style.width = 0;
	cutDiv.style.height = 0;

	hideCutDiv();

	dragging = false;
}

function moveCutDiv(){
	cutDiv.style.top = cutArea.top+"px";
	cutDiv.style.left = cutArea.left+"px";
}
function resizeCutDiv(){
	cutDiv.style.width = cutArea.width +"px";
	cutDiv.style.height = cutArea.height + "px";
}
function showCutDiv(){
	cutDiv.style.display = "inline";
}

function hideCutDiv(){
	cutDiv.style.display = "none";
}
function resetCutArea(){
	cutArea = {top:0,left:0,width:0,height:0};
}
canvas.onmousedown = function(e){
	var x = e.clientX,
		y = e.clientY;
	cutStart(x,y);

}
window.onmousemove = function(e){
	var x = e.clientX,
		y = e.clientY;

	if(dragging){
		cutmove(x,y);
	}
}
window.onmouseup = function(e){
	cutEnd();
}
image.onload = function(){
	context.drawImage(image,0,0,canvas.width,canvas.height);
}
image.src = "test.png";