export function handleLoginWall() {
    // Create a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                // Remove login walls/modals
                const loginLayer = document.querySelector('div[aria-modal="true"]');
                if (loginLayer) {
                    loginLayer.remove();
                }
                
                // Remove any backdrop/overlay
                const overlay = document.querySelector('div[data-testid="confirmationSheetDialog"]');
                if (overlay) {
                    overlay.remove();
                }

                // Fix body scroll and styles
                document.body.style.overflow = 'auto';
                document.body.style.position = 'static';
                document.documentElement.style.overflow = 'auto';
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Prevent redirect by intercepting navigation attempts
    history.pushState = ( f => function pushState(){
        const ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        return ret;
    })(history.pushState);

    window.addEventListener('pushstate', function() {
        if (window.location.pathname.includes('/i/flow/login')) {
            history.back();
        }
    });
}
