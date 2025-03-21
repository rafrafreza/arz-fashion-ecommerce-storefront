<template>
    <section :id="category.toLowerCase() + '-category'" class="w-full flex flex-col gap-6 bg-primary/5 pt-6 relative"
        :class="{ 'mb-24': isMobileView }">
        <h3 class="self-center text-3xl text-text font-medium">{{ category }}'s Category</h3>
        <div v-if="isMobileView" class="collections-carousel overflow-x-auto pb-6">
            <div class="grid grid-flow-col grid-rows-2 gap-3 px-4 w-max">
                <div v-for="(subcat, index) in subcategories" :key="index" class="group relative">
                    <a :href="`/category/${category.toLowerCase()}?subcategory=${subcat.toLowerCase()}`"
                        :title="subcat">
                        <img :src="getSubcategoryImage(index)" alt="image"
                            class="block h-80 md:h-[30rem] object-cover transition-all duration-300 ease-in-out rounded-2xl" />
                        <span
                            class="absolute bottom-4 transition-all w-full text-center text-background text-lg font-medium select-none">
                            {{ subcat }}
                        </span>
                    </a>
                </div>
            </div>
            <button class="absolute w-screen mt-6">
                <a :href="`/category/${category.toLowerCase()}`"
                    class="block w-screen p-4 flex flex-row justify-center items-center gap-2 text-primary hover:text-text bg-primary/5 hover:bg-primary/30 transition-all duration-300 ease-in-out active:bg-primary/30 active:text-text group">
                    <span class="text-2xl font-medium select-none">View All</span>
                    <span
                        class="material-icons-outlined scale-105 text-primary group-hover:text-text group-hover:translate-x-2 transition-all duration-300 ease-in-out">arrow_forward</span>
                </a>
            </button>
        </div>
        <div v-else class="flex flex-col gap-y-4">
            <div v-for="prodList in desktopProducts" class="w-full grid" :style="{ gridTemplateColumns: `repeat(${rowItems}, 1fr)` }">
                <div v-for="(prod, index) in prodList" :key="index" class="block relative group overflow-hidden"
                    :style="{ gridColumn: prod.empty ? `span ${rowItems - index}` : 'span 1' }">
                    <div v-if="prod.empty" class="w-full h-full">
                        <a :href="`/category/${category.toLowerCase()}`"
                            class="w-full h-full flex justify-center items-center gap-2 py-12 hover:bg-primary/30 transition-all duration-300 ease-in-out group">
                            <span class="text-3xl font-medium select-none">View All</span>
                            <span
                                class="material-icons-outlined scale-125 group-hover:translate-x-4 transition-all duration-300 ease-in-out">arrow_forward</span>
                        </a>
                    </div>
                    <a v-else :href="`/category/${category.toLowerCase()}?subcategory=${prod.name.toLowerCase()}`"
                        class="w-full h-full block relative">
                        <img :src="prod.image" :alt="prod.name"
                            class="block object-fill group-hover:scale-105 transition-all duration-300 ease-in-out" />
                        <span
                            class="absolute bottom-10 transition-all w-full pl-8 text-background text-3xl font-bold select-none">
                            {{ prod.name }}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import 'material-icons/iconfont/material-icons.css';
import { getdefaultImage } from '@/utils';

export default {
    props: {
        category: {
            type: String,
            required: true
        },
        subcategories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            rowItems: 5,
            desktopProducts: []
        }
    },
    created() {
        this.desktopProducts = this.restructureProducts(
            this.subcategories.map((name, index) => ({
                name,
                image: getdefaultImage(true, 768, 1024, index)
            }))
        );
    },
    methods: {
        getSubcategoryImage(index) {
            return getdefaultImage(true, 768, 1024, index);
        },
        shouldShowViewAll(products, index) {
            const remainingItems = products.length - (index + 1);
            return remainingItems === 0 || (remainingItems < 6 && remainingItems >= 2);
        },
        restructureProducts(products) {
            const restructuredProducts = [];
            const totalProducts = products.length;

            if (totalProducts <= this.rowItems) {
                restructuredProducts.push(products);
                restructuredProducts.push([{ empty: true }]);
                return restructuredProducts;
            }

            const totalRows = Math.ceil(totalProducts / this.rowItems);
            let start = 0;

            for (let i = 0; i < totalRows; i++) {
                const row = products.slice(start, start + this.rowItems);

                if (row.length < this.rowItems) {
                    const emptyCells = this.rowItems - row.length;
                    const emptyCellsArray = Array.from({ length: emptyCells }, () => ({ empty: true }));
                    row.push(...emptyCellsArray);
                }
                restructuredProducts.push(row);
                start += this.rowItems;
            }

            const lastRow = restructuredProducts[restructuredProducts.length - 1];
            const firstEmptyIndex = lastRow.findIndex((item) => item.empty);
            restructuredProducts[restructuredProducts.length - 1] = lastRow.slice(0, firstEmptyIndex + 1);

            return restructuredProducts;
        },
        handleResize() {
            this.$forceUpdate();
        }
    },
    computed: {
        isMobileView() {
            return window.innerWidth < 1024;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style scoped>
.collections-carousel {
    scrollbar-width: none;
}
</style>