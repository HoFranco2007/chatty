function highlightClass(className) {
    // Eliminar estilos de resaltado anteriores
    const highlightedElements = document.querySelectorAll('.highlighted');
    highlightedElements.forEach(element => {
        element.classList.remove('highlighted');
        element.style.border = '';
    });

    // Añadir nuevos estilos de resaltado a los elementos con la clase especificada
    const elementsToHighlight = document.querySelectorAll(`.${className}`);
    elementsToHighlight.forEach(element => {
        element.classList.add('highlighted');
        element.style.border = '2px solid red';
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlight") {
        highlightClass(request.text);
    }
});
