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
    
    // Get Hugo's generated TOC
    const originalTOC = tocContent.innerHTML;
    
    // Create a temporary container to parse the TOC HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = originalTOC;
    
    // Remove all H4+ elements
    const h4Plus = tempContainer.querySelectorAll('nav ul li ul li ul li ul');
    h4Plus.forEach(item => item.remove());
    
    // Get all the list items from the TOC (up to H3 only)
    const allListItems = tempContainer.querySelectorAll('nav > ul > li, nav > ul > li > ul > li, nav > ul > li > ul > li > ul > li');
    const itemsArray = Array.from(allListItems);
    
    // Remove duplicates if any
    const uniqueItems = [];
    const seen = new Set();
    
    itemsArray.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (!seen.has(href)) {
                seen.add(href);
                uniqueItems.push(item);
            }
        }
    });
    
    const totalItems = uniqueItems.length;
    const halfItems = Math.ceil(totalItems / 2);
    
    // Create two-column structure
    const tocWrapper = document.createElement('div');
    tocWrapper.className = 'toc-wrapper';
    
    const leftColumn = document.createElement('div');
    leftColumn.className = 'toc-column';
    
    const rightColumn = document.createElement('div');
    rightColumn.className = 'toc-column';
    
    // Create new nav elements for each column
    const leftNav = document.createElement('nav');
    leftNav.className = 'toc';
    const leftUl = document.createElement('ul');
    
    const rightNav = document.createElement('nav');
    rightNav.className = 'toc';
    const rightUl = document.createElement('ul');
    
    // Apply styling to each item and distribute between columns
    uniqueItems.forEach((item, index) => {
        const newItem = item.cloneNode(true);
        const link = newItem.querySelector('a');
        
        if (link) {
            // Get nesting level
            const level = getNestedLevel(item);
            
            // Apply styling based on level
            if (level === 1) {
                // H1 - make bold
                link.innerHTML = '<strong>' + link.innerHTML + '</strong>';
            } else if (level === 2) {
                // H2 - make italic
                link.innerHTML = '<em>' + link.innerHTML + '</em>';
            }
        }
        
        // Distribute items between columns
        if (index < halfItems) {
            leftUl.appendChild(newItem);
        } else {
            rightUl.appendChild(newItem);
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

// Helper function to determine nesting level of an element
function getNestedLevel(element) {
    let level = 1;
    let current = element;
    
    // Check parent ul elements to determine nesting level
    while (current.parentElement) {
        current = current.parentElement;
        if (current.tagName === 'UL' && current.parentElement && current.parentElement.parentElement && 
            current.parentElement.parentElement.tagName !== 'NAV') {
            level++;
        }
    }
    
    return level;
}