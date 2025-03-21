<template>
    <main class="mt-28 md:mt-40 mb-24">
        <div class="px-6 md:px-12 lg:px-24 xl:px-32 py-6">
            <!-- Breadcrumb -->
            <nav class="flex items-center text-sm mb-8">
                <router-link to="/" class="font-medium text-text hover:text-secondary">Home</router-link>
                <span class="material-icons scale-75">navigate_next</span>
                <router-link :to="`/category/${product.category}`"
                    class="font-medium text-text hover:text-secondary capitalize">
                    {{ product.category }}
                </router-link>
                <span class="material-icons scale-75">navigate_next</span>
                <router-link :to="`/category/${product.category}?subcategory=${product.subcategory}`"
                    class="font-medium text-text hover:text-secondary capitalize">
                    {{ product.subcategory }}
                </router-link>
                <span class="material-icons scale-75">navigate_next</span>
                <span class="font-medium text-text/50">{{ product.name }}</span>
            </nav>

            <div class="flex flex-col lg:grid grid-cols-9 gap-8">
                <!-- Product Images -->
                <ProductImages :images="product.images" class="col-span-4 w-full h-fit lg:sticky lg:top-40" />

                <!-- Product Details -->
                <div class="w-full col-span-5">
                    <ProductHeader :product="product" @share="shareProduct" />

                    <ProductPricing :price="product.price" :discount="product.discount" :rating="product.rating"
                        :reviews="product.reviews.length" />

                    <ProductOptions :sizes="sizes" :colors="colors" :maxQuantity="currentMaxQuantity"
                        v-model:selectedSize="selectedSize" v-model:selectedColor="selectedColor"
                        v-model:quantity="quantity" @addToBag="addToBag" @buyNow="buyNow" />

                    <ProductHighlights :highlights="product.highlights" />

                    <ShippingInfo :info="product.shipping" />

                    <ProductReviews :reviews="product.reviews" :rating="product.rating" />
                </div>
            </div>
        </div>

        <!-- Share Modal -->
        <ShareModal v-if="showShareModal" :product="product" @close="showShareModal = false" />
    </main>
</template>

<script>
import ProductImages from '@/components/product/Images.vue'
import ProductHeader from '@/components/product/Header.vue'
import ProductPricing from '@/components/product/Pricing.vue'
import ProductOptions from '@/components/product/Options.vue'
import ProductHighlights from '@/components/product/Highlights.vue'
import ShippingInfo from '@/components/product/ShippingInfo.vue'
import ProductReviews from '@/components/product/Reviews.vue'
import ShareModal from '@/components/product/ShareModal.vue'
import { getdefaultImages } from '@/utils'
import { mapGetters } from 'vuex';

export default {
    name: 'Product',
    components: {
        ProductImages,
        ProductHeader,
        ProductPricing,
        ProductOptions,
        ProductHighlights,
        ShippingInfo,
        ProductReviews,
        ShareModal
    },
    props: {
        sku: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            product: null,
            selectedSize: null,
            selectedColor: null,
            quantity: 1,
            showShareModal: false
        }
    },
    created() {
        this.fetchProduct();
        this.$nextTick(() => {
            if (this.sizes.length) {
                this.selectedSize = this.sizes[0];
                if (this.colors.length) {
                    this.selectedColor = this.colors[0].code;
                }
            }
        });
    },
    computed: {
        ...mapGetters('bag', ['getQuantity']),
        sizes() {
            return this.product?.variants.map(variant => variant.size) || [];
        },
        colors() {
            if (!this.selectedSize) return [];
            const variant = this.product?.variants.find(v => v.size === this.selectedSize);
            return variant?.colors || [];
        },
        currentMaxQuantity() {
            if (!this.selectedSize || !this.selectedColor) return 0;
            const variant = this.product?.variants.find(v => v.size === this.selectedSize);
            const color = variant?.colors.find(c => c.code === this.selectedColor);
            return color?.maxQuantity || 0;
        },
        bagQuantity() {
            return this.getQuantity(
                this.product.sku,
                this.selectedSize,
                this.selectedColor
            );
        }
    },
    methods: {
        fetchProduct() {
            this.product = {
                sku: this.sku,
                name: 'Product Name',
                category: this.$route.params.category,
                subcategory: 'thobes',
                description: 'Product description',
                images: getdefaultImages(5, true, 768, 1024, 1),
                variants: [
                    {
                        size: '48',
                        colors: [
                            { code: '#000000', maxQuantity: 5 },
                            { code: '#FFFFFF', maxQuantity: 8 },
                            { code: '#0000FF', maxQuantity: 3 }
                        ]
                    },
                    {
                        size: '50',
                        colors: [
                            { code: '#000000', maxQuantity: 10 },
                            { code: '#FFFFFF', maxQuantity: 0 },
                            { code: '#0000FF', maxQuantity: 6 }
                        ]
                    },
                    {
                        size: '52',
                        colors: [
                            { code: '#000000', maxQuantity: 4 },
                            { code: '#FFFFFF', maxQuantity: 7 },
                            { code: '#0000FF', maxQuantity: 2 }
                        ]
                    },
                    {
                        size: '54',
                        colors: [
                            { code: '#000000', maxQuantity: 3 },
                            { code: '#FFFFFF', maxQuantity: 5 },
                            { code: '#0000FF', maxQuantity: 0 }
                        ]
                    }
                ],
                price: 2999,
                discount: 20,
                rating: 4.5,
                badge: 'New Arrival',
                highlights: [
                    { title: 'Design', subtitle: 'Modern Islamic design' },
                    { title: 'Material', subtitle: 'Premium cotton' }
                ],
                shipping: {
                    title: 'Free Shipping',
                    subtitle: '3-5 business days',
                    description: 'Free returns within 30 days'
                },
                reviews: [
                    {
                        name: 'Ahmed S.',
                        rating: 5,
                        text: 'Excellent quality thobe, perfect fit and very comfortable. Highly recommend!',
                        date: '2024-03-20'
                    },
                    {
                        name: 'Mohammad R.',
                        rating: 4,
                        text: 'Good material and stitching. Delivery was quick but sizing runs slightly large.',
                        date: '2024-03-15'
                    },
                    {
                        name: 'Abdullah K.',
                        rating: 5,
                        text: 'Beautiful design and great attention to detail. Worth every penny.',
                        date: '2024-03-10'
                    },
                    {
                        name: 'Omar H.',
                        rating: 3,
                        text: 'Decent product but the color was slightly different from what was shown online.',
                        date: '2024-03-05'
                    },
                    {
                        name: 'Yusuf M.',
                        rating: 2,
                        text: 'Amazing customer service and the quality exceeded my expectations!',
                        date: '2024-02-28'
                    }
                ]
            }
        },
        shareProduct() {
            this.showShareModal = true
        },
        addToBag() {
            if (!this.selectedSize || !this.selectedColor) {
                return;
            }

            this.$store.commit('bag/addToBag', {
                sku: this.product.sku,
                quantity: this.quantity,
                size: this.selectedSize,
                color: this.selectedColor,
            });
        },
        buyNow() {
            if (!this.selectedSize || !this.selectedColor) {
                return;
            }

            this.addToBag();
            this.$router.push('/bag');
        }
    }
}
</script>