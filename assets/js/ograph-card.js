// Open Graph Card Auto-loader (Enhanced with marketplace detection)
// Add this to the end of your assets/main.js file

document.addEventListener('DOMContentLoaded', async () => {
  const cards = document.querySelectorAll('.og-card-auto');
  
  // Helper function to extract marketplace info from URL
  function getMarketplaceInfo(url) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    
    const marketplaces = {
      'poshmark.com': {
        name: 'Poshmark',
        logo: 'https://d2gjrq7hs8he14.cloudfront.net/webpack4/apple-touch-icon-60x60-abf3d38208fa7ddffa2f2ab1b337d8a34794d5ddfe807b4677f36a0d78914aed.png'
      },
      'ebay.com': {
        name: 'eBay',
        logo: 'https://ir.ebaystatic.com/cr/v/c1/ebay-logo-1-1200x630-margin.png'
      },
      'etsy.com': {
        name: 'Etsy',
        logo: 'https://www.etsy.com/images/favicon.ico'
      },
      'mercari.com': {
        name: 'Mercari',
        logo: 'https://www.mercari.com/favicon.ico'
      },
      'depop.com': {
        name: 'Depop',
        logo: 'https://www.depop.com/favicon.ico'
      },
      'grailed.com': {
        name: 'Grailed',
        logo: 'https://www.grailed.com/favicon.ico'
      },
      'vinted.com': {
        name: 'Vinted',
        logo: 'https://www.vinted.com/favicon.ico'
      },
      'facebook.com': {
        name: 'Facebook Marketplace',
        logo: 'https://www.facebook.com/images/fb_icon_325x325.png'
      }
    };
    
    return marketplaces[hostname] || { 
      name: hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1),
      logo: null
    };
  }
  
  // Helper function to truncate description
  function truncateText(text, maxLength = 200) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  }
  
  // Helper function to extract price from text (basic)
  function extractPrice(text) {
    if (!text) return null;
    const priceMatch = text.match(/\$[\d,]+\.?\d*/);
    return priceMatch ? priceMatch[0] : null;
  }
  
  // Helper function to extract seller/username (basic)
  function extractSeller(url, text) {
    // Try to find @username pattern
    const usernameMatch = text?.match(/@[\w\d_]+/);
    if (usernameMatch) return usernameMatch[0];
    
    // Try to extract from URL path
    const pathMatch = url.match(/\/(?:user|shop|seller)\/([^\/\?]+)/i);
    if (pathMatch) return pathMatch[1];
    
    return null;
  }
  
  for (const card of cards) {
    const url = card.dataset.url;
    
    try {
      // Using MicroLink's free API
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        let { title, description, image, url: finalUrl } = data.data;
        
        // Fix Mercari placeholder image issue
        if (image && image.url && image.url.includes('ogp_image_1.png') && finalUrl.includes('mercari.com')) {
          // Extract real image from the Mercari listing ID
          const mercariIdMatch = finalUrl.match(/\/m(\d+)/);
          if (mercariIdMatch) {
            // Construct Mercari image URL from listing ID
            image.url = `https://u-mercari-images.mercdn.net/photos/m${mercariIdMatch[1]}_1.jpg?`;
          }
        }
        
        // Get marketplace info
        const marketplace = getMarketplaceInfo(finalUrl);
        
        // Extract additional metadata
        const price = extractPrice(description) || extractPrice(title);
        const seller = extractSeller(finalUrl, description);
        
        // Truncate description
        const shortDesc = truncateText(description, 180);
        
        // Build the card HTML
        let cardHTML = `
          <a href="${finalUrl}" target="_blank" rel="noopener">
            ${image ? `
              <div class="og-card-image">
                <img src="${image.url}" alt="${title}" loading="lazy">
              </div>
            ` : ''}
            <div class="og-card-content">
              <h3 class="og-card-title">${title}</h3>
              <p class="og-card-description">${shortDesc}</p>
              <div class="og-card-footer">
        `;
        
        // Add marketplace info
        if (marketplace.name) {
          cardHTML += `
            <div class="og-card-marketplace">
              ${marketplace.logo ? `<img src="${marketplace.logo}" alt="${marketplace.name}" class="og-card-marketplace-logo">` : ''}
              <span class="og-card-marketplace-name">${marketplace.name}</span>
            </div>
          `;
        }
        
        // Add meta info (seller and price)
        const metaItems = [];
        if (seller) metaItems.push(`<span class="og-card-seller">${seller}</span>`);
        if (price) metaItems.push(`<span class="og-card-price">${price}</span>`);
        
        if (metaItems.length > 0) {
          cardHTML += `
            <div class="og-card-meta">
              ${metaItems.join('<span class="og-card-separator">·</span>')}
            </div>
          `;
        }
        
        cardHTML += `
              </div>
            </div>
          </a>
        `;
        
        card.innerHTML = cardHTML;
      }
    } catch (error) {
      console.error('Error loading OG card:', error);
      card.innerHTML = `<div class="og-card-error">Could not load preview for ${url}</div>`;
    }
  }
});