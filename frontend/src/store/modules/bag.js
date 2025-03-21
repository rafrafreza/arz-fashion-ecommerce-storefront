export default {
    namespaced: true,
    state: {
        items: JSON.parse(localStorage.getItem('bag')) || []
    },
    mutations: {
        initializeBag(state) {
            const bag = localStorage.getItem('bag');
            if (bag) {
                state.items = JSON.parse(bag);
            }
        },
        addToBag(state, { sku, quantity, size, color }) {
            const existingItem = state.items.find(item =>
                item.sku === sku &&
                item.size === size &&
                item.color === color
            );

            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.items.push({ sku, quantity, size, color });
            }
            localStorage.setItem('bag', JSON.stringify(state.items));
        },
        removeFromBag(state, sku) {
            state.items = state.items.filter(item => item.sku !== sku);
            localStorage.setItem('bag', JSON.stringify(state.items));
        },
        clearBag(state) {
            state.items = [];
            localStorage.removeItem('bag');
        }
    },
    getters: {
        getQuantity: (state) => (sku, size, color) => {
            const item = state.items.find(item =>
                item.sku === sku &&
                (!size || item.size === size) &&
                (!color || item.color === color)
            );
            return item ? item.quantity : 0;
        },
        totalItems: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0);
        }
    }
}