export function removeLoginPopup(items) {
    // Create a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                // Remove the login popup dialog
                const loginDialog = document.querySelector('div[role="dialog"]');
                if (loginDialog) {
                    loginDialog.remove();
                }

                // Remove the overlay
                const overlay = document.querySelector('.xzkaem6');
                if (overlay) {
                    overlay.remove();
                }

                // Fix body scroll
                document.body.style.overflow = 'auto';
                document.body.style.position = 'static';
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
