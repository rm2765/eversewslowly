// Table of Contents functionality
document.addEventListener('DOMContentLoaded', function() {
    const tocContainer = document.querySelector('.toc-container');
    
    if (tocContainer) {
        // Removed sticky behavior
        
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
                
                // Update icon
                const icon = this.querySelector('i');
                if (tocContainer.classList.contains('collapsed')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        }
    }
});