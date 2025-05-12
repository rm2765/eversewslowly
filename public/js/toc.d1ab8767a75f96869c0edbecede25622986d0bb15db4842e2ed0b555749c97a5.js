// Table of Contents functionality
document.addEventListener('DOMContentLoaded', function() {
    const tocOuterContainer = document.querySelector('.toc-outer-container');
    
    if (tocOuterContainer) {
        // Check if the screen is large enough for sticky behavior
        if (window.innerWidth >= 768) {
            tocOuterContainer.classList.add('sticky');
        }
        
        // Add toggle functionality
        const tocToggle = document.querySelector('.toc-toggle');
        if (tocToggle) {
            // Check for saved state in localStorage
            const tocCollapsed = localStorage.getItem('tocCollapsed') === 'true';
            if (tocCollapsed) {
                tocOuterContainer.classList.add('collapsed');
            }
            
            tocToggle.addEventListener('click', function(e) {
                e.preventDefault();
                tocOuterContainer.classList.toggle('collapsed');
                
                // Save state to localStorage
                localStorage.setItem('tocCollapsed', tocOuterContainer.classList.contains('collapsed'));
            });
        }
        
        // Find all TOC links
        const tocLinks = document.querySelectorAll('#TableOfContents a');
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        
        // Handle click on TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const parentLi = this.parentNode;
                const submenu = parentLi.querySelector('.toc-submenu');
                
                if (submenu) {
                    // Set active state on parent when clicked
                    parentLi.classList.toggle('active');
                }
            });
        });
        
        // Highlight the current section in TOC as user scrolls
        if (headings.length > 0 && tocLinks.length > 0) {
            window.addEventListener('scroll', function() {
                let current = '';
                
                headings.forEach(heading => {
                    const sectionTop = heading.offsetTop - 100;
                    
                    if (window.pageYOffset >= sectionTop) {
                        current = heading.getAttribute('id');
                    }
                });
                
                // Remove all active classes
                tocLinks.forEach(link => {
                    link.parentNode.classList.remove('active');
                });
                
                // Add active class to current section and its parents
                if (current) {
                    const currentLink = document.querySelector(`#TableOfContents a[href="#${current}"]`);
                    if (currentLink) {
                        let parent = currentLink.parentNode;
                        while (parent && parent.id !== 'TableOfContentsWrapper') {
                            if (parent.tagName === 'LI') {
                                parent.classList.add('active');
                            }
                            parent = parent.parentNode;
                        }
                    }
                }
            });
        }
    }
});