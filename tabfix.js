const textareaElement = document.querySelector("textarea");

textareaElement.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        event.preventDefault();

        const startCaretPosition = textareaElement.selectionStart;
        const endCaretPosition = textareaElement.selectionEnd;

        if (startCaretPosition === endCaretPosition) {
            const newValue =
                textareaElement.value.substring(0, startCaretPosition) +
                "\t" +
                textareaElement.value.substring(startCaretPosition);

            textareaElement.value = newValue;

            const newCaretPosition = startCaretPosition + 4;
            textareaElement.selectionStart = newCaretPosition;
            textareaElement.selectionEnd = newCaretPosition;
        }
    }
});