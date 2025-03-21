<template>
    <div class="space-y-6 mb-8">
        <!-- Size Selection -->
        <div class="space-y-3">
            <h3 class="font-medium">Size</h3>
            <div class="flex flex-wrap gap-3">
                <button v-for="size in sizes" :key="size" @click="$emit('update:selectedSize', size)" :class="[
                    'px-4 py-2 border-2',
                    selectedSize === size
                        ? 'border-secondary text-secondary'
                        : 'border-text/10 hover:border-text/20'
                ]">
                    {{ size }}
                </button>
            </div>
        </div>

        <!-- Color Selection -->
        <div class="space-y-3">
            <h3 class="font-medium">Color</h3>
            <div class="flex flex-wrap gap-3">
                <button v-for="color in colors" :key="color.code" @click="$emit('update:selectedColor', color.code)"
                    :class="[
                        'w-8 h-8 rounded-full border-2',
                        selectedColor === color.code
                            ? 'border-secondary'
                            : 'border-transparent hover:border-text/20',
                        color.maxQuantity === 0 ? 'opacity-50' : ''
                    ]" :style="{ backgroundColor: color.code }">
                </button>
            </div>
        </div>

        <!-- Out of Stock Message -->
        <div v-if="maxQuantity === 0" class="w-full bg-secondary/10 p-4 flex justify-center items-center gap-2 text-secondary">
            <span class="material-icons">inventory_2</span>
            <p class="font-medium">Currently out of stock</p>
        </div>

        <!-- Action Buttons -->
        <div v-else class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <div class="flex items-center border border-text/10">
                    <button @click="updateQuantity(-1)" :disabled="quantity <= 1"
                        class="p-3 hover:bg-text/5 disabled:opacity-50 flex items-center">
                        <span class="material-icons">remove</span>
                    </button>
                    <span class="w-24 text-center">{{ quantity }}</span>
                    <button @click="updateQuantity(1)" :disabled="quantity >= maxQuantity"
                        class="p-3 hover:bg-text/5 disabled:opacity-50 flex items-center">
                        <span class="material-icons">add</span>
                    </button>
                </div>
                <button @click="$emit('addToBag')"
                    class="flex-1 bg-secondary text-background py-3 font-medium hover:bg-secondary/90 active:bg-secondary/80 transition-colors">
                    <span class="material-icons align-middle mr-2">shopping_bag</span>
                    Add to Bag
                </button>
            </div>
            <div>
                <button @click="$emit('buyNow')"
                    class="w-full bg-primary/80 text-background border-2 border-primary py-3 font-medium hover:bg-primary active:bg-primary transition-colors">
                    BUY NOW
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductOptions',
    props: {
        sizes: {
            type: Array,
            required: true
        },
        colors: {
            type: Array,
            required: true,
            validator: value => value.every(color =>
                'code' in color &&
                'maxQuantity' in color
            )
        },
        maxQuantity: {
            type: Number,
            required: true
        },
        selectedSize: String,
        selectedColor: String,
        quantity: {
            type: Number,
            required: true
        }
    },
    emits: ['update:selectedSize', 'update:selectedColor', 'update:quantity', 'addToBag', 'buyNow'],
    computed: {
        sizeError() {
            return this.touched && !this.selectedSize;
        },
        colorError() {
            return this.touched && !this.selectedColor;
        }
    },
    data() {
        return {
            touched: false
        }
    },
    methods: {
        updateQuantity(change) {
            const newQuantity = this.quantity + change;
            if (newQuantity >= 1 && newQuantity <= this.maxQuantity) {
                this.$emit('update:quantity', newQuantity);
            }
        },
        validateSelection() {
            this.touched = true;
            return !!(this.selectedSize && this.selectedColor);
        }
    },
    mounted() {
        this.touched = true;
    }
}
</script>