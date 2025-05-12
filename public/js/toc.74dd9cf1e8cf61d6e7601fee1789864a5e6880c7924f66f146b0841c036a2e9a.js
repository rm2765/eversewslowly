// Table of Contents functionality
document.addEventListener('DOMContentLoaded', function() {
    const tocContainer = document.querySelector('.toc-container');
    
    if (tocContainer) {
        // Check if the screen is large enough for sticky behavior
        if (window.innerWidth >= 768) {
            tocContainer.classList.add('sticky');
        }
        
        // Add toggle functionality
        const tocToggle = document.querySelector('.toc-toggle');
        if (tocToggle) {
            // Check for saved state in localStorage
            const tocCollapsed = localStorage.getItem('tocCollapsed') === 'true';
            if (tocCollapsed) {
                tocContainer.classList.add('collapsed');
            }
            
            tocToggle.addEventListener('click', function(e) {
                e.preventDefault();
                tocContainer.classList.toggle('collapsed');
                
                // Save state to localStorage
                localStorage.setItem('tocCollapsed', tocContainer.classList.contains('collapsed'));
            });
        }
        
        // Highlight the current section in TOC as user scrolls
        const headings = document.querySelectorAll('h2, h3, h4');
        const tocLinks = document.querySelectorAll('#TableOfContents a');
        
        if (headings.length > 0 && tocLinks.length > 0) {
            window.addEventListener('scroll', function() {
                let current = '';
                
                headings.forEach(heading => {
                    const sectionTop = heading.offsetTop - 100;
                    
                    if (window.pageYOffset >= sectionTop) {
                        current = heading.getAttribute('id');
                    }
                });
                
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }
});