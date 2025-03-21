<template>
    <aside class="h-[calc(100vh-12rem)] sticky top-40 overflow-y-auto pr-4">
        <div class="flex flex-col gap-6">
            <!-- Products Filter -->
            <div class="filter-section">
                <h3 class="filter-title">Products</h3>
                <div class="flex flex-wrap gap-2">
                    <button v-for="product in availableSubcategories" :key="product" @click="toggleProduct(product)"
                        class="px-4 py-2 border"
                        :class="selectedFilters.products.includes(product) ? 'border-secondary text-secondary font-medium' : ''">
                        {{ product }}
                    </button>
                </div>
            </div>

            <!-- Size Filter -->
            <div class="filter-section">
                <h3 class="filter-title">Size</h3>
                <div class="flex flex-wrap gap-2">
                    <button v-for="size in availableSizes" :key="size" @click="toggleSize(size)"
                        class="px-4 py-2 border"
                        :class="selectedFilters.sizes.includes(size) ? 'border-secondary text-secondary' : ''">
                        {{ size }}
                    </button>
                </div>
            </div>

            <!-- Colors Filter -->
            <div class="filter-section">
                <h3 class="filter-title">Colors</h3>
                <div class="flex flex-wrap gap-2">
                    <button v-for="color in sortedColors" :key="color.hex" @click="toggleColor(color.hex)"
                        class="w-8 h-8 rounded-full border-2"
                        :class="selectedFilters.colors.includes(color.hex) ? 'border-secondary' : 'border-text/20'"
                        :style="{ backgroundColor: color.hex }">
                    </button>
                </div>
            </div>

            <!-- Price Range -->
            <div class="filter-section">
                <h3 class="filter-title">Price Range</h3>
                <div>
                    <input type="range" v-model="selectedFilters.priceRange[1]" :min="0" :max="maxAvailablePrice"
                        class="w-full accent-secondary" @input="emitFilters" />
                    <div class="flex justify-between text-sm mt-2">
                        <span>₹{{ selectedFilters.priceRange[0] }}</span>
                        <span>₹{{ selectedFilters.priceRange[1] }}</span>
                    </div>
                </div>
            </div>

            <!-- Rating Filter -->
            <div class="filter-section">
                <h3 class="filter-title">Rating</h3>
                <div class="flex flex-wrap gap-2">
                    <button v-for="rating in availableRatings" :key="rating" @click="toggleRating(rating)"
                        class="px-4 py-2 border flex items-center gap-1"
                        :class="selectedFilters.rating === rating ? 'border-secondary text-secondary' : ''">
                        {{ rating }}+ <span class="material-icons text-sm">star</span>
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'FilterSidebar',
    props: {
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            default: null
        },
        products: {
            type: Array,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedFilters: {
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
            },
            sizeMap: {
                'Thobes': ['48', '50', '52', '54', '56', '58'],
                'Kufis': ['S', 'M', 'L', 'XL'],
                'Jubbahs': ['48', '50', '52', '54', '56'],
                'Abayas': ['XS', 'S', 'M', 'L', 'XL', '2XL'],
                'Hijabs': ['Standard'],
                'Jilbabs': ['S', 'M', 'L', 'XL', '2XL'],
                'Boys Islamic Wear': ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
                'Girls Islamic Wear': ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
                'Watch': ['Standard'],
                'Perfumes': ['30ml', '50ml', '100ml'],
                'Belts': ['28', '30', '32', '34', '36'],
                'Wallets': ['Standard'],
                'Socks': ['S', 'M', 'L'],
                'Shoes': ['6', '7', '8', '9', '10', '11']
            }
        }
    },
    computed: {
        availableSubcategories() {
            return this.categoryMap[this.category.toLowerCase()] || []
        },
        subcategoryTitleCase() {
            if (!this.subcategory) return null;
            return this.availableSubcategories.find(
                sub => sub.toLowerCase() === this.subcategory.toLowerCase()
            );
        },
        filteredProducts() {
            if (!this.products.length) return [];

            if (this.selectedFilters.products.length > 0) {
                const selectedSubcategory = this.selectedFilters.products[0];
                return this.products.filter(
                    product => product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
                );
            }
            return this.products;
        },

        availableSizes() {
            const uniqueSizes = [...new Set(this.filteredProducts.flatMap(product => product.sizes))];

            const sizeOrder = {
                'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, '2XL': 6, 'Standard': 7,
                '30ml': 8, '50ml': 9, '100ml': 10
            };

            return uniqueSizes.sort((a, b) => {
                if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);

                if (a.includes('Y') && b.includes('Y')) {
                    return Number(a.split('-')[0]) - Number(b.split('-')[0]);
                }

                return (sizeOrder[a] || 99) - (sizeOrder[b] || 99);
            });
        },

        sortedColors() {
            const colorCount = new Map();
            this.filteredProducts.forEach(product => {
                product.colors.forEach(color => {
                    colorCount.set(color, (colorCount.get(color) || 0) + 1);
                });
            });

            return Array.from(colorCount.entries())
                .map(([hex, count]) => ({ hex, count }))
                .sort((a, b) => b.count - a.count);
        },

        maxAvailablePrice() {
            if (!this.filteredProducts.length) return 5000;

            return Math.max(...this.filteredProducts.map(product => {
                const finalPrice = product.price * (1 - product.discount / 100);
                return Math.ceil(finalPrice);
            }));
        },

        availableRatings() {
            if (!this.filteredProducts.length) return [4, 3, 2, 1];

            const ratings = this.filteredProducts.map(product => Math.floor(parseFloat(product.rating)));
            const maxRating = Math.max(...ratings);

            return [4, 3, 2, 1].filter(rating => rating <= maxRating);
        }
    },
    created() {
        this.selectedFilters = { ...this.filters };

        if (this.subcategory && this.subcategoryTitleCase) {
            this.selectedFilters.products = [this.subcategoryTitleCase];
            this.emitFilters();
        }
    },
    watch: {
        filters: {
            handler(newFilters) {
                this.selectedFilters = { ...newFilters };
            },
            deep: true
        },
        subcategory: {
            handler(newSubcategory) {
                if (newSubcategory && this.subcategoryTitleCase) {
                    this.selectedFilters.products = [this.subcategoryTitleCase];
                    this.emitFilters();
                }
            },
            immediate: true
        },
        maxAvailablePrice: {
            handler(newMax) {
                if (this.selectedFilters.priceRange[1] > newMax) {
                    this.selectedFilters.priceRange = [0, newMax];
                    this.emitFilters();
                }
            },
            immediate: true
        }
    },
    methods: {
        toggleProduct(product) {
            const index = this.selectedFilters.products.indexOf(product);
            if (index === -1) {
                this.selectedFilters.products = [product];
                this.selectedFilters.sizes = [];
                this.selectedFilters.colors = [];
                this.selectedFilters.rating = null;
                this.selectedFilters.priceRange = [0, this.maxAvailablePrice];

                this.$router.push({
                    query: {
                        ...this.$route.query,
                        subcategory: product.toLowerCase()
                    }
                });
            } else {
                this.selectedFilters.products.splice(index, 1);
                this.selectedFilters.sizes = [];
                this.selectedFilters.colors = [];
                this.selectedFilters.rating = null;
                this.selectedFilters.priceRange = [0, this.maxAvailablePrice];

                const query = { ...this.$route.query };
                delete query.subcategory;
                this.$router.push({ query });
            }
            this.emitFilters();
        },
        toggleColor(color) {
            const index = this.selectedFilters.colors.indexOf(color)
            if (index === -1) {
                this.selectedFilters.colors.push(color)
            } else {
                this.selectedFilters.colors.splice(index, 1)
            }
            this.emitFilters()
        },
        toggleSize(size) {
            const index = this.selectedFilters.sizes.indexOf(size)
            if (index === -1) {
                this.selectedFilters.sizes.push(size)
            } else {
                this.selectedFilters.sizes.splice(index, 1)
            }
            this.emitFilters()
        },
        toggleRating(rating) {
            this.selectedFilters.rating = this.selectedFilters.rating === rating ? null : rating
            this.emitFilters()
        },
        emitFilters() {
            this.$emit('filter-change', { ...this.selectedFilters })
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

/* Custom scrollbar */
::-webkit-scrollbar {
    @apply w-1;
}

::-webkit-scrollbar-track {
    @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
    @apply bg-text/20 rounded-full hover:bg-text/30;
}
</style>