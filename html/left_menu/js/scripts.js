document.addEventListener("DOMContentLoaded", function() {
  // 创建目录容器
  const toc = document.createElement('nav');
  toc.id = 'table-of-content';
  
  // 创建右侧内容容器
  const mainContent = document.createElement('main');
  mainContent.className = 'content-main';

  // 移动所有现有内容到右侧容器
  while(document.body.firstChild) {
    mainContent.appendChild(document.body.firstChild);
  }

  // 重构页面结构
  document.body.append(toc, mainContent);

  // 生成目录逻辑
  let stack = [];
  const headers = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  headers.forEach(header => {
    const level = parseInt(header.tagName.slice(1));
    
    // 维护层级栈
    while(stack.length < level) stack.push(0);
    while(stack.length > level) stack.pop();
    stack[stack.length-1]++;
    
	
    const index = stack.join('.');
	let dd = `${index}&nbsp;${header.innerHTML}`
    header.id = `heading-${index}`;
    header.innerHTML = `<span style="display: inline-block; min-width: 40px;">${index}</span>${header.innerHTML}`;// 右侧内容显示

    // 创建目录项
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = `#${header.id}`;
    //anchor.innerHTML = `${new Array(level).join('&nbsp;&nbsp;')}${index} ${header.textContent}`;
	anchor.innerHTML = `${new Array(level).join('&nbsp;&nbsp;&nbsp;&nbsp;')}${dd}`;// 左侧内容显示
    
    li.appendChild(anchor);
    toc.appendChild(li);
  });
});