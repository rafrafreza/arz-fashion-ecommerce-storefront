<template>
    <section id="banner-carousel" class="w-screen flex flex-col gap-4 md:gap-6 bg-primary/5 pt-6 pb-12">
        <h2 class="self-center text-4xl font-medium text-text">Feedback</h2>
        <div class="carousel__wrapper">
            <Carousel v-bind="config">
                <Slide v-for="feedback in feedbacks" :key="image" class="flex flex-col justify-center items-center overflow-hidden">
                    <div class="md:w-4/5 xl:w-3/5  flex flex-col md:flex-row gap-4 mx-4 md:mx-0 my-2 px-12 md:px-6 py-6 shadow-md bg-background">
                        <img :src="feedback.image" :alt="feedback.name" class="md:h-96" />
                        <article class="w-full flex flex-col justify-between p-4">
                            <div class="flex flex-col gap-1">
                                <h3 class="self-start text-3xl font-medium text-secondary">{{ feedback.name }}</h3>
                                <div class="flex items-center gap-1">
                                    <span v-for="i in 5" :key="i" class="material-icons text-primary">{{ i <= feedback.rating ? 'star' : 'star_border' }}</span>
                                </div>
                            </div>
                            <p class="text-lg font-medium italic">{{ feedback.feedback }}</p>
                           <date class="italic text-sm font-medium text-secondary">{{ feedback.date }}</date>
                        </article>
                    </div>
                </Slide>
                <template #addons>
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script>


import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { getdefaultImage } from '@/utils';

const config = {
    itemsToShow: 1,
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
    name: 'FeedbackCarousel',
    components: {
        Carousel,
        Slide,
        Pagination
    },
    data() {
        const feedbacks = [
            {
            name: "John Doe",
            image: getdefaultImage(true, 1080, 1920, 111),
            rating: 4,
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero tincidunt ultricies. Nullam nec purus nec libero tincidunt ultricies.",
            date: "Sunday, 12th September 2021"
            },
            {
            name: "Jane Smith",
            image: getdefaultImage(true, 1080, 1920, 123),
            rating: 5,
            feedback: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
            date: "Monday, 13th September 2021"
            },
            {
            name: "Alice Johnson",
            image: getdefaultImage(true, 1080, 1920, 134),
            rating: 3,
            feedback: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.",
            date: "Tuesday, 14th September 2021"
            },
            {
            name: "Bob Brown",
            image: getdefaultImage(true, 1080, 1920, 145),
            rating: 4,
            feedback: "Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.",
            date: "Wednesday, 15th September 2021"
            },
            {
            name: "Charlie Davis",
            image: getdefaultImage(true, 1080, 1920, 156),
            rating: 5,
            feedback: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt.",
            date: "Thursday, 16th September 2021"
            }
        ]
        return {
            feedbacks,
            config
        }
    }
};
</script>


<style scoped>
.carousel {
    --vc-pgn-background-color: var(--color-primary);
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