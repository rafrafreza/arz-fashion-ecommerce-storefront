<template>
    <section id="poster-carousel" class="carousel__wrapper">
        <Carousel v-bind="config">
            <Slide v-for="image in images" :key="image">
                <a href="#" :title="image" class="block h-full">
                    <img :src="image" alt="image" class="block rounded-3xl h-full bg-primary/10 bg-secondary/10" />
                </a>
            </Slide>
            <template #addons>
                <CarouselPagination />
            </template>
        </Carousel>
    </section>
</template>

<script>

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination as CarouselPagination } from 'vue3-carousel';
import { getdefaultImages } from '@/utils';

const config = {
    itemsToShow: 3,
    gap: 15,
    snapAlign: 'center',
    autoplay: 2000,
    wrapAround: true,
    pauseAutoplayOnHover: true,
    height: "auto",

    breakpointMode: 'carousel',
    breakpoints: {
        100: {
            itemsToShow: 1,
            snapAlign: 'start',
            height: 380,
        },
        450: {
            itemsToShow: 1,
            snapAlign: 'start',
            height: 420,
        },
        768: {
            itemsToShow: 3,
            height: 300,
        },
        1024: {
            itemsToShow: 3,
            snapAlign: 'center',
            height: "auto",
        }
    }
};

export default {
    name: 'PosterCarousel',
    components: {
        Carousel,
        Slide,
        CarouselPagination,
    },
    data() {
        return {
            images: getdefaultImages(5, true, 1024, 1024),
            config
        }
    }
}
</script>


<style scoped>
.carousel {
    --vc-pgn-background-color: var(--color-text);
    --vc-pgn-active-color: var(--color-secondary);
    --vc-pgn-border-radius: 50%;
    --vc-pgn-height: 0.6rem;
    --vc-pgn-width: 0.6rem;
}

.carousel__pagination {
    position: absolute;
    bottom: -1.5rem;
}
</style>