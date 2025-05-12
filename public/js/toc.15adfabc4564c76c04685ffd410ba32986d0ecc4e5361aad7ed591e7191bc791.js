/* JavaScript for Table of Contents functionality */
document.addEventListener('DOMContentLoaded', function() {
    const tocOuterContainer = document.querySelector('.toc-outer-container');
   
    if (tocOuterContainer) {
        // No need to check for sticky/fixed behavior since it's now fixed by default in CSS
        // if (window.innerWidth >= 768) {
        //     tocOuterContainer.classList.add('fixed');
        // }
       
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
        const tocLinks = document.querySelectorAll('#TableOfContentsWrapper a');
        const headings = document.querySelectorAll('h1, h2, h3, h4');
       
        // Handle click on TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // If it's an internal link
                    const parentLi = this.closest('li');
                    const submenu = parentLi.querySelector('ul');
                    
                    if (submenu) {
                        e.preventDefault(); // Prevent default navigation if it has submenu
                        
                        // Toggle active state on parent when clicked
                        parentLi.classList.toggle('active');
                        
                        // Remove active class from all siblings and their children
                        const siblings = Array.from(parentLi.parentNode.children).filter(item => item !== parentLi);
                        siblings.forEach(sibling => {
                            sibling.classList.remove('active');
                            const nestedActives = sibling.querySelectorAll('.active');
                            nestedActives.forEach(active => active.classList.remove('active'));
                        });
                    }
                    
                    // Always scroll to the heading when the link is clicked
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        e.preventDefault(); // Prevent default navigation for all links
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
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
               
                // Only update the active section, don't expand submenus automatically
                if (current) {
                    const currentLink = document.querySelector(`#TableOfContentsWrapper a[href="#${current}"]`);
                    if (currentLink) {
                        // Remove active class from all links
                        tocLinks.forEach(link => {
                            link.classList.remove('active');
                        });
                        
                        // Add active class to current link
                        currentLink.classList.add('active');
                    }
                }
            });
        }
    }
});
