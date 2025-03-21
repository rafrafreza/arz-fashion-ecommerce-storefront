<template>
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <!-- Pricing Section -->
        <div class="flex items-baseline gap-3">
            <h2 class="text-2xl text-text font-semibold">
                ₹{{ discountedPrice }}
            </h2>
            <div class="flex items-center gap-2">
                <span class="text-lg text-text/50 line-through">₹{{ price }}</span>
                <span class="text-sm text-accent font-semibold">
                    {{ discount }}% OFF
                </span>
            </div>
        </div>

        <!-- Rating Section -->
        <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
                <span class="material-icons text-secondary text-lg">star</span>
                <span class="font-medium">{{ rating.toFixed(1) }}</span>
            </div>
            <span class="text-xl">|</span>
            <router-link 
                to="#reviews"
                class="font-medium hover:text-text transition-colors">
                {{ reviewText }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductPricing',
    props: {
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            validator: value => value >= 0 && value <= 5
        },
        reviews: {
            type: Number,
            required: true,
            default: 0
        }
    },
    computed: {
        discountedPrice() {
            return Math.round(this.price * (1 - this.discount / 100))
        },
        reviewText() {
            return `${this.reviews} ${this.reviews === 1 ? 'review' : 'reviews'}`
        }
    }
}
</script>