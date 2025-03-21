<template>
    <div class="flex items-center gap-2 bg-text/5 p-1">
        <button 
            v-for="type in viewTypes" 
            :key="type.value"
            @click="$emit('update:modelValue', type.value)"
            class="p-1.5 pb-0 transition-all duration-200"
            :class="modelValue === type.value ? 'bg-background shadow-sm' : 'hover:bg-text/10'"
        >
            <span class="material-icons text-lg">{{ type.icon }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ViewToggle',
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            viewTypes: [
                { value: 'grid', icon: 'grid_view' },
                { value: 'list', icon: 'view_list' }
            ]
        }
    }
}
</script>