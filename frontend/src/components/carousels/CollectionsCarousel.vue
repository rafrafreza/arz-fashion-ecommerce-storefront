<template>
    <section class="carousel__wrapper mt-4 flex flex-col gap-4 overflow-x-hidden bg-secondary/5 py-8">
        <h3 class="text-2xl font-medium pl-4 md:pl-0 text-center text-text">{{ title.toUpperCase() }}</h3>
        <div v-if="isMobileView" class="collections-carousel overflow-x-auto">
            <div class="grid grid-flow-col grid-rows-2 gap-3 px-4 w-max">
                <ProductCard v-for="product in products" :key="product.sku" :product="product" view-type="grid" />
            </div>
        </div>
        <Carousel v-else v-bind="config" class="px-14">
            <Slide v-for="product in products" :key="product.sku" class="px-2 pb-8">
                <ProductCard :product="product" view-type="grid" />
            </Slide>
            <template #addons>
                <CarouselPagination />
                <CarouselNavigation />
            </template>
        </Carousel>
    </section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination as CarouselPagination, Navigation as CarouselNavigation } from 'vue3-carousel';
import ProductCard from '../category/ProductCard.vue';

const config = {
    itemsToShow: 5,
    snapAlign: 'center',
    autoplay: 5000,
    wrapAround: true,
    pauseAutoplayOnHover: true,
    breakpointMode: 'carousel',
    breakpoints: {
        100: {
            itemsToShow: 3,
            snapAlign: 'start',
        },
        1280: {
            itemsToShow: 5,
        },
    }
};

export default {
    props: {
        title: { type: String, required: true },
        delay: { type: Number, required: false },
        products: { type: Array, required: true }
    },
    components: {
        Carousel,
        Slide,
        CarouselPagination,
        CarouselNavigation,
        ProductCard
    },
    data() {
        return {
            config
        }
    },
    computed: {
        isMobileView() {
            return window.innerWidth < 1024;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.$forceUpdate();
        }
    }
}
</script>

<style scoped>
.carousel {
    --vc-slide-gap: 0 !important;
    --vc-pgn-background-color: rgb(from var(--color-text) r g b / 0.1);
    --vc-pgn-active-color: var(--color-secondary);
    --vc-pgn-border-radius: 50%;
    --vc-pgn-height: 0.6rem;
    --vc-pgn-width: 0.6rem;
    --vc-nav-border-radius: %;
    --vc-nav-background: rgb(from var(--color-secondary) r g b / 0.1);
    --vc-nav-color: var(--color-secondary);
    --vc-nav-color-hover: var(--color-primary);
    --vc-nav-height: 3rem;
    --vc-nav-width: 3rem;
}

.collections-carousel {
    scrollbar-width: none;
}
</style>