<template>
    <main class="mt-28 md:mt-40 mb-24">
        <div class="flex flex-col gap-16">
            <SubCategoryCarousel :categoryMap="categoryMap" />
            <PosterCarousel />
            <Policies />
            <!-- Updated template section -->
            <template v-for="(item, index) in collections.map((c, i) => [c, categories[i]]).flat().filter(Boolean)">
                <CollectionsCarousel v-if="index % 2 === 0" :key="item.title" :title="item.title"
                    :products="item.products" />
                <CategorySection v-else :key="index" :category="item.category"
                    :subcategories="categoryMap[item.category]" />
            </template>
            <OurStory />
            <BannerCarousel />
            <Marketplaces />
            <FAQ />
            <FeedbackCarousel />
        </div>
    </main>
</template>

<script>
import SubCategoryCarousel from '@/components/carousels/SubCategoryCarousel.vue';
import PosterCarousel from '@/components/carousels/PosterCarousel.vue';
import CollectionsCarousel from '@/components/carousels/CollectionsCarousel.vue';
import CategorySection from '@/components/home/CategorySection.vue';
import BannerCarousel from '@/components/carousels/BannerCarousel.vue';
import Policies from '@/components/home/Policies.vue';
import OurStory from '@/components/home/OurStory.vue';
import Marketplaces from '@/components/home/Marketplaces.vue';
import FAQ from '@/components/home/FAQ.vue';
import FeedbackCarousel from '@/components/carousels/FeedbackCarousel.vue';
import { getdefaultImage } from '@/utils';

export default {
    name: 'Home',
    components: {
        SubCategoryCarousel,
        PosterCarousel,
        CollectionsCarousel,
        CategorySection,
        BannerCarousel,
        Policies,
        OurStory,
        Marketplaces,
        FAQ,
        FeedbackCarousel
    },
    data() {
        const generateProducts = (count, category) => {
            return Array(count).fill().map((_, i) => ({
                sku: `${category.toUpperCase()}-${i + 1}`,
                name: `${category} Product ${i + 1}`,
                category: category,
                description: 'Beautiful product from our latest collection',
                image: getdefaultImage(true, 768, 1024, i + 1),
                price: Math.floor(Math.random() * 4000) + 1000,
                discount: Math.floor(Math.random() * 50) + 10,
                rating: (Math.random() * 4 + 1).toFixed(1),
                colors: ['#000000', '#FFFFFF', '#FF0000'],
                sizes: ['S', 'M', 'L', 'XL'],
                badge: ['New Arrival', 'Trending', 'Best Seller'][Math.floor(Math.random() * 3)],
                maxQuantity: Math.floor(Math.random() * 10) + 5
            }));
        };

        const collections = [
            {
                title: "Latest Collections",
                products: generateProducts(10, 'Latest')
            },
            {
                title: "New Arrival",
                products: generateProducts(10, 'New')
            },
            {
                title: "Best Sellers",
                products: generateProducts(10, 'Best')
            }
        ];

        const categories = [
            { category: "Men" },
            { category: "Women" },
            { category: "Kids" },
            { category: "Accessories" },
            { category: "Plus Size" },
        ];

        const categoryMap = {
            'Men': [
                'Shirts', 'Trousers', 'Jackets', 'Suits', 'Ties', 'Belts', 'Shoes', 'Hats', 'Gloves'
            ],
            'Women': [
                'Dresses', 'Tops', 'Skirts', 'Pants', 'Jackets', 'Coats', 'Scarves', 'Hats', 'Gloves'
            ],
            'Kids': [
                'Boys T-shirts', 'Girls Dresses', 'Boys Shorts', 'Girls Skirts', 'Kids Shoes', 'Socks', 'Hats', 'Scarves'
            ],
            'Accessories': [
                'Watches', 'Perfumes', 'Belts', 'Wallets', 'Socks', 'Shoes', 'Hats', 'Scarves', 'Gloves', 'Jewelry'
            ],
            'Plus Size': [
                'Plus Size Dresses', 'Plus Size Tops', 'Plus Size Pants', 'Plus Size Skirts', 'Plus Size Jackets', 'Plus Size Coats', 'Plus Size Swimwear'
            ]
        };

        return {
            collections,
            categories,
            categoryMap
        };
    }
};
</script>