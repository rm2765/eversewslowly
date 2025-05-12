// Improved TOC script: dedupe, toggle, two-column format up to H3
document.addEventListener('DOMContentLoaded', () => {
    const tocButton = document.getElementById('toggle-toc');
    if (!tocButton) return;
  
    tocButton.addEventListener('click', e => {
      e.preventDefault();
      const tocContainer = document.getElementById('toc-container');
      if (tocContainer) {
        tocContainer.hidden = !tocContainer.hidden;
      }
    });
    formatTOCColumns();
  });
  
  function formatTOCColumns() {
    const tocContent = document.getElementById('toc-content');
    if (!tocContent) return;
    // Parse only H1–H3
    const temp = document.createElement('div');
    temp.innerHTML = tocContent.innerHTML;
    temp.querySelectorAll('nav ul li ul li ul li ul').forEach(n => n.remove());
  
    // Collect and dedupe
    const items = [];
    const seen = new Set();
    temp.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (!seen.has(href)) {
        seen.add(href);
        items.push(a.parentElement.cloneNode(true));
      }
    });
  
    const half = Math.ceil(items.length / 2);
    const leftList = document.createElement('ul');
    const rightList = document.createElement('ul');
    items.forEach((li, i) => (i < half ? leftList : rightList).appendChild(li));
  
    const wrap = document.createElement('div'); wrap.className = 'toc-wrapper';
    [leftList, rightList].forEach(list => {
      const col = document.createElement('div');
      col.className = 'toc-column';
      const nav = document.createElement('nav'); nav.className = 'toc';
      nav.appendChild(list);
      col.appendChild(nav);
      wrap.appendChild(col);
    });
  
    tocContent.innerHTML = '';
    tocContent.appendChild(wrap);
  }