<template>
    <div class="border-t border-text/10 py-6">
        <!-- Reviews Header -->
        <h2 class="text-lg font-medium mb-6">Product Reviews</h2>
        <div class="flex flex-col md:grid md:grid-cols-3 gap-8">
            <!-- Rating Summary -->
            <div class="flex-col">
                <div class="flex flex-col items-center gap-4">
                    <h2 class="text-4xl font-medium">{{ rating.toFixed(1) }}</h2>
                    <div class="flex flex-col">
                        <div class="flex items-center">
                            <span v-for="i in 5" :key="i" class="material-icons text-secondary scale-75"
                                :class="i <= Math.round(rating) ? '' : 'text-text/20'">
                                star
                            </span>
                        </div>
                        <p class="text-sm text-text/50 mt-1 text-center">
                            {{ reviews.length }} ratings
                        </p>
                    </div>
                    <button @click="$emit('rate')"
                        class="px-6 py-1 border-2 border-secondary text-secondary hover:bg-secondary/5 font-medium">
                        RATE
                    </button>
                </div>
            </div>
            <!-- Rating Distribution -->
            <div class="col-span-2 flex flex-col justify-around">
                <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3">
                    <span class="w-12 text-sm font-medium">{{ star }} star</span>
                    <div class="flex-1 h-2 bg-text/10 rounded-full overflow-hidden">
                        <div class="h-full bg-secondary" :style="{ width: `${getStarPercentage(star)}%` }">
                        </div>
                    </div>
                    <span class="text-sm text-text/50 font-medium">
                        ({{ getStarCount(star) }})
                    </span>
                </div>
            </div>
        </div>

        <!-- Reviews List -->
        <div class="mt-8 space-y-6">
            <h3 class="font-semibold">Here's What Our Customers say ({{ reviews.length }})</h3>
            <div v-for="(review, index) in visibleReviews" :key="index"
                class="ml-2 border-b border-text/10 pb-6 last:border-0">
                <div class="flex justify-between items-start">
                    <div class="flex flex-col gap-2">
                        <!-- Stars Rating -->
                        <div class="flex">
                            <span v-for="i in 5" :key="i" class="material-icons text-sm text-secondary"
                                :class="i <= review.rating ? '' : 'text-text/20'">
                                star
                            </span>
                        </div>
                        <!-- Customer Name -->
                        <h4 class="font-medium">{{ review.name }}</h4>
                        <!-- Review Text -->
                        <p class="text-text/70">{{ review.text }}</p>
                    </div>
                    <!-- Date -->
                    <span class="text-sm text-text/50">
                        {{ new Date(review.date).toLocaleDateString() }}
                    </span>
                </div>
            </div>
        </div>

        <!-- View All Button -->
        <button v-if="hasMoreReviews" @click="showAllReviews = !showAllReviews"
            class="mt-6 w-full py-3 border border-secondary text-secondary hover:bg-secondary/10 font-medium">
            {{ showAllReviews ? 'Show Less' : `View All Reviews (${reviews.length})` }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProductReviews',
    props: {
        reviews: {
            type: Array,
            required: true,
            validator: value => value.every(review =>
                'rating' in review &&
                'text' in review &&
                'date' in review &&
                'name' in review
            )
        },
        rating: {
            type: Number,
            required: true,
            validator: value => value >= 0 && value <= 5
        }
    },
    data() {
        return {
            showAllReviews: false
        }
    },
    computed: {
        visibleReviews() {
            return this.showAllReviews ? this.reviews : this.reviews.slice(0, 3);
        },
        hasMoreReviews() {
            return this.reviews.length > 3;
        }
    },
    methods: {
        getStarCount(stars) {
            return this.reviews.filter(review => Math.round(review.rating) === stars).length
        },
        getStarPercentage(stars) {
            const count = this.getStarCount(stars)
            return this.reviews.length ? (count / this.reviews.length) * 100 : 0
        }
    },
    emits: ['rate']
}
</script>