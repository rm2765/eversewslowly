adding table of contents to blog single pages when indicated in the frontmatter, how to do this for a hugo website? here is the blog single html, blog posts are page bundles

{{ define "main" }}
{{ partial "menu-header" . }}
{{ partial "blog_single_banner" . }}
<section class="wrapper style2">
    <div class="content">
        <div class="meta-container">
            <div class="meta-categories-tags">
                {{ with .Params.categories }}
                {{ range . }}
                    <a class="button primary small" href="{{ "/categories/" | relURL }}{{ . | urlize }}" class="category-link">{{ . | humanize }}</a>
                    {{ end }}
                {{ end }}
               
                {{ with .Params.tags }}
                    {{ range . }}
                    <a class="button small" href="{{ "/tags/" | relURL }}{{ . | urlize }}">{{ . | humanize }}</a>
                    {{ end }}
                {{ end }}
            </div>
           
            <ul class="icons share-icons">
                <li><a href="https://pinterest.com/pin/create/button/?url={{ .Permalink }}&media={{ with .Params.image }}{{ . }}{{ end }}&description={{ .Title }}" class="icon brands style1 fa-pinterest" target="_blank" title="Share on Pinterest">
                    <span class="label">Share on Pinterest</span></a></li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u={{ .Permalink }}" target="_blank" title="Share on Facebook" class="icon brands style1 fa-facebook-f">
                    <span class="label">Share on Facebook</span></a></li>
                <li><a href="https://www.linkedin.com/sharing/share-offsite/?url={{ .Permalink }}" target="_blank" title="Share on LinkedIn" class="icon brands style1 fa-linkedin">
                    <span class="label">Share on LinkedIn</span></a></li>
                <li><a onclick="copyToClipboard('{{ .Permalink }}')" class="icon style1 fa-link" title="Copy Link" style="cursor: pointer;">
                    <span class="label">Copy Link</span></a></li>
            </ul>
        </div>
        <br>
            {{ .Content }}
             
    </div>
