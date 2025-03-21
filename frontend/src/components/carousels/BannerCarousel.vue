<template>
    <section id="banner-carousel" class="carousel__wrapper">
        <Carousel v-bind="config">
            <Slide v-for="image in images" :key="image">
                <a href="#" :title="image" class="block w-full h-full">
                    <img :src="image" alt="image" class="block w-full h-full bg-primary/10 bg-secondary/10" />
                </a>
            </Slide>
        </Carousel>
    </section>
</template>

<script>

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { getdefaultImages } from '@/utils';

const config = {
    itemsToShow: 1,
    gap: 15,
    snapAlign: 'center',
    autoplay: 7000,
    wrapAround: true,
    pauseAutoplayOnHover: true,
    height: "auto",

    breakpointMode: 'carousel',
    breakpoints: {
        100: {
            snapAlign: 'start',
        },
        1024: {
            snapAlign: 'center',
        }
    }
};

export default {
    name: 'BannerCarousel',
    components: {
        Carousel,
        Slide
    },
    data() {
        return {
            images: getdefaultImages(3, true, 1920, 1080),
            config
        }
    }
}
</script>
