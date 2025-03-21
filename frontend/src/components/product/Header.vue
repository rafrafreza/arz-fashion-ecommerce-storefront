<template>
    <div class="mb-8">
        <!-- Product Name and Share Button -->
        <div class="flex justify-between items-start gap-4 mb-2">
            <div>
                <div class="flex gap-8">
                    <h1 class="text-2xl md:text-3xl font-semibold">{{ product.name }}</h1>
                    <div v-if="product.badge"
                        class="hidden md:block px-4 py-2 bg-secondary/10 text-secondary font-medium">
                        {{ product.badge }}
                    </div>
                </div>
                <p class="text-sm text-text/50 mt-1">{{ product.sku }}</p>
            </div>

            <button @click="$emit('share')" class="p-2 hover:bg-text/5 transition-colors flex items-center"
                title="Share product">
                <span class="material-icons">share</span>
            </button>
        </div>

        <!-- Description -->
        <p class="text-text leading-relaxed flex-1">{{ product.description }}</p>

        <!-- Mobile Badge -->
        <div v-if="product.badge"
            class="md:hidden mt-4 px-4 py-2 bg-secondary/10 text-secondary font-medium rounded w-fit">
            {{ product.badge }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductHeader',
    props: {
        product: {
            type: Object,
            required: true,
            validator: prop => {
                return ['name', 'sku', 'description'].every(key => key in prop)
            }
        }
    },
    emits: ['share']
}
</script>