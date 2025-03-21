<template>
    <main class="mt-28 md:mt-40 mb-24">
        <div class="px-6 md:px-12 lg:px-24 xl:px-32 py-6">
            <div class="flex gap-8">
                <FilterSidebar class="hidden lg:block w-72 flex-shrink-0" :category="category" :products="products"
                    :subcategory="$route.query.subcategory" :filters="filters" @filter-change="handleFilterChange" />

                <div class="flex flex-col gap-6 w-full">
                    <div class="flex items-end justify-between">
                        <div>
                            <nav class="flex items-center text-sm">
                                <router-link to="/"
                                    class="font-medium text-text hover:text-secondary">Home</router-link>
                                <span class="material-icons scale-75">navigate_next</span>
                                <router-link :to="`/category/${category}`"
                                    class="font-medium text-text hover:text-secondary">
                                    {{ category }}
                                </router-link>
                                <template v-if="$route.query.subcategory">
                                    <span class="material-icons scale-75">navigate_next</span>
                                    <router-link :to="`/category/${category}?subcategory=${$route.query.subcategory}`"
                                        class="font-medium text-text hover:text-secondary">
                                        {{ $route.query.subcategory }}
                                    </router-link>
                                </template>
                            </nav>
                            <h1 class="text-3xl font-medium capitalize">{{ category }}</h1>
                        </div>
                        <div class="flex items-center gap-4">
                            <ViewToggle v-model="viewType" class="hidden sm:flex" :disabled="isMobileView" />
                            <SortDropdown v-model="sortBy" class="block" />
                        </div>
                    </div>

                    <div class="grid gap-4" :class="{
                        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8': effectiveViewType === 'grid',
                        'grid-cols-1 md:grid-cols-2': effectiveViewType === 'list'
                    }">
                        <ProductCard v-for="product in visibleProducts" :key="product.sku" :product="product"
                            :view-type="effectiveViewType" />
                    </div>

                    <div v-if="loading" class="flex justify-center items-center py-8">
                        <span class="material-icons animate-spin">sync</span>
                    </div>
                </div>
            </div>
        </div>

        <FilterMobileView class="lg:hidden fixed bottom-0 left-0 w-full z-50" :filters="filters" :products="products"
            :category="category" @filter-change="handleFilterChange" />
    </main>
</template>

<script>
import FilterSidebar from '@/components/category/FilterSidebar.vue';
import ViewToggle from '@/components/category/ViewToggle.vue';
import SortDropdown from '@/components/category/SortDropdown.vue';
import ProductCard from '@/components/category/ProductCard.vue';
import FilterMobileView from '@/components/category/FilterMobileView.vue';
import { getdefaultImage } from '@/utils';

