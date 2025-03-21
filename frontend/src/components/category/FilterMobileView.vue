<template>
    <div>
        <button @click="showFilters = true"
            class="bg-white shadow-lg border-t flex items-center justify-center gap-2 py-4 w-full z-50">
            <span class="material-icons">filter_list</span>
            <span class="font-medium">Filters</span>
        </button>

        <div v-if="showFilters" class="fixed inset-0 bg-black/50 z-40">
            <div class="absolute bottom-0 left-0 w-full bg-white overflow-y-auto max-h-[90vh]">
                <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h2 class="text-xl font-medium">Filters</h2>
                    <button @click="showFilters = false" class="material-icons">close</button>
                </div>

                <div class="p-6 space-y-6">
                    <div class="filter-section">
                        <h3 class="filter-title">Products</h3>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="product in availableSubcategories" :key="product"
                                @click="toggleProduct(product)" class="px-4 py-2 border"
                                :class="tempFilters.products.includes(product) ? 'border-secondary text-secondary font-medium' : ''">
                                {{ product }}
                            </button>
                        </div>
                    </div>

                    <div class="filter-section">
                        <h3 class="filter-title">Size</h3>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="size in availableSizes" :key="size" @click="toggleSize(size)"
                                class="px-4 py-2 border"
                                :class="tempFilters.sizes.includes(size) ? 'border-secondary text-secondary' : ''">
                                {{ size }}
                            </button>
                        </div>
                    </div>

                    <div class="filter-section">
                        <h3 class="filter-title">Colors</h3>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="color in sortedColors" :key="color.hex" @click="toggleColor(color.hex)"
                                class="w-8 h-8 rounded-full border-2"
                                :class="tempFilters.colors.includes(color.hex) ? 'border-secondary' : 'border-text/20'"
                                :style="{ backgroundColor: color.hex }">
                            </button>
                        </div>
                    </div>

                    <div class="filter-section">
                        <h3 class="filter-title">Price Range</h3>
                        <div>
                            <input type="range" v-model="tempFilters.priceRange[1]" :min="0" :max="maxAvailablePrice"
                                class="w-full accent-secondary" />
                            <div class="flex justify-between text-sm mt-2">
                                <span>₹{{ tempFilters.priceRange[0] }}</span>
                                <span>₹{{ tempFilters.priceRange[1] }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="filter-section">
                        <h3 class="filter-title">Rating</h3>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="rating in [4, 3, 2, 1]" :key="rating" @click="toggleRating(rating)"
                                class="px-4 py-2 border flex items-center gap-1"
                                :class="tempFilters.rating === rating ? 'border-secondary text-secondary' : ''">
                                {{ rating }}+ <span class="material-icons text-sm">star</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="sticky bottom-0 bg-white border-t p-4 flex gap-4">
                    <button @click="clearFilters" class="flex-1 py-3 border font-medium">
                        Clear All
                    </button>
                    <button @click="applyFilters" class="flex-1 py-3 bg-secondary text-white font-medium">
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterMobileView',
    props: ['category', 'products', 'filters'],
    data() {
        return {
            showFilters: false,
            tempFilters: {
                products: [],
                colors: [],
                sizes: [],
                priceRange: [0, 5000],
                rating: null
            },
            categoryMap: {
                'men': ['Thobes', 'Kufis', 'Jubbahs'],
                'women': ['Abayas', 'Hijabs', 'Jilbabs'],
                'kids': ['Boys Islamic Wear', 'Girls Islamic Wear'],
                'accessories': ['Watch', 'Perfumes', 'Belts', 'Wallets', 'Socks', 'Shoes']
            }
        }
    },
    computed: {
        availableSubcategories() {
            return this.categoryMap[this.category.toLowerCase()] || []
        },
        filteredProducts() {
            if (!this.products.length) return [];
            if (this.tempFilters.products.length > 0) {
                return this.products.filter(product =>
                    this.tempFilters.products.some(category =>
                        category.toLowerCase() === product.subcategory.toLowerCase()
                    )
                );
            }
            return this.products;
        },
        availableSizes() {
            return [...new Set(this.filteredProducts.flatMap(product => product.sizes))].sort();
        },
        sortedColors() {
            const colorCount = new Map();
            this.filteredProducts.forEach(product => {
                product.colors.forEach(color => colorCount.set(color, (colorCount.get(color) || 0) + 1));
            });
            return Array.from(colorCount.entries())
                .map(([hex, count]) => ({ hex, count }))
                .sort((a, b) => b.count - a.count);
        },
        maxAvailablePrice() {
            if (!this.filteredProducts.length) return 5000;
            return Math.max(...this.filteredProducts.map(p => Math.ceil(p.price * (1 - p.discount / 100))));
        }
    },
    watch: {
        filters: {
            handler(newFilters) {
                this.tempFilters = { ...newFilters };
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        toggleProduct(product) {
            const index = this.tempFilters.products.indexOf(product);
            if (index === -1) {
                this.tempFilters.products = [product];
            } else {
                this.tempFilters.products.splice(index, 1);
            }
        },
        toggleColor(color) {
            const index = this.tempFilters.colors.indexOf(color);
            if (index === -1) {
                this.tempFilters.colors.push(color);
            } else {
                this.tempFilters.colors.splice(index, 1);
            }
        },
        toggleSize(size) {
            const index = this.tempFilters.sizes.indexOf(size);
            if (index === -1) {
                this.tempFilters.sizes.push(size);
            } else {
                this.tempFilters.sizes.splice(index, 1);
            }
        },
        toggleRating(rating) {
            this.tempFilters.rating = this.tempFilters.rating === rating ? null : rating;
        },
        clearFilters() {
            this.tempFilters = {
                products: [],
                colors: [],
                sizes: [],
                priceRange: [0, this.maxAvailablePrice],
                rating: null
            };
        },
        applyFilters() {
            this.$emit('filter-change', { ...this.tempFilters });
            this.showFilters = false;
        }
    }
}
</script>

<style scoped>
.filter-section {
    @apply border-b border-text/10 pb-6;
}

.filter-title {
    @apply text-lg font-medium mb-4;
}

:global(body.modal-open) {
    overflow: hidden;
}
</style>