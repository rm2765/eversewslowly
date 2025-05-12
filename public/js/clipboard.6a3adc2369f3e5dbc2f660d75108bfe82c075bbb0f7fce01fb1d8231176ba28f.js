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