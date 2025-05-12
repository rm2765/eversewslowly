<!-- JavaScript for TOC functionality -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle TOC visibility
    const tocButton = document.getElementById('toggle-toc');
    if (tocButton) {
        tocButton.addEventListener('click', function(e) {
            e.preventDefault();
            const tocContainer = document.getElementById('toc-container');
            tocContainer.style.display = tocContainer.style.display === 'none' ? 'block' : 'none';
        });
        
        // Process TOC into two columns
        formatTOCIntoColumns();
    }
});

function formatTOCIntoColumns() {
    const tocContent = document.getElementById('toc-content');
    if (!tocContent) return;
    
    // Get the original TOC content
    const originalTOC = tocContent.innerHTML;
    
    // Create two-column structure
    const tocWrapper = document.createElement('div');
    tocWrapper.className = 'toc-wrapper';
    
    const leftColumn = document.createElement('div');
    leftColumn.className = 'toc-column';
    
    const rightColumn = document.createElement('div');
    rightColumn.className = 'toc-column';
    
    // First, create a temporary container to parse the TOC HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = originalTOC;
    
    // Get all the list items from the TOC
    const allListItems = tempContainer.querySelectorAll('li');
    const totalItems = allListItems.length;
    const halfItems = Math.ceil(totalItems / 2);
    
    // Create new nav element for left column
    const leftNav = document.createElement('nav');
    leftNav.className = 'toc';
    const leftUl = document.createElement('ul');
    
    // Create new nav element for right column
    const rightNav = document.createElement('nav');
    rightNav.className = 'toc';
    const rightUl = document.createElement('ul');
    
    // Clone all items
    allListItems.forEach((item, index) => {
        // Find all links in this item
        const links = item.querySelectorAll('a');
        
        // Apply styling to links based on their nesting level
        links.forEach(link => {
            const parent = link.closest('ul');
            if (parent && !parent.parentElement.closest('ul')) {
                // First level - make bold
                link.innerHTML = '<strong>' + link.innerHTML + '</strong>';
            } else if (parent && parent.parentElement.closest('ul') && !parent.parentElement.closest('ul').parentElement.closest('ul')) {
                // Second level - make italic
                link.innerHTML = '<em>' + link.innerHTML + '</em>';
            }
        });
        
        // Distribute items between columns
        if (index < halfItems) {
            leftUl.appendChild(item.cloneNode(true));
        } else {
            rightUl.appendChild(item.cloneNode(true));
        }
    });
    
    leftNav.appendChild(leftUl);
    rightNav.appendChild(rightUl);
    
    leftColumn.appendChild(leftNav);
    rightColumn.appendChild(rightNav);
    
    tocWrapper.appendChild(leftColumn);
    tocWrapper.appendChild(rightColumn);
    
    // Replace original content with our two-column layout
    tocContent.innerHTML = '';
    tocContent.appendChild(tocWrapper);
}