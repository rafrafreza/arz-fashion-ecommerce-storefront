<template>
    <div class="border-t border-text/10 py-6">
        <!-- Section Header -->
        <button 
            @click="isOpen = !isOpen"
            class="w-full flex items-center justify-between py-2 group">
            <h2 class="text-lg font-medium group-hover:text-secondary transition-colors">
                Key Highlights
            </h2>
            <span 
                class="material-icons transition-transform"
                :class="isOpen ? 'rotate-180' : ''">
                expand_more
            </span>
        </button>

        <!-- Highlights Grid -->
        <div 
            v-show="isOpen"
            class="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            <div 
                v-for="(highlight, index) in highlights" 
                :key="index"
                class="space-y-1 bg-primary/5 p-4">
                <h3 class="font-medium">{{ highlight.title }}</h3>
                <p class="text-sm text-text">{{ highlight.subtitle }}</p>
            </div>
        </div>

        <!-- Empty State -->
        <p 
            v-if="!highlights.length && isOpen" 
            class="text-text/50 mt-4">
            No highlights available for this product
        </p>
    </div>
</template>

<script>
export default {
    name: 'ProductHighlights',
    props: {
        highlights: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every(item => 
                    'title' in item && 
                    'subtitle' in item
                )
            }
        }
    },
    data() {
        return {
            isOpen: true
        }
    }
}
</script>