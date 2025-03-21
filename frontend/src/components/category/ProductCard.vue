<template>
    <article class="relative bg-background">
        <router-link :to="{
            name: 'product',
            params: {
                category: product.category,
                sku: product.sku
            }
        }" class="block" @click.native.stop>
            <div class="product-card relative shadow-sm border hover:border-text/10 active:border-text/10 hover:shadow-lg active:shadow-lg transition-all duration-300 group hover:-translate-y-1 active:-translate-y-1"
                :class="{
                    'flex gap-2 border-text/10': viewType === 'list',
                    'pb-4 border-transparent': viewType === 'grid'
                }">
                <span v-if="product.badge"
                    class="absolute z-10 top-4 px-2 pl-4 py-1 bg-secondary/80 backdrop-blur-md text-background font-medium"
                    :class="{ 'text-xs': viewType === 'list', 'text-sm': viewType === 'grid' }">
                    {{ product.badge }}
                </span>

                <figure class="relative overflow-hidden" :class="{
                    'w-1/3': viewType === 'list',
                    'w-48': isMobileView
                }">
                    <img :src="product.image" :alt="product.name"
                        class="h-full object-cover group-hover:scale-105 transition-transform duration-500">

                    <span v-if="viewType !== 'list'"
                        class="absolute bottom-2 right-2 px-2 py-1 bg-background flex items-center text-xs font-semibold">
                        <span class="material-icons-outlined scale-75 text-secondary">star</span>{{ product.rating }}
                    </span>
                </figure>

                <div class="col-span-2 p-4 flex flex-col" :class="{
                    'flex-1 flex-row gap-2': viewType === 'list',
                    'gap-1': viewType === 'grid'
                }">
                    <div :class="{ 'flex gap-3': viewType === 'list', 'flex-col': isMobileView }">
                        <h3
                            class="text-xl text-text group-hover:text-primary group-active:text-primary font-semibold transition-color duration-100">
                            {{ product.name }}
                        </h3>
                        <div v-if="viewType === 'list'" class="flex items-center text-sm font-medium">
                            <span class="material-icons-outlined scale-75 text-secondary">star</span>{{ product.rating
                            }}
                        </div>
                    </div>
                    <p class="hidden md:contents text-sm text-text/70 font-medium italic mb-2 leading-3">
                        {{ product.description }}
                    </p>

                    <div class="flex flex-col md:flex-row items-baseline gap-2 text-text">
                        <div class="flex items-baseline gap-2">
                            <span class="text-xl font-semibold">₹{{ discountedPrice }}</span>
                            <span class="text-md text-text/50 line-through">₹{{ product.price }}</span>
                        </div>
                        <span class="text-lg text-secondary font-medium">{{ product.discount }}% off</span>
                    </div>
                    <button v-if="viewType === 'list'"
                        class="w-fit mt-2 px-6 py-2 bg-primary/10 text-primary font-semibold text-lg hover:bg-primary/20 active:bg-primary/20 border-2 border-primary">Buy
                        Now</button>
                </div>
            </div>
        </router-link>
    </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
            validator: prop => typeof prop.maxQuantity === 'number'
        },
        viewType: { type: String, default: 'grid' }
    },
    data: () => ({
        isMobileView: false
    }),
    computed: {
        ...mapGetters('bag', ['getQuantity']),
        bagQuantity() {
            return this.getQuantity(
                this.product.sku,
                this.product.sizes[0],
                this.product.colors[0]
            );
        },
        discountedPrice() {
            return Math.round(this.product.price * (1 - this.product.discount / 100))
        },
        showHoverBagButton() {
            return this.viewType !== 'list' && !this.isMobileView
        },
        showBottomBagButton() {
            return this.viewType === 'list' || (this.viewType === 'grid' && this.isMobileView)
        }
    },
    mounted() {
        this.checkScreenSize()
        window.addEventListener('resize', this.checkScreenSize)
        if (this.isMobileView) this.$emit('update:viewType', 'list')
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkScreenSize)
    },
    methods: {
        checkScreenSize() {
            this.isMobileView = window.innerWidth < 768
            if (window.innerWidth < 640 && this.viewType === 'grid') {
                this.$emit('update:viewType', 'list')
            }
        },
        addToBag(quantity) {
            this.$store.commit('bag/addToBag', {
                sku: this.product.sku,
                quantity,
                size: this.product.sizes[0],
                color: this.product.colors[0],
            });
        },
        updateQuantity(change) {
            const newQuantity = this.bagQuantity + change;
            if (newQuantity <= 0) {
                this.$store.commit('bag/removeFromBag', this.product.sku);
            } else if (newQuantity <= this.product.maxQuantity) {
                this.addToBag(newQuantity);
            }
        }
    }
}
</script>
