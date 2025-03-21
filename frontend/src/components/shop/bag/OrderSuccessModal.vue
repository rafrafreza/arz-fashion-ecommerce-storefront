<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-background p-6 w-96 text-center">
            <span class="material-icons text-6xl text-primary mb-4">check_circle</span>
            <h3 class="text-xl font-medium mb-2">Order Placed Successfully!</h3>

            <!-- Order ID -->
            <p class="text-sm font-medium mb-4">
                Order ID: <span class="text-primary">{{ orderId }}</span>
            </p>

            <p class="mb-4">
                Estimated delivery in {{ deliveryTime.max }} business days
            </p>
            <p class="text-sm text-text/70 mb-6">
                To cancel your order, please contact support
            </p>

            <!-- Action Buttons -->
            <div class="flex gap-4 justify-center">
                <button @click="$router.push('/orders')"
                    class="px-4 py-2 text-secondary border border-secondary hover:bg-secondary/10">
                    Track Order
                </button>
                <button @click="$router.push('/')" class="px-4 py-2 text-background bg-secondary/90 hover:bg-secondary">
                    Shop More
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deliveryTime: {
            type: Object,
            required: true
        },
        orderId: {
            type: String,
            required: true
        }
    }
}
</script>