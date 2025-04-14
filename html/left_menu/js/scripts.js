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
    const headerText = header.innerHTML;
    header.id = `heading-${index}`;
    
    // 创建带编号的标题内容
    const numberSpan = document.createElement('span');
    numberSpan.textContent = index;
    numberSpan.style.minWidth = '40px';
    numberSpan.style.display = 'inline-block';
    
    header.innerHTML = '';
    header.appendChild(numberSpan);
    header.appendChild(document.createTextNode(' ' + headerText));
    
    // 创建目录项
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = `#${header.id}`;
    
    // 创建目录中的编号和文本
    const tocNumber = document.createElement('span');
    tocNumber.textContent = index;
    tocNumber.style.marginRight = '4px';
    
    const tocText = document.createElement('span');
    tocText.textContent = headerText;
    
    anchor.appendChild(tocNumber);
    anchor.appendChild(tocText);
    li.appendChild(anchor);
    toc.appendChild(li);
    
    // 根据层级设置缩进
    anchor.style.paddingLeft = `${(level - 1) * 20}px`;
  });
});