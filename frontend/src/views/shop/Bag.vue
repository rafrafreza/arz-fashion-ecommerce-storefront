<template>
    <main class="mt-28 md:mt-40 mb-24">
        <div class="px-6 md:px-12 lg:px-24 xl:px-32 py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-screen">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <!-- Empty Bag State -->
            <div v-else-if="!bagItems.length" class="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
                <span class="material-icons text-6xl text-primary/50">shopping_bag</span>
                <h2 class="text-2xl font-medium">Your shopping bag is empty</h2>
                <router-link to="/shop" class="text-primary hover:underline">Continue Shopping</router-link>
            </div>

            <!-- Bag Content -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Products Section -->
                <div class="lg:col-span-2">
                    <!-- Add sticky header -->
                    <div class="sticky top-28 md:top-24 z-30 bg-background py-8 border-b border-text/10">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-medium">Products in Bag ({{ totalQuantity }})</h1>
                            <button v-if="hasChanges" @click="updateBag"
                                class="px-4 py-2 text-sm font-medium text-background bg-primary/90 hover:bg-primary">
                                Update Bag
                            </button>
                        </div>
                    </div>

                    <!-- Add padding to prevent content from jumping under sticky header -->
                    <div class="flex flex-col gap-4 pt-4">
                        <bag-item v-for="item in bagItems" :key="item.sku" :item="item" @update="handleItemUpdate"
                            @remove="handleItemRemove" />
                    </div>
                </div>

                <!-- Checkout Section -->
                <div class="lg:col-span-1">
                    <checkout-section :user="user" :bag-items="bagItems" :has-cod-restriction="hasCodRestriction"
                        :has-unsaved-changes="hasChanges" :is-logged-in="isLoggedIn" @place-order="handlePlaceOrder" />
                </div>
            </div>

            <!-- OTP Verification Modal -->
            <otp-modal v-if="showOtpModal" :phone="user.phone" @verify="handleOtpVerify"
                @close="showOtpModal = false" />

            <!-- Order Success Modal -->
            <order-success-modal v-if="showSuccessModal" :delivery-time="estimatedDeliveryTime"
                :order-id="generatedOrderId" @close="handleOrderComplete" />
        </div>
    </main>
</template>

<script>
import { getdefaultImage } from '@/utils';
import BagItem from '@/components/shop/bag/BagItem.vue';
import CheckoutSection from '@/components/shop/bag/CheckoutSection.vue';
import OtpModal from '@/components/shop/bag/OtpModal.vue';
import OrderSuccessModal from '@/components/shop/bag/OrderSuccessModal.vue';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Bag',
    components: {
        BagItem,
        CheckoutSection,
        OtpModal,
        OrderSuccessModal
    },
    data() {
        return {
            loading: true,
            bagItems: [],
            hasChanges: false,
            showOtpModal: false,
            showSuccessModal: false,
            selectedPaymentMethod: null,
            user: {
                name: 'John Doe',
                phone: '9876543210',
                address: '123, Street Name, City, State - 123456'
            },
            isLoggedIn: false,
            generatedOrderId: null
        }
    },
    computed: {
        ...mapState('bag', ['items']),
        ...mapGetters('bag', ['totalItems']),
        hasCodRestriction() {
            return this.bagItems.some(item => !item.codAvailable);
        },
        estimatedDeliveryTime() {
            const deliveryTimes = this.bagItems.map(item => item.deliveryTime);
            return {
                max: deliveryTimes.length ? Math.max(...deliveryTimes) : 7
            };
        },
        totalQuantity() {
            return this.bagItems.reduce((total, item) => total + (item.quantity || 0), 0);
        }
    },
    methods: {
        async fetchBagItems() {
            try {
                const storeItems = this.items || [];

                this.bagItems = storeItems.map(item => ({
                    ...item,
                    name: 'Product Name',
                    category: 'Category',
                    colors: ["#000000", "#ff0000", item.color, "#00ff00", "#0000ff"],
                    sizes: ['S', 'M', 'L', 'XL', item.size],
                    price: 999,
                    image: getdefaultImage(true, 768, 1024, 1),
                    deliveryTime: Math.floor(Math.random() * 5) + 3, // Random 3-7 days
                    codAvailable: Math.random() > 0.3 // 70% chance of COD availability
                }));
            } catch (error) {
                console.error('Error fetching bag items:', error);
                this.bagItems = [];
            } finally {
                this.loading = false;
            }
        },
        handleItemUpdate(updatedItem) {
            const index = this.bagItems.findIndex(item => item.sku === updatedItem.sku);
            if (index !== -1) {
                this.bagItems[index] = updatedItem;
                this.hasChanges = true;
            }
        },
        handleItemRemove(itemId) {
            const itemToRemove = this.bagItems.find(item => item.sku === itemId);
            if (itemToRemove) {
                this.$store.commit('bag/removeFromBag', itemToRemove.sku);
                this.bagItems = this.bagItems.filter(item => item.sku !== itemId);
                this.hasChanges = true;
            }
        },
        async updateBag() {
            try {
                this.bagItems.forEach(item => {
                    this.$store.commit('bag/addToBag', {
                        sku: item.sku,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    });
                });
                this.hasChanges = false;
            } catch (error) {
                console.error('Error updating bag:', error);
            }
        },
        async handlePlaceOrder(paymentMethod) {
            this.selectedPaymentMethod = paymentMethod;
            if (paymentMethod === 'cod') {
                this.showOtpModal = true;
            } else {
                this.generatedOrderId = 'ARZ' + Date.now().toString().slice(-8);
                this.showSuccessModal = true;
            }
            this.handleOrderComplete();
        },
        async handleOtpVerify(otp) {
            this.generatedOrderId = 'ARZ' + Date.now().toString().slice(-8);
            this.showOtpModal = false;
            this.showSuccessModal = true;
        },
        handleOrderComplete() {
            this.bagItems = [];
            this.$store.commit('bag/clearBag');
        },
        checkLoginStatus() {
            const token = localStorage.getItem('accessToken');
            const name = localStorage.getItem('name');
            this.isLoggedIn = !!token;
            if (this.isLoggedIn) {
                this.user.name = name || 'User';
            }
        }
    },
    created() {
        this.$store.commit('bag/initializeBag');
        this.fetchBagItems();
        this.checkLoginStatus();
    },
    mounted() {
        window.addEventListener('storage', this.checkLoginStatus);
    },
    beforeUnmount() {
        window.removeEventListener('storage', this.checkLoginStatus);
    }
}
</script>