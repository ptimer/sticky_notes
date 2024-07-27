/* eslint-disable @typescript-eslint/no-explicit-any */

export const setNewOffset = (card: any, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    const maxOffsetLeft = windowWidth - cardWidth;
    const maxOffsetTop = windowHeight - cardHeight;

    return {
        x: Math.max(0, Math.min(offsetLeft, maxOffsetLeft)),
        y: Math.max(0, Math.min(offsetTop, maxOffsetTop)),
    };
};

export const autoGrow = (textAreaRef: any) => {
    const { current } = textAreaRef;

    current.style.height = 'auto';
    current.style.height = current.scrollHeight + 'px';
}

export const setZIndex = (selectedCard: any) => {
    selectedCard.style.zIndex = 999;
 
    Array.from(document.querySelectorAll('[data-id="card"]')).forEach((card: any) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const bodyParser = (value: any) => {
    try {
        return JSON.parse(value);
    } catch (error: any) {
        return value;
    }
}