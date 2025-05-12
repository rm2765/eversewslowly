document.addEventListener('DOMContentLoaded', function() {
    // Toggle TOC visibility
    document.getElementById('toggle-toc').addEventListener('click', function(e) {
        e.preventDefault();
        const tocContainer = document.getElementById('toc-container');
        tocContainer.style.display = tocContainer.style.display === 'none' ? 'block' : 'none';
    });
    
    // Generate TOC
    generateTOC();
});

function generateTOC() {
    const articleContent = document.getElementById('article-content');
    const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocContent = document.getElementById('toc-content');
    
    if (headings.length === 0) {
        tocContent.innerHTML = '<p>No headings found in this article.</p>';
        return;
    }
    
    // Create TOC structure
    const tocHtml = document.createElement('div');
    tocHtml.className = 'toc-wrapper';
    
    const leftColumn = document.createElement('div');
    leftColumn.className = 'toc-column';
    
    const rightColumn = document.createElement('div');
    rightColumn.className = 'toc-column';
    
    let currentLevel = 0;
    let currentList = null;
    let currentColumn = leftColumn;
    let itemCount = 0;
    const totalItems = headings.length;
    const halfItems = Math.ceil(totalItems / 2);
    
    headings.forEach((heading, index) => {
        // Add unique ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        const level = parseInt(heading.tagName.substring(1));
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        // Style based on heading level
        if (level === 1) {
            link.innerHTML = '<strong>' + heading.textContent + '</strong>';
        } else if (level === 2) {
            link.innerHTML = '<em>' + heading.textContent + '</em>';
        }
        
        listItem.appendChild(link);
        
        // Create new nested list if needed
        if (!currentList) {
            currentList = document.createElement('ul');
            currentColumn.appendChild(currentList);
        }
        
        // Switch to second column halfway through
        itemCount++;
        if (itemCount === halfItems && currentColumn === leftColumn) {
            currentColumn = rightColumn;
            currentList = document.createElement('ul');
            currentColumn.appendChild(currentList);
        }
        
        currentList.appendChild(listItem);
    });
    
    tocHtml.appendChild(leftColumn);
    tocHtml.appendChild(rightColumn);
    tocContent.appendChild(tocHtml);
}