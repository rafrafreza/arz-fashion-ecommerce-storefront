<template>
    <div class="sticky top-24 flex flex-col gap-6 p-6 border border-text/10">
        <!-- User Details Section -->
        <div class="flex flex-col gap-2">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold">Delivery Details</h3>
            </div>

            <!-- Show Login Button if user is not logged in -->
            <div v-if="!isLoggedIn" class="flex flex-col gap-4 items-center py-4">
                <p class="text-text/70">Please login to continue with your purchase</p>
                <button @click="handleLogin" class="px-6 py-2 bg-secondary text-background hover:bg-secondary/90">
                    Login to Continue
                </button>
            </div>

            <!-- Show User Details if logged in -->
            <template v-else>
                <p class="font-semibold">{{ user.name }}</p>
                <p>+91 {{ user.phone }}</p>
                <p class="text-sm">{{ user.address }}</p>
            </template>
        </div>

        <!-- Delivery Time -->
        <div class="flex flex-col gap-2">
            <h3 class="text-lg font-semibold">Estimated Delivery</h3>
            <p>{{ deliveryTimeText }}</p>
        </div>

        <!-- Apply Coupon -->
        <div class="flex flex-col gap-2 border border-text/10 p-4">
            <h3 class="text-lg font-semibold text-secondary">Apply Coupon</h3>
            <!-- Updated flex container for input and button -->
            <div class="flex flex-col 2xl:flex-row gap-2">
                <input type="text" v-model="couponCode" placeholder="Enter coupon code"
                    class="w-full px-3 py-2 border border-text/10 bg-transparent focus:outline-none focus:border-secondary/80 uppercase">
                <button @click="applyCoupon" :disabled="!couponCode"
                    class="w-full sm:w-auto px-4 py-2 bg-secondary/90 hover:bg-secondary font-medium text-background disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                    Apply
                </button>
            </div>
            <!-- Status Messages -->
            <p v-if="couponError" class="text-secondary font-semibold text-sm">
                {{ couponError }}
            </p>
            <p v-if="appliedCoupon" class="text-accent font-semibold text-sm">
                Coupon applied successfully! You save ₹{{ discountAmount }}
            </p>
        </div>

        <!-- Order Summary -->
        <div class="flex flex-col gap-2">
            <h3 class="text-lg font-semibold">Order Summary</h3>
            <div class="flex justify-between text-sm">
                <span>Subtotal</span>
                <span class="font-semibold">₹{{ subtotal }}</span>
            </div>
            <div v-if="appliedCoupon" class="flex justify-between text-accent">
                <span class="font-semibold">{{ appliedCoupon.code }} Discount</span>
                <span class="font-semibold">-₹{{ discountAmount }}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span>Delivery Charges</span>
                <span class="font-semibold">₹{{ deliveryCharges }}</span>
            </div>
            <div class="flex justify-between mt-2 text-lg border-t pt-2">
                <span class="font-medium">Total</span>
                <span class="font-medium">₹{{ total }}</span>
            </div>
        </div>

        <!-- Payment Method -->
        <div class="flex flex-col gap-2">
            <h3 class="text-lg font-medium">Payment Method</h3>
            <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2">
                    <input type="radio" v-model="paymentMethod" value="cod" :disabled="hasCodRestriction">
                    Cash on Delivery
                </label>
                <p v-if="hasCodRestriction" class="text-sm text-secondary">
                    Some products don't support Cash on Delivery
                </p>
                <label class="flex items-center gap-2">
                    <input type="radio" v-model="paymentMethod" value="razorpay">
                    Pay Online (Razorpay)
                </label>
            </div>
        </div>

        <!-- Place Order Button -->
        <button @click="placeOrder" :disabled="!paymentMethod || hasUnsavedChanges || !isLoggedIn"
            class="w-full px-4 py-2 text-background bg-secondary/90 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed">
            {{ getButtonText }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        bagItems: {
            type: Array,
            required: true
        },
        hasCodRestriction: {
            type: Boolean,
            default: false
        },
        hasUnsavedChanges: {
            type: Boolean,
            default: false
        },
        isLoggedIn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            paymentMethod: this.hasCodRestriction ? 'razorpay' : null,
            couponCode: '',
            couponError: null,
            appliedCoupon: null,
            availableCoupons: {
                'FLAT10': { discount: 10, type: 'percentage' },
                'FLAT20': { discount: 20, type: 'percentage' },
                'FLAT50': { discount: 50, type: 'percentage' },
                'SAVE100': { discount: 100, type: 'fixed' }
            }
        }
    },
    computed: {
        subtotal() {
            return this.bagItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        deliveryCharges() {
            return this.subtotal > 999 ? 0 : 99;
        },
        discountAmount() {
            if (!this.appliedCoupon) return 0;

            if (this.appliedCoupon.type === 'percentage') {
                return (this.subtotal * this.appliedCoupon.discount) / 100;
            }
            return this.appliedCoupon.discount;
        },
        total() {
            return this.subtotal - this.discountAmount + this.deliveryCharges;
        },
        deliveryTimeText() {
            const deliveryTimes = this.bagItems.map(item => item.deliveryTime);
            const max = Math.max(...deliveryTimes);
            return `${max} business days`;
        },
        getButtonText() {
            if (!this.isLoggedIn) return 'Login to Place Order'
            if (this.hasUnsavedChanges) return 'Update Bag to Continue'
            return 'Place Order'
        }
    },
    methods: {
        placeOrder() {
            this.$emit('place-order', this.paymentMethod);
        },
        applyCoupon() {
            this.couponError = null;
            this.appliedCoupon = null;

            const coupon = this.availableCoupons[this.couponCode.toUpperCase()];

            if (!coupon) {
                this.couponError = 'Invalid coupon code';
                return;
            }

            this.appliedCoupon = {
                ...coupon,
                code: this.couponCode.toUpperCase()
            };
        },
        handleLogin() {
            this.$router.push('/login')
        }
    }
}
</script>