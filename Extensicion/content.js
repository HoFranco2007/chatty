function highlightText(text) {
    // Eliminar estilos de resaltado anteriores
    const highlightedElements = document.querySelectorAll('.highlighted');
    highlightedElements.forEach(element => {
        const parent = element.parentNode;
        parent.replaceChild(document.createTextNode(element.textContent), element);
        parent.normalize();
    });

    // Añadir nuevos estilos de resaltado
    const elements = document.querySelectorAll('body *');
    elements.forEach(element => {
        if (element.children.length === 0 && element.textContent.includes(text)) {
            const innerHTML = element.innerHTML;
            const index = innerHTML.indexOf(text);
            if (index >= 0) {
                const highlightedSpan = document.createElement('span');
                highlightedSpan.classList.add('highlighted');
                highlightedSpan.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Fondo semitransparente
                highlightedSpan.style.border = '2px solid red';
                highlightedSpan.style.borderRadius = '3px'; // Bordes redondeados opcional
                highlightedSpan.style.padding = '0 2px'; // Espaciado interno opcional
                highlightedSpan.textContent = innerHTML.substring(index, index + text.length);

                const beforeText = document.createTextNode(innerHTML.substring(0, index));
                const afterText = document.createTextNode(innerHTML.substring(index + text.length));

                element.innerHTML = '';
                element.appendChild(beforeText);
                element.appendChild(highlightedSpan);
                element.appendChild(afterText);
            }
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlight") {
        highlightText(request.text);
    }
});
