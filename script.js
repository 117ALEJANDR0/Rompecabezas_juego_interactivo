const puzzlePieces = document.querySelectorAll('.puzzle-piece');
const pieceSize = 150; // Ajusta esto al tamaño de tus piezas
const magnetRange = 30; // Rango en píxeles para "unirse" las piezas

let activePiece = null;
let offset = { x: 0, y: 0 };

puzzlePieces.forEach(piece => {
    piece.addEventListener('mousedown', (e) => {
        activePiece = piece;
        offset.x = e.clientX - piece.getBoundingClientRect().left;
        offset.y = e.clientY - piece.getBoundingClientRect().top;

        piece.style.cursor = 'grabbing'; // Cambia el cursor
    });
});

document.addEventListener('mousemove', (e) => {
    if (activePiece) {
        const container = activePiece.parentElement; // Obtiene el contenedor del rompecabezas
        const containerRect = container.getBoundingClientRect();
        
        // Calcula la nueva posición
        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        // Asegura que la pieza no salga de los límites del contenedor
        if (newX < containerRect.left) newX = containerRect.left;
        if (newY < containerRect.top) newY = containerRect.top;
        if (newX + activePiece.clientWidth > containerRect.right) newX = containerRect.right - activePiece.clientWidth;
        if (newY + activePiece.clientHeight > containerRect.bottom) newY = containerRect.bottom - activePiece.clientHeight;

        activePiece.style.left = `${newX - containerRect.left}px`;
        activePiece.style.top = `${newY - containerRect.top}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (activePiece) {
        // Comprueba si la pieza está cerca de su posición correcta
        const correctPosition = getCorrectPosition(activePiece.dataset.position);
        const pieceRect = activePiece.getBoundingClientRect();
        
        // Verifica si está dentro del rango de "unión"
        if (Math.abs(pieceRect.left - correctPosition.x) < magnetRange && Math.abs(pieceRect.top - correctPosition.y) < magnetRange) {
            activePiece.style.left = `${correctPosition.x}px`;
            activePiece.style.top = `${correctPosition.y}px`;
        }

        activePiece.style.cursor = 'grab'; // Cambia el cursor de vuelta
        activePiece = null; // Resetea la pieza activa
    }
});

// Función para obtener la posición correcta de cada pieza
function getCorrectPosition(position) {
    const x = (position % 2) * pieceSize; // 0 para izquierda, 1 para derecha
    const y = Math.floor(position / 2) * pieceSize; // 0 para arriba, 1 para abajo
    return { x: x, y: y }; // Devuelve la posición correcta
}
