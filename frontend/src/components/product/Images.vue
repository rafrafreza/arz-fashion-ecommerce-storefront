<template>
    <div class="flex gap-8">
        <!-- Thumbnails -->
        <div class="hidden md:flex flex-col gap-4">
            <button 
                v-for="(image, index) in images" 
                :key="index"
                @click="activeIndex = index"
                class="w-20 h-20 border-2 overflow-hidden transition-all duration-300"
                :class="activeIndex === index ? 'border-secondary' : 'border-transparent hover:border-text/10'">
                <img 
                    :src="image" 
                    :alt="`Product image ${index + 1}`"
                    class="w-full h-full object-cover">
            </button>
        </div>

        <!-- Main Image -->
        <div class="flex-1 relative h-fit">
            <div class="aspect-[3/4] overflow-hidden">
                <img 
                    :src="currentImage" 
                    :alt="'Product main image'"
                    class="w-full h-full object-cover relative">
            </div>

            <!-- Mobile Navigation -->
            <div class="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button 
                    v-for="(_, index) in images" 
                    :key="index"
                    @click="activeIndex = index"
                    class="w-2 h-2 rounded-full transition-all duration-300"
                    :class="activeIndex === index ? 'bg-secondary' : 'bg-background'">
                </button>
            </div>

            <!-- Navigation Arrows -->
            <button 
                v-if="canNavigatePrev"
                @click="navigatePrev"
                class="absolute left-4 top-1/2 -translate-y-1/2 p-3 flex items-center justify-center hover:bg-background group">
                <span class="material-icons text-secondary scale-150 group-hover:text-primary">chevron_left</span>
            </button>
            <button 
                v-if="canNavigateNext"
                @click="navigateNext"
                class="absolute right-4 top-1/2 -translate-y-1/2 p-3 flex items-center justify-center hover:bg-background group">
                <span class="material-icons text-secondary scale-150 group-hover:text-primary">chevron_right</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductImages',
    props: {
        images: {
            type: Array,
            required: true,
            validator: value => value.length > 0 && value.length <= 5
        }
    },
    data() {
        return {
            activeIndex: 0
        }
    },
    computed: {
        currentImage() {
            return this.images[this.activeIndex]
        },
        canNavigatePrev() {
            return this.activeIndex > 0
        },
        canNavigateNext() {
            return this.activeIndex < this.images.length - 1
        }
    },
    methods: {
        navigatePrev() {
            if (this.canNavigatePrev) {
                this.activeIndex--
            }
        },
        navigateNext() {
            if (this.canNavigateNext) {
                this.activeIndex++
            }
        }
    }
}
</script>