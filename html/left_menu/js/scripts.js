document.addEventListener("DOMContentLoaded", function() {
	// 创建目录列表
	var toc = document.createElement("ul");
	toc.setAttribute("id", "table-of-content");
	toc.setAttribute("class", "content");
	document.body.insertBefore(toc, document.body.childNodes[0]);
	// 用于计算当前标题层级的栈,先进先出,从左到右每一个元素代表当前标题所在的层级索引，初始为空
	var stack = new Array();
	// 获取所有标题
	var headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
	for (var i = 0; i < headers.length; i++) {
		var header = headers[i];
		// 计算标题级数，为后面计算标号及缩进空格准备
		var level = parseInt(header.tagName.replace('H', ''), 10);
		// 通过两个where循环对栈进行调整,确保stack中标题级数与当前标题级数相同
		while (stack.length < level) {
			stack.push(0);
		}
		while (stack.length > level) {
			stack.pop();
		}
		// 最小一级标题标号步进+1
		stack[stack.length - 1]++;
		// 生成标题标号( 1.1,1.2.. )
		var index = stack.join(".")
		// 生成标题ID
		var id = "title" + index;
		header.setAttribute("id", id);
		// 为标题加上标号,如果不希望显示标号，把下面这行注释就可以了
		//header.textContent = index + " " + header.textContent;
		header.textContent = header.textContent;

		let suojin = "padding-left: " + (20 * level) + "px";
		var li = document.createElement("li");
		li.style.cssText = suojin; // 设置缩进
		toc.appendChild(li);

		var a = document.createElement("a");
		// 为目录项设置链接
		a.setAttribute("href", "#" + id)
		// 目录项文本前面放置缩进空格
		a.innerHTML = new Array(level * 4).join('&nbsp;') + header.textContent;
		a.innerHTML = header.textContent;
		toc.lastChild.appendChild(a);
	}
});