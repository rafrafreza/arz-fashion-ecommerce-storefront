<template>
    <div class="flex sm:flex-row gap-4 p-4 border border-text/10"
        :class="{ 'opacity-50': item.markedForRemoval }">
        <!-- Product Image -->
        <div class="w-full sm:w-32 h-48 sm:h-40 overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
        </div>

        <div class="flex flex-col sm:flex-row flex-1 gap-4">
            <!-- Product Details -->
            <div class="flex-1 flex flex-col gap-2">
                <h3 class="text-lg font-medium">{{ item.name }}</h3>
                <p class="text-sm text-text/70">SKU: {{ item.sku }}</p>
                <p class="text-sm text-text/70">{{ item.category }} > {{ item.subcategory }}</p>

                <!-- Color Selection -->
                <div class="flex gap-2 items-center">
                    <span class="text-sm font-medium">Color:</span>
                    <div class="flex gap-1">
                        <button v-for="color in item.colors" :key="color" @click="updateColor(color)"
                            class="w-6 h-6 border rounded-full"
                            :class="[item.color === color ? 'border-primary border-2' : 'border-text/10']"
                            :style="{ backgroundColor: color }"></button>
                    </div>
                </div>

                <!-- Size Selection -->
                <div class="flex gap-2 items-center">
                    <span class="text-sm font-medium">Size:</span>
                    <div class="flex gap-1">
                        <button v-for="size in item.sizes" :key="size" @click="updateSize(size)"
                            class="px-2 py-1 text-sm border"
                            :class="item.size === size ? 'border-primary text-primary' : 'border-text/10'">
                            {{ size }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quantity and Price -->
            <div class="flex sm:flex-col justify-between items-center sm:items-end gap-4">
                <div class="flex items-center gap-2">
                    <button @click="updateQuantity(-1)"
                        class="w-8 h-8 flex items-center justify-center border border-text/10"
                        :disabled="quantity <= 1">
                        <span class="material-icons text-sm">remove</span>
                    </button>
                    <span class="w-8 text-center">{{ quantity }}</span>
                    <button @click="updateQuantity(1)"
                        class="w-8 h-8 flex items-center justify-center border border-text/10">
                        <span class="material-icons text-sm">add</span>
                    </button>
                </div>
                <p class="font-medium">₹{{ item.price * quantity }}</p>
                <button @click="$emit('remove', item.sku)" class="text-secondary hover:underline text-sm">
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            quantity: this.item.quantity
        }
    },
    methods: {
        updateColor(color) {
            this.emitUpdate({ ...this.item, color });
        },
        updateSize(size) {
            this.emitUpdate({ ...this.item, size });
        },
        updateQuantity(change) {
            const newQuantity = this.quantity + change;
            if (newQuantity >= 1) {
                this.quantity = newQuantity;
                this.emitUpdate({ ...this.item, quantity: newQuantity });
            }
        },
        emitUpdate(updatedItem) {
            this.$emit('update', updatedItem);
        }
    }
}
</script>