export default {
    name: "Category",
    components: { FilterSidebar, ViewToggle, SortDropdown, ProductCard, FilterMobileView },
    props: { category: { type: String, required: true } },
    data() {
        return {
            viewType: 'grid',
            isMobileView: false,
            sortBy: 'popularity',
            loading: false,
            page: 1,
            filters: {
                products: [],
                colors: [],
                sizes: [],
                priceRange: [0, 5000],
                rating: null,
                discount: null
            },
            products: [],
            subcategories: [],
            observer: null
        }
    },
    computed: {
        visibleProducts() {
            if (!this.products.length) return [];
            let filtered = [...this.products].filter(product => this.applyFilters(product));
            return this.applySorting(filtered);
        },
        effectiveViewType() {
            return this.isMobileView ? 'list' : this.viewType;
        }
    },
    created() {
        this.loadProducts();
        this.loadSubcategories();
    },
    mounted() {
        this.setupInfiniteScroll();
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        window.removeEventListener('resize', this.checkScreenSize);
    },
    watch: {
        category: {
            handler() {
                this.products = [];
                this.page = 1;
                this.filters = {
                    products: [],
                    colors: [],
                    sizes: [],
                    priceRange: [0, 5000],
                    rating: null
                };
                this.loadSubcategories();
                this.loadProducts();
            },
            immediate: true
        },
        '$route.query.subcategory': {
            handler(newSubcategory) {
                this.products = [];
                this.page = 1;
                this.filters = {
                    ...this.filters,
                    products: newSubcategory ? [newSubcategory.toLowerCase()] : []
                };
                this.loadProducts();
            },
            immediate: true
        }
    },
    methods: {
        setupInfiniteScroll() {
            if (this.observer) this.observer.disconnect();
            this.observer = new IntersectionObserver(
                entries => entries.forEach(entry => {
                    if (entry.isIntersecting && !this.loading) this.loadMoreProducts();
                }),
                { root: null, rootMargin: '0px', threshold: 1.0 }
            );
            this.$nextTick(() => {
                const lastProduct = this.$el.querySelector('.product-card:last-child');
                if (lastProduct) this.observer.observe(lastProduct);
            });
        },
        loadProducts() {
            this.loading = true;
            setTimeout(() => {
                const colors = [
                    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
                    '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#808000',
                    '#008000', '#800080'
                ];

                const currentSubcategory = this.$route.query.subcategory?.toLowerCase();

                const newProducts = Array(20).fill().map((_, i) => {
                    const productSubcategory = currentSubcategory ||
                        this.subcategories[Math.floor(Math.random() * this.subcategories.length)];

                    return {
                        sku: `${this.category.toUpperCase()}-${productSubcategory.toUpperCase()}-${this.products.length + i + 1}`,
                        name: `Product ${this.products.length + i + 1}`,
                        category: this.category,
                        subcategory: productSubcategory.toLowerCase(),
                        description: 'Sample description for the product',
                        image: getdefaultImage(true, 768, 1024, i + 1),
                        price: Math.floor(Math.random() * 4000) + 1000,
                        discount: Math.floor(Math.random() * 50) + 10,
                        rating: (Math.random() * 4 + 1).toFixed(1),
                        colors: Array(Math.floor(Math.random() * 3) + 3)
                            .fill()
                            .map(() => colors[Math.floor(Math.random() * colors.length)]),
                        sizes: this.getSizesForSubcategory(this.getTitleCase(productSubcategory)),
                        badge: ['Trending', 'New Arrival', 'Best Seller'][Math.floor(Math.random() * 3)],
                        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
                        popularity: Math.floor(Math.random() * 1000),
                        maxQuantity: Math.floor(Math.random() * 10) + 5
                    };
                });

                this.products.push(...newProducts);
                this.loading = false;
            }, 1000);
        },
        loadMoreProducts() {
            this.page++;
            this.loadProducts();
        },
        loadSubcategories() {
            const categoryMap = {
                'men': ['thobes', 'kufis', 'jubbahs'],
                'women': ['abayas', 'hijabs', 'jilbabs'],
                'kids': ['boys islamic wear', 'girls islamic wear'],
                'accessories': ['watch', 'perfumes', 'belts', 'wallets', 'socks', 'shoes']
            };
            this.subcategories = categoryMap[this.category.toLowerCase()] || [];
            if (this.$route.query.subcategory) {
                this.filters.products = [this.$route.query.subcategory.toLowerCase()];
            }
        },
        handleFilterChange(filters) {
            this.filters = { ...filters };
            if (filters.products.length > 0) {
                this.$router.push({
                    query: { ...this.$route.query, subcategory: filters.products[0].toLowerCase() }
                });
            } else if (this.$route.query.subcategory) {
                const query = { ...this.$route.query };
                delete query.subcategory;
                this.$router.push({ query });
            }
        },
        applyFilters(product) {
            if (this.filters.products.length && !this.filters.products.some(f =>
                f.toLowerCase() === product.subcategory.toLowerCase())) return false;
            if (this.filters.colors.length && !product.colors.some(c =>
                this.filters.colors.includes(c))) return false;
            if (this.filters.sizes.length && !product.sizes.some(s =>
                this.filters.sizes.includes(s))) return false;
            const finalPrice = product.price * (1 - product.discount / 100);
            if (finalPrice < this.filters.priceRange[0] ||
                finalPrice > this.filters.priceRange[1]) return false;
            if (this.filters.rating && parseFloat(product.rating) < this.filters.rating) return false;
            if (this.filters.discount && product.discount < this.filters.discount) {
                return false;
            }
            return true;
        },
        applySorting(products) {
            const sorted = [...products];
            const getPriceWithDiscount = p => p.price * (1 - p.discount / 100);

            switch (this.sortBy) {
                case 'price_high_low':
                    return sorted.sort((a, b) => getPriceWithDiscount(b) - getPriceWithDiscount(a));
                case 'price_low_high':
                    return sorted.sort((a, b) => getPriceWithDiscount(a) - getPriceWithDiscount(b));
                case 'newest':
                    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                case 'oldest':
                    return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                case 'popularity':
                    return sorted.sort((a, b) => b.popularity - a.popularity);
                default:
                    return sorted;
            }
        },
        getSizesForSubcategory(subcategory) {
            const sizeMap = {
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
            };
            return sizeMap[subcategory] || [];
        },
        getTitleCase(str) {
            const titleCaseMap = {
                'thobes': 'Thobes',
                'kufis': 'Kufis',
                'jubbahs': 'Jubbahs',
                'abayas': 'Abayas',
                'hijabs': 'Hijabs',
                'jilbabs': 'Jilbabs',
                'boys islamic wear': 'Boys Islamic Wear',
                'girls islamic wear': 'Girls Islamic Wear',
                'watch': 'Watch',
                'perfumes': 'Perfumes',
                'belts': 'Belts',
                'wallets': 'Wallets',
                'socks': 'Socks',
                'shoes': 'Shoes'
            };
            return titleCaseMap[str.toLowerCase()] || str;
        },
        checkScreenSize() {
            this.isMobileView = window.innerWidth < 640;
            if (this.isMobileView && this.viewType === 'grid') this.viewType = 'list';
        }
    }
}
</script>
