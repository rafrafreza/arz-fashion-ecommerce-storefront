<template>
    <section id="subCategoryCarousel" class="carousel__wrapper bg-primary/5 px-4 lg:px-16 xl:px-4 2xl:px-20 py-8">
        <Carousel v-bind="config" class="px-8 md:px-10">
            <Slide v-for="subcat in subcategories" :key="subcat.item" class="group relative">
                <a :href="`/category/${subcat.category.toLowerCase()}?subcategory=${subcat.item.toLowerCase()}`"
                    class="flex flex-col items-center flex-shrink-0 group cursor-pointer">
                    <figure class="w-24 xs:w-36 sm:w-56 2xl:w-64 mb-2 rounded-full overflow-hidden">
                        <img :src="subcat.image" :alt="subcat.item"
                            class="w-full h-full object-cover object-center rounded-full group-hover:scale-110 active:scale-110 transition-all duration-300 ease-in bg-accent/10 aspect-[1/1]">
                    </figure>
                    <span
                        class="text-text text-center text-xs md:text-base font-medium group-hover:text-secondary active:text-secondary">
                        {{ subcat.item.toUpperCase() }}
                    </span>
                </a>
            </Slide>
            <template #addons>
                <CarouselNavigation />
            </template>
        </Carousel>
    </section>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel';
import { getdefaultImage } from '@/utils';

const config = {
    itemsToShow: 7,
    gap: 15,
    snapAlign: 'center',
    autoplay: 3000,
    wrapAround: true,
    pauseAutoplayOnHover: true,
    height: "auto",

    breakpointMode: 'carousel',
    breakpoints: {
        100: {
            itemsToShow: 3,
            snapAlign: 'start',
        },
        450: {
            itemsToShow: 3,
            snapAlign: 'start',
        },
        768: {
            itemsToShow: 3,
        },
        1024: {
            itemsToShow: 5,
            snapAlign: 'center',
            height: "auto",
        }
    }
};

export default {
    name: 'SubCategoryCarousel',
    components: {
        Carousel,
        Slide,
        CarouselNavigation
    },
    props: {
        categoryMap: {
            type: Object,
            required: true
        }
    },
    computed: {
        subcategories() {
            const allSubcategories = new Set();
            Object.entries(this.categoryMap).forEach(([category, subcats]) => {
                subcats.forEach(subcat => {
                    allSubcategories.add({
                        item: subcat,
                        category: category,
                        image: getdefaultImage(true, 768, 1024, 1)
                    });
                });
            });
            return Array.from(allSubcategories);
        }
    },
    data() {
        return {
            config
        }
    }
}
</script>

<style scoped>
.carousel {
    --vc-nav-color: var(--color-secondary);
    --vc-nav-color-hover: var(--color-primary);
    --vc-nav-border-radius: 50%;
    --vc-nav-width: 2.5rem;
    --vc-nav-height: 2.5rem;
}
</style>