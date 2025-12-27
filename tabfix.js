const textareaElement = document.querySelector("textarea");
textareaElement.addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
        event.preventDefault();
        const startCaretPosition = textareaElement.selectionStart;
        const endCaretPosition = textareaElement.selectionEnd;
        const newValue = startCaretPosition === endCaretPosition ? `${textareaElement.value.substring(0, startCaretPosition)}    ${textareaElement.value.substring(startCaretPosition)}` : textAreaElement.value;
        textareaElement.value = newValue;
    }
});