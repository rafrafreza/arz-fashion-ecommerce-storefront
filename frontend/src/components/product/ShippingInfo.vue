<template>
    <div class="border-t border-text/10 py-6">
        <!-- Section Header -->
        <button @click="isOpen = !isOpen" class="w-full flex items-center justify-between py-2 group">
            <h2 class="text-lg font-medium group-hover:text-secondary transition-colors">
                Shipping & Returns
            </h2>
            <span class="material-icons transition-transform" :class="isOpen ? 'rotate-180' : ''">
                expand_more
            </span>
        </button>

        <!-- Info Content -->
        <div v-show="isOpen" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="bg-secondary/5 p-4">
                <div class="flex items-start gap-4">
                    <span class="material-icons text-secondary">local_shipping</span>
                    <div>
                        <h3 class="font-medium">{{ info.title }}</h3>
                        <p class="text-sm text-text/70 mt-1">{{ info.subtitle }}</p>
                    </div>
                </div>
            </div>

            <!-- Return Policy -->
            <div class="bg-secondary/5 p-4">
                <div class="flex items-start gap-4">
                    <span class="material-icons text-secondary">assignment_return</span>
                    <div>
                        <h3 class="font-medium">Easy Returns</h3>
                        <p class="text-sm text-text/70 mt-1">
                            Return or exchange within 30 days of delivery
                        </p>
                        <router-link to="/return-policy"
                            class="text-sm text-secondary hover:underline inline-block mt-3">
                            View Return Policy
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <p v-if="!info && isOpen" class="text-text/50 mt-4">
            Shipping information unavailable
        </p>
    </div>
</template>

<script>
export default {
    name: 'ShippingInfo',
    props: {
        info: {
            type: Object,
            required: true,
            validator: (value) => {
                return ['title', 'subtitle', 'description'].every(key => key in value)
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