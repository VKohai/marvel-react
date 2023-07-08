export const useSelectedItem = (activeSelector, itemsRef) => {
    function focusOnItem(id) {
        itemsRef.current.forEach(item => item.classList.remove(activeSelector));
        itemsRef.current[id].classList.add(activeSelector);
        itemsRef.current[id].focus();
        // setSelectedItem(id);
    }

    function onFocus(id, selectedItem) {
        itemsRef.current.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove(activeSelector);
        });
        itemsRef.current[id].classList.add(activeSelector);
    }

    function onFocusLost(id, selectedItem) {
        itemsRef.current.forEach((item, index) => {
            if (index === selectedItem) return;
            item.classList.remove(activeSelector);
        });
    }

    return { focusOnItem, onFocus, onFocusLost };
}