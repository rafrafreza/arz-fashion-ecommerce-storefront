<template>
    <div class="relative">
        <button @click="isOpen = !isOpen"
            class="flex items-center gap-2 py-2.5 px-4 bg-text/5 hover:bg-text/10 sm:text-base text-sm">
            <span class="material-icons" :class="modelValue !== 'default' ? 'text-secondary' : ''">sort</span>
            <span class="hidden md:contents">{{ currentSortLabel }}</span>
        </button>

        <div v-if="isOpen" class="absolute top-full right-0 mt-2 w-64 bg-background shadow-lg z-20">
            <button v-for="option in allSortOptions" :key="option.value" @click="selectOption(option.value)"
                class="w-full px-4 py-2 text-left hover:bg-secondary/5 sm:text-base text-sm"
                :class="modelValue === option.value ? 'text-secondary font-medium' : ''">
                {{ option.label }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SortDropdown',
    props: {
        modelValue: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            isOpen: false,
            sortOptions: [
                { value: 'popularity', label: 'Most Popular' },
                { value: 'price_high_low', label: 'Price: High to Low' },
                { value: 'price_low_high', label: 'Price: Low to High' },
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' }
            ]
        }
    },
    computed: {
        allSortOptions() {
            return [
                { value: 'default', label: 'Default' },
                ...this.sortOptions
            ]
        },
        currentSortLabel() {
            const option = this.allSortOptions.find(opt => opt.value === this.modelValue)
            return option ? option.label : 'Sort By'
        }
    },
    methods: {
        selectOption(value) {
            this.$emit('update:modelValue', value)
            this.isOpen = false
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>