</section>
<!-- Add this script to handle copy to clipboard functionality -->
<script>
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // You could add a temporary tooltip or notification here
        const copyBtn = document.querySelector('.copy-link');
        const originalTitle = copyBtn.title;
        copyBtn.title = "Link copied!";
        setTimeout(() => {
            copyBtn.title = originalTitle;
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}
</script>
{{ partial "breadcrumbs" . }}
{{ end }}
Edit

I'll help you implement a table of contents for blog single pages in your Hugo website that will only appear when indicated in the frontmatter.

To achieve this, we'll need to:

    Add a condition to check if the frontmatter has a TOC parameter
    Use Hugo's built-in functionality to generate a TOC
    Add styling to make it look good

Here's how to modify your blog single template:
How to Add a Table of Contents to Hugo Blog Posts

Here's a step-by-step guide to add a table of contents to your Hugo blog posts that will only appear when indicated in the frontmatter:
1. Update Your Blog Single Template

I've added the table of contents section to your template. The key addition is this block:

html

{{ if .Params.toc }}
<div class="toc-container">
    <h3>Table of Contents</h3>
    {{ .TableOfContents }}
</div>
{{ end }}

This checks if the frontmatter has a toc: true parameter and if so, displays the table of contents using Hugo's built-in .TableOfContents function.
2. Configure Hugo's TOC Settings

Add the following to your Hugo configuration file (config.toml, config.yaml, or config.json):

toml

[markup]
  [markup.tableOfContents]
    endLevel = 4
    ordered = false
    startLevel = 2

This configures:

    startLevel = 2: Begin TOC at H2 headings (##)
    endLevel = 4: Include headings up to H4 (####)
    ordered = false: Use unordered (bullet) lists instead of numbered lists

3. Add TOC Parameter to Blog Post Frontmatter

For any blog post where you want a table of contents to appear, add toc: true to the frontmatter:

yaml

---
title: "My Blog Post"
date: 2025-05-04
toc: true
---

4. Add CSS for Styling

Add the provided CSS to your site's stylesheet to make the table of contents look nice.
5. Optional: Add JavaScript for Enhanced TOC

For an enhanced experience, you can add the provided JavaScript to make the TOC sticky on desktop and highlight the current section as users scroll.
Important Notes

    Heading structure: Hugo automatically generates the TOC from headings in your content. Make sure your blog posts use proper heading levels (H2, H3, H4) for the TOC to work correctly.
    Customization: You can customize the appearance of the TOC by modifying the CSS provided.
    Page bundles: Since you mentioned you're using page bundles, this implementation works perfectly with that structure.
    Conditional display: The TOC will only appear on blog posts where you've specifically added toc: true in the frontmatter.

Would you like me to explain any part of this implementation in more detail?

update the css, any other file if needed, to use the theme's css for unordered alt class and have the toc be collapsible with an action button that uses the theme's css for action small class <ul class="alt">, <ul class="actions small">
Edit

I'll update the CSS and add JavaScript to make the TOC collapsible using your theme's styling classes. Let's implement this with your theme's alt class for the TOC list and actions small class for the toggle button.
Updated Table of Contents Implementation

I've modified the implementation to use your theme's styling classes and made the TOC collapsible with a toggle button. Here are the key updates:
1. Theme-Styled Collapsible TOC

The TOC now:

    Uses your theme's alt class for styling the unordered lists
    Includes a toggle button with your theme's actions small class
    Saves the collapsed/expanded state in localStorage
    Maintains the active section highlighting

2. Key Changes Made

    HTML Structure Changes:
        Added a toggle button with the FontAwesome chevron icon
        Modified the TOC wrapper to use your theme's alt class for styling
        Created a flex header for the TOC title and toggle button
    CSS Updates:
        Added styling for the collapsed state
        Styled the toggle button and animation
        Incorporated your theme's styling for lists with the alt class
        Added styling for the TOC header with flex layout
    JavaScript Updates:
        Added toggle functionality that saves state to localStorage
        Maintained the scroll-based highlighting
        Combined all JavaScript into a single script at the end of the template

3. How to Use It

    In your blog post frontmatter:

    yaml

    ---
    title: "My Blog Post"
    date: 2025-05-04
    toc: true  # This enables the TOC
    ---

    Make sure you have FontAwesome included in your theme for the chevron icon. If you don't, you can use a simple text alternative like "+" and "-" by modifying the code.

4. Implementation Details

    Toggle Behavior: The TOC starts expanded by default unless the user previously collapsed it (state is saved).
    Theme Integration: The implementation uses your theme's styling classes for consistent design.
    Responsive Design: The TOC is sticky on larger screens for better usability while scrolling.

Note on FontAwesome

This implementation assumes your theme includes FontAwesome for the chevron icon. If your theme uses a different icon library, you'll need to adjust the icon class in the toggle button:

html

<a href="#" class="button small toc-toggle"><i class="fa fa-chevron-up"></i></a>

Would you like me to adjust anything else about this implementation or explain any part in more detail?

yes, have the toc be in the div class box, <div class="box">, and stick to the right of the page, also the alt class should be applied to main level header only. Also where do I place the javascript? as a new js file under the assets folder or under in the single.html file?
Edit

I'll update the implementation to match your requirements. Let's make the TOC appear in a .box class container, position it to stick to the right of the page, and apply the .alt class only to the main level of the TOC.
Updated Table of Contents Implementation

I've updated the implementation to meet your new requirements:

    Used .box class for the TOC container
    Positioned TOC on the right side of the content
    Applied .alt class only to the main level headers
    Moved JavaScript to a separate file in the assets folder

File Structure

Here's where you need to place each file:

    Update your blog single template:
        Location: layouts/_default/single.html
        Changes: Added TOC with the .box class and positioned it to float right
    Add CSS styles:
        Location: assets/css/custom.css (or your theme's CSS file)
        Changes: Updated styles for right-side floating TOC with responsive design
    Create JavaScript file:
        Location: assets/js/toc.js
        Content: TOC toggle and active section highlighting functionality

Implementation Details
1. Right-side TOC with .box Class

The TOC now:

    Uses your theme's .box class for styling
    Floats to the right of the content
    Has responsive design (full width on mobile)
    Applies .alt class only to the top-level list

2. JavaScript File

The JavaScript has been moved to a separate file (assets/js/toc.js) and is included in the single template using Hugo's asset pipeline:

html

{{ $tocJS := resources.Get "js/toc.js" | resources.Fingerprint }}
<script src="{{ $tocJS.RelPermalink }}"></script>

This approach:

    Keeps your template file cleaner
    Leverages Hugo's asset fingerprinting for better caching
    Separates concerns (HTML/JS)

3. CSS Changes

The CSS has been updated to:

    Float the TOC to the right with appropriate margins
    Make it responsive (full width on small screens)
    Remove unnecessary styling that would conflict with your theme's .box class

How To Implement

    Update your single.html template with the provided code
    Create assets/js/toc.js with the JavaScript code
    Add the CSS to your theme's stylesheet or assets/css/custom.css
    Update your Hugo config with the TOC settings (if not already done)

For blog posts where you want to show a TOC, just add toc: true to the frontmatter as before.

Would you like me to explain or adjust any specific part of this implementation?

its working, keep the toc button above the box, have the box hide along with the toc items when the toc is collapsed. Also how the h1 headers only, bolded and have the subheaders be collapsed and not have the ul alt class
Edit

I'll update the implementation to meet your new requirements. Let's make these changes:

    Move the toggle button above the box
    Hide the entire box when collapsed
    Show only h1 headers (bolded)
    Make subheaders collapsed initially
    Remove the alt class from subheaders

Updated Collapsible Table of Contents Implementation

I've completely updated the implementation to meet your specific requirements:
Key Changes Made

    Toggle Button Above the Box
        Moved the toggle button outside and above the box container
        Added "Table of Contents" text to the button for clarity
    Hide Entire Box When Collapsed
        The entire box now disappears when collapsed
        Created a new outer container to manage the collapsed state
    H1 Headers Only, Bold, with Collapsible Subheaders
        Top-level headers are displayed in bold
        Subheaders are hidden by default
        Subheaders appear when:
            Parent header is hovered
            Parent header is active (clicked or current section)
    Class Structure
        Applied the .alt class only to the top-level list
        Used a new .toc-submenu class for submenus

How It Works

    Structure:
        .toc-outer-container: Manages overall positioning and collapse state
        .toc-actions: Contains the toggle button
        .box.toc-container: The actual TOC content box
    Interaction:
        Click the toggle button to show/hide the entire TOC box
        Hover over a main heading to reveal its subheadings
        Click on a main heading to keep its subheadings visible
    Responsive Design:
        Sticky on desktop (right side)
        Full width on mobile

Implementation Files

    Template Update (layouts/_default/single.html):
        New HTML structure with separate toggle button
    CSS (assets/css/custom.css):
        Updated styles for the new structure
        Added hover/active states for submenus
        Bold styling for main headers
    JavaScript (assets/js/toc.js):
        Enhanced click handling for TOC links
        Updated active state management
        Improved parent/child relationship for TOC items

How to Test

    Create a blog post with the frontmatter shown in the example
    Make sure to use proper heading structure (H1 for main sections, H2 for subsections)
    Check that:
        Toggle button collapses/expands the entire box
        Main headers are bold
        Subheaders appear on hover/click/when active

Notes

    This implementation assumes your theme's .box class provides the appropriate styling (border, background, etc.)
    The TOC now uses semantic hierarchy to determine styling and behavior
    You can adjust the width, colors, and positioning by modifying the CSS variables

Is there anything specific about this implementation you'd like me to explain or adjust further?


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
