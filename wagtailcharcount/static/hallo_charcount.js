function initializeCharacterCounter() {
    // Locate the main editor container
    let editorWrapper = document.querySelector('.w-field--draftail_rich_text_area');

    // If the editor container doesn't exist, exit the script.
    if (!editorWrapper) {
        return;
    }

    // Create an element for the character counter
    let charCounter = document.createElement('div');
    charCounter.id = 'char-counter';

    // Create an element for the word counter
    let wordCounter = document.createElement('div');
    wordCounter.id = 'word-counter';

    // Add the character and word counters directly below the editor container
    editorWrapper.parentNode.insertBefore(charCounter, editorWrapper.nextSibling);
    editorWrapper.parentNode.insertBefore(wordCounter, charCounter.nextSibling);

    // Locate the contenteditable element
    let textField = editorWrapper.querySelector('.DraftEditor-editorContainer [contenteditable="true"]');

    // Function to update the character and word count
    const updateCounter = () => {
        // Get the raw text from the editor
        const textContent = textField.textContent || "";

        // Count words. A word is defined as a sequence of non-space characters separated by spaces.
        const wordCount = textContent.split(/\s+/).filter(Boolean).length;

        charCounter.innerText = `Characters: ${textContent.length}`;
        wordCounter.innerText = `Words: ${wordCount}`;
    };

    // Update the character and word count in response to changes in the editor
    textField.addEventListener('input', updateCounter);

    // Handle keydown event (especially backspace/delete)
    textField.addEventListener('keydown', function(event) {
        // Check for backspace or delete keys
        if (event.keyCode === 8 || event.keyCode === 46) {
            setTimeout(updateCounter, 50);
        }
    });

    // Handle pasted text with a delay
    textField.addEventListener('paste', function(event) {
        setTimeout(updateCounter, 50);  // Update the counter after a short delay
    });

    // Initial update to set initial values
    updateCounter();
}


// Function to initialize the mutation observer
function initObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // For each added node
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];

                    // If the new node contains our editor
                    if (node.querySelector && node.querySelector('.w-field--draftail_rich_text_area')) {
                        initializeCharacterCounter();
                    }
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,  // observe direct children
        subtree: true,    // also observe all descendant nodes
        attributes: false,
        characterData: false,
    });
}

window.addEventListener('load', initObserver);

document.addEventListener('DOMContentLoaded', function() {
    initializeCharacterCounter();
})