<template>
    <header class="fixed top-0 left-0 w-full z-40  duration-300 shadow-sm bg-background"
        :class="{ 'border-b shadow-lg': scrolled }">
        <div class="overflow-hidden w-full py-1.5 bg-primary text-white font-sans text-sm font-bold flex gap-36"
            :class="{ 'md:hidden': scrolled }">
            <div class="marquee-content">{{ marqueeText }}</div>
            <div class="marquee-content">{{ marqueeText }}</div>
            <div class="marquee-content">{{ marqueeText }}</div>
            <div class="marquee-content">{{ marqueeText }}</div>

        </div>

        <nav class="w-full px-6 md:px-12 lg:px-24 xl:px-32 flex items-center justify-between  duration-300"
            :class="{ 'h-24 md:h-20': scrolled, 'h-24': !scrolled }">
            <!-- Left section -->
            <div class="flex items-center space-x-4 md:space-x-12">
                <!-- Hamburger Button -->
                <button @click="toggleMenu"
                    class="w-9 h-7 flex flex-col justify-around items-center outline-none opacity-80 hover:opacity-100">
                    <span class="w-full h-0.5 bg-text rounded-sm  duration-300"
                        :class="{ 'rotate-45 translate-y-[9px]': isMenuOpen }"></span>
                    <span class="w-full h-0.5 bg-text rounded-sm  duration-300"
                        :class="{ 'opacity-0': isMenuOpen }"></span>
                    <span class="w-full h-0.5 bg-text rounded-sm  duration-300"
                        :class="{ '-rotate-45 -translate-y-[9px]': isMenuOpen }"></span>
                </button>
                <button
                    class="px-2 md:px-4 py-1 rounded-sm bg-secondary text-background font-semibold tracking-wider 
           text-xs md:text-base transition-all duration-500 ease-in-out hover:scale-105 active:scale-105 hover:shadow-md active:shadow-md hidden sm:flex">
                    SALE
                </button>
            </div>

            <!-- Center section -->
            <a href="/" class="flex flex-col items-center  duration-300">
                <div class="flex flex-col items-center" :class="{ 'fade': scrolled, 'show': !scrolled }">
                    <h1 class="text-3xl sm:text-4xl font leading-8 tracking-tighter"><span
                            class="font-medium">ARZ</span> fashion</h1>
                    <span
                        class="text-sm scale-90 sm:scale-100 leading-3 tracking-widest font-medium text-secondary">fabric
                        to fashion</span>
                </div>
                <img src="/ARZ_logo.png" alt="ARZ Fashion" class="absolute -translate-y-100 opacity-0 w-20 sm:w-24"
                    :class="{ 'show': scrolled, 'fade': !scrolled }">
            </a>

            <!-- Right section -->
            <div class="flex items-center gap-4 sm:gap-6">
                <div class="relative top-1">
                    <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search..."
                        class="absolute top-12 md:-top-2 -right-2 pl-8 pr-4 py-2 rounded-md focus:outline-none bg-text/5 focus:bg-text/10 duration-300"
                        :class="{ 'w-0 opacity-0': !isSearchExpanded, 'w-72 opacity-100': isSearchExpanded }">
                    <button @click="toggleSearch" class="transform outline-none">
                        <span class="material-icons scale-125">search</span>
                    </button>

                    <!-- Search Results Dropdown -->
                    <div v-if="isSearchDropdownVisible && searchResults.length > 0"
                        class="absolute top-full mt-2 -right-2 w-72 bg-white shadow-lg rounded-b-md overflow-hidden z-50">
                        <div class="max-h-96 overflow-y-auto">
                            <a v-for="(result, index) in searchResults" :key="index" :href="result.url"
                                class="flex justify-between items-center px-4 py-2 hover:bg-primary/10 focus:bg-primary/10 transition-all border-b border-text/10 last:border-0 overflow-hidden group">
                                <div class="flex flex-col">
                                    <span
                                        class="text-text font-medium group-hover:font-semibold group-focus:font-semibold">{{
                                            result.text }}</span>
                                    <span v-if="result.type === 'subcategory'"
                                        class="text-sm text-secondary font-medium">
                                        in {{ result.category }}
                                    </span>
                                </div>
                                <img :src="result.image" :alt="result.text"
                                    class="relative top-5 w-16 h-16 rounded-t-full group-hover:-translate-y-2 group-focus:-translate-y-2 transition-all ">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="relative" v-if="isLoggedIn">
                    <button @click="toggleProfileDropdown" class="flex items-center gap-2 text-secondary">
                        <span class="material-icons scale-125">person</span>
                    </button>
                    <!-- Updated Profile Dropdown -->
                    <div v-if="showProfileDropdown"
                        class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                        <!-- Add bag link for mobile -->
                        <a href="/bag"
                            class="md:hidden block px-4 py-3 text-sm hover:bg-primary/10 focus:bg-primary/10 text-text font-medium relative">
                            <span class="material-icons-outlined align-middle mr-2">shopping_bag</span>
                            Bag
                            <div v-if="bagItemsCount > 0" class="absolute top-2 left-8">
                                <div class="absolute w-5 h-5 bg-secondary rounded-full bag-pulse"></div>
                                <div
                                    class="relative w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                                    <span class="text-xs text-background font-bold">{{ bagItemsCount }}</span>
                                </div>
                            </div>
                        </a>
                        <a href="/account"
                            class="block px-4 py-3 text-sm hover:bg-primary/10 focus:bg-primary/10 text-text font-medium">
                            <span class="material-icons-outlined align-middle mr-2">manage_accounts</span>
                            Account
                        </a>
                        <a href="/orders"
                            class="block px-4 py-3 text-sm hover:bg-primary/10 focus:bg-primary/10 text-text font-medium">
                            <span class="material-icons-outlined align-middle mr-2">shopping_bag</span>
                            Orders
                        </a>
                        <a href="/profile"
                            class="block px-4 py-3 text-sm text-text hover:bg-primary/10 focus:bg-primary/10 font-medium">
                            <span class="material-icons-outlined align-middle mr-2">account_circle</span>
                            Profile
                        </a>
                        <button @click="handleLogout"
                            class="w-full text-left px-4 py-3 text-sm text-secondary bg-secondary/10 hover:bg-secondary/20 focus:bg-secondary/20 font-semibold">
                            <span class="material-icons-outlined align-middle mr-2">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
                <a v-else href="/login" class="text-text font-medium hover:text-text cursor-pointer hidden md:contents">
                    Login
                </a>
                <!-- Update bag visibility -->
                <a href="/bag" class="flex items-center text-inherit hover:text-text relative"
                    :class="{ 'md:flex': isLoggedIn, 'flex': !isLoggedIn }"
                    v-show="!isLoggedIn || (isLoggedIn && !isMobile)">
                    <span class="material-icons-outlined scale-125">shopping_bag</span>
                    <div v-if="bagItemsCount > 0" class="absolute -top-2 -right-2">
                        <div class="absolute w-5 h-5 bg-secondary rounded-full bag-pulse"></div>
                        <div class="relative w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                            <span class="text-xs text-background font-bold">{{ bagItemsCount }}</span>
                        </div>
                    </div>
                </a>
            </div>
        </nav>

        <!-- Category Navbar -->
        <nav class="w-full hidden lg:contents">
            <ul class="flex items-center justify-center space-x-8 xl:space-x-16 border-t py-1">
                <li v-for="(subcategories, category) in categoryMap" :key="category" class="relative"
                    @mouseenter="openDropdown(category)" @mouseleave="startCloseTimer(category)">
                    <router-link :to="{ path: `/category/${category.toLowerCase()}` }"
                        class="text-sm font-medium focus:outline-none transition-all"
                        :class="{ 'font-semibold text-secondary': activeCategory === category, 'text-text': activeCategory != category, 'lg:text-sm': scrolled }">
                        {{ category.toUpperCase() }}
                        <span class="underline-animation"
                            :class="{ 'active text-secondary': activeCategory === category }"></span>
                    </router-link>
                    <transition name="dropdown">
                        <div v-if="activeCategory === category"
                            class="absolute -left-6 px-6 mt-2 w-48 bg-white shadow-lg origin-top">
                            <router-link v-for="subcategory in subcategories" :key="subcategory"
                                :to="{ path: `/category/${category.toLowerCase()}`, query: { subcategory: subcategory.toLowerCase() } }"
                                class="block py-2 text-sm text-text hover:text-secondary hover:underline border-b border-text/30 last:border-0">
                                {{ subcategory }}
                            </router-link>
                        </div>
                    </transition>
                </li>
            </ul>
        </nav>
    </header>
    <!-- Sidebar -->
    <div class="fixed top-0 left-0 h-full w-screen lg:w-[40%] 2xl:w-[30%] grid grid-rows-9 gap-4 bg-background shadow-lg transform duration-300 ease-in-out z-50"
        :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }">
        <!-- X span button & logo with bag -->
        <div
            class="flex items-center justify-between lg:justify-around px-8 md:px-14 2xl:pl-20 py-14 border-b-2 border-text/10 text-text/80">
            <button @click="toggleMenu" class="focus:outline-none">
                <span class="material-icons scale-150">close</span>
            </button>
            <a href="">
                <img src="/ARZ_logo.png" alt="ARZ Fashion" class="w-20">
            </a>
            <a href="/bag" class="flex items-center text-inherit hover:text-text relative">
                <span class="material-icons-outlined scale-125">shopping_bag</span>
                <div v-if="bagItemsCount > 0" class="absolute -top-2 -right-2">
                    <div class="absolute w-5 h-5 bg-secondary rounded-full bag-pulse"></div>
                    <div class="relative w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                        <span class="text-xs text-background font-bold">{{ bagItemsCount }}</span>
                    </div>
                </div>
            </a>
        </div>
        <!-- Search bar -->
        <div class="w-full px-12 mt-2 py-6 grid grid-cols-8 text-xl relative z-0">
            <input type="text" v-model="sidebarSearchQuery" @input="handleSidebarSearch" placeholder="Search..."
                class="col-span-7 pl-8 pr-4 py-1.5 lg:py-2 rounded-l-md focus:outline-none bg-text/5 focus:bg-text/10 duration-300">
            <button
                class="outline-none flex items-center justify-center bg-text/5 hover:bg-text/10 focus:bg-text/10 rounded-r-md">
                <span class="material-icons scale-125">search</span>
            </button>
        </div>
        <!-- Categories -->
        <ul class="row-span-4 w-full px-12 overflow-y-auto">
            <template v-if="sidebarSearchQuery && sidebarSearchResults.length > 0">
                <li v-for="result in sidebarSearchResults" :key="result.name" class="py-2">
                    <a :href="result.url"
                        class="flex justify-between items-center w-full pl-12 pr-2 text-text text-xl md:text-2xl hover:text-text transition-all duration-300 hover:scale-105 hover:font-bold active:scale-105 active:font-bold overflow-hidden rounded-xl"
                        :class="`${result.color}/10`">
                        <div class="flex flex-col">
                            <span>{{ result.name }}</span>
                            <span v-if="result.type === 'subcategory'" class="text-sm text-secondary font-medium">
                                in {{ result.category }}
                            </span>
                        </div>
                        <img :src="result.image" :alt="result.name"
                            class="relative top-5 w-20 md:w-24 h-20 md:h-24 rounded-t-full">
                    </a>
                </li>
            </template>
            <template v-else>
                <li v-for="category in colorCategories" :key="category.name" class="py-2">
                    <a :href="`/category/${category.name.toLowerCase()}`"
                        class="flex justify-between items-center w-full pl-12 pr-2 text-text text-xl md:text-2xl hover:text-text transition-all duration-300 hover:scale-105 hover:font-bold active:scale-105 active:font-bold overflow-hidden rounded-xl"
                        :class="`${category.color}/10`">
                        <span>{{ category.name }}</span>
                        <img :src="`https://picsum.photos/200?random=${category.name}`" :alt="category.name"
                            class="relative top-5 w-20 md:w-24 h-20 md:h-24 rounded-t-full">
                    </a>
                </li>
            </template>
        </ul>
        <div id="refer-and-earn" class="flex flex-col items-center justify-center px-12">
            <button
                class="flex items-center justify-center gap-2 px-6 py-4 bg-secondary/90 text-background rounded-full outline-none hover:scale-105 active:scale-95 hover:shadow-md active:shadow-md hover:bg-secondary active:bg-secondary transition-all">
                <span class="material-icons-outlined">card_giftcard</span>
                <p class="font-semibold text-lg">Refer and Earn</p>
            </button>
        </div>
        <!-- Address & contaact  -->
        <div class="self-start flex flex-col items-center justify-center gap-2 px-12 bg-background/100">
            <address class="text-text not-italic font-medium">123, ARZ fashion, Bihar, India - 100000</address>
            <a href="#" class="text-secondary font-medium hover:text-secondary hover:underline">Contact Us</a>
        </div>
        <!-- Useful buttons -->
        <div class="w-full grid grid-cols-2 bg-background text-lg border-t-2 border-text/10">
            <a v-if="isLoggedIn" href="/account"
                class="flex flex-col justify-center items-center text-text hover:text-secondary">
                <span class="material-icons-outlined scale-110">person</span>
                Account
            </a>
            <a v-else href="/login" class="flex flex-col justify-center items-center text-text hover:text-secondary">
                <span class="material-icons-outlined scale-110">person</span>
                Login
            </a>
            <a href="#" class="flex flex-col justify-center items-center text-text hover:text-secondary">
                <span class="material-icons-outlined scale-110">call</span>
                Contact
            </a>
        </div>
    </div>

    <!-- Overlay -->
    <div v-if="isMenuOpen" @click="toggleMenu" class="fixed top-0 inset-0 bg-text bg-opacity-30 z-40"></div>
</template>

<script>
import { getdefaultImage } from '@/utils';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Navbar',
    data() {
        return {
            marqueeText: "Your rotating text here. This can be a variable or dynamic content.",
            scrolled: false,
            isSearchExpanded: false,
            isMenuOpen: false,
            categories: [
                'Men', 'Women', 'Kids', 'Accessories', 'Plus Size', 'Maternity', 'Formal Wear', 'Casual Wear', 'Sports Wear'
            ],

            colorCategories: [
                { name: 'Men', color: 'bg-primary' },
                { name: 'Women', color: 'bg-secondary' },
                { name: 'Kids', color: 'bg-accent' },
                { name: 'Accessories', color: 'bg-primary' },
                { name: 'Plus Size', color: 'bg-secondary' },
                { name: 'Maternity', color: 'bg-accent' },
                { name: 'Formal Wear', color: 'bg-primary' },
                { name: 'Casual Wear', color: 'bg-secondary' },
                { name: 'Sports Wear', color: 'bg-accent' },
            ],
            activeCategory: null,
            closeTimer: null,
            categoryMap: {
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
                ],
                'Maternity': [
                    'Maternity Dresses', 'Maternity Tops', 'Maternity Pants', 'Maternity Skirts', 'Maternity Swimwear', 'Nursing Bras', 'Maternity Jeans'
                ],
                'Formal Wear': [
                    'Suits', 'Tuxedos', 'Formal Dresses', 'Cocktail Dresses', 'Wedding Dresses', 'Formal Shoes', 'Ties', 'Cufflinks'
                ],
                'Casual Wear': [
                    'T-shirts', 'Jeans', 'Sweaters', 'Hoodies', 'Casual Dresses', 'Shorts', 'Sneakers', 'Sandals'
                ],
                'Sports Wear': [
                    'Running Shoes', 'Yoga Pants', 'Sports Jerseys', 'Hoodies', 'Sweatpants', 'Baseball Caps', 'Sports Socks', 'Water Bottles'
                ]
            },
            searchQuery: '',
            searchResults: [],
            isSearchDropdownVisible: false,
            sidebarSearchQuery: '',
            sidebarSearchResults: [],
            isLoggedIn: false,
            userName: '',
            showProfileDropdown: false,
            isMobile: false,
        }
    },
    created() {
        this.checkLoginStatus();
        this.$store.commit('bag/initializeBag');
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('click', this.handleOutsideClick);
        window.addEventListener('storage', this.checkLoginStatus);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.isMenuOpen = false;
            }
        });
        document.addEventListener('click', (event) => {
            const searchContainer = event.target.closest('.search-container');
            if (!searchContainer) {
                this.closeSearchDropdown();
            }
        });

        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
        document.removeEventListener('click', this.handleOutsideClick);
        window.removeEventListener('storage', this.checkLoginStatus);
        window.removeEventListener('resize', this.checkMobile);
    },

    computed: {
        ...mapState('bag', ['items']),
        ...mapGetters('bag', ['totalItems']),
        bagItemsCount() {
            return this.totalItems;
        },
        searchableItems() {
            const items = {};
            Object.entries(this.categoryMap).forEach(([category, subcategories]) => {
                items[category] = {
                    image: getdefaultImage(),
                    subcategories: Object.fromEntries(
                        subcategories.map(subcat => [subcat, getdefaultImage()])
                    )
                };
            });

            return items;
        }
    },

    methods: {
        handleScroll() {
            this.scrolled = window.scrollY > 0
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        toggleSearch() {
            if (window.innerWidth < 1024) {
                this.isSearchExpanded = false;
                this.toggleMenu();
                return;
            }
            this.isSearchExpanded = !this.isSearchExpanded
        },
        openDropdown(category) {
            clearTimeout(this.closeTimer);
            this.activeCategory = category;
        },
        startCloseTimer(category) {
            this.closeTimer = setTimeout(() => {
                if (this.activeCategory === category) {
                    this.activeCategory = null;
                }
            }, 300);
        },
        toggleDropdown(category) {
            this.activeCategory = this.activeCategory === category ? null : category;
        },
        handleOutsideClick(event) {
            if (!event.target.closest('.relative')) {
                this.showProfileDropdown = false;
            }
            if (!event.target.closest('nav')) {
                this.activeCategory = null;
            }
        },
        handleSearch(event) {
            const query = event.target.value.toLowerCase();
            this.searchQuery = query;

            if (!query) {
                this.searchResults = [];
                this.isSearchDropdownVisible = false;
                return;
            }

            const results = [];

            Object.entries(this.searchableItems).forEach(([category, data]) => {
                if (category.toLowerCase().includes(query)) {
                    results.push({
                        type: 'category',
                        text: category,
                        image: data.image,
                        url: `/category/${category.toLowerCase()}`,
                        priority: category.toLowerCase().startsWith(query) ? 2 : 1
                    });
                }

                Object.entries(data.subcategories).forEach(([subcat, image]) => {
                    if (subcat.toLowerCase().includes(query)) {
                        results.push({
                            type: 'subcategory',
                            text: subcat,
                            category: category,
                            image: image,
                            url: `/category/${category.toLowerCase()}?subcategory=${subcat.toLowerCase()}`,
                            priority: subcat.toLowerCase().startsWith(query) ? 3 : 0
                        });
                    }
                });
            });

            this.searchResults = results.sort((a, b) => b.priority - a.priority);
            this.isSearchDropdownVisible = results.length > 0;
        },

        closeSearchDropdown() {
            this.isSearchDropdownVisible = false;
            this.searchResults = [];
        },
        handleSidebarSearch(event) {
            const query = event.target.value.toLowerCase();
            this.sidebarSearchQuery = query;

            if (!query) {
                this.sidebarSearchResults = [];
                return;
            }

            const results = [];

            Object.entries(this.searchableItems).forEach(([category, data]) => {
                if (category.toLowerCase().includes(query)) {
                    results.push({
                        type: 'category',
                        name: category,
                        color: this.getCategoryColor(category),
                        image: data.image,
                        url: `/category/${category.toLowerCase()}`
                    });
                }

                Object.entries(data.subcategories).forEach(([subcat, image]) => {
                    if (subcat.toLowerCase().includes(query)) {
                        results.push({
                            type: 'subcategory',
                            name: subcat,
                            category: category,
                            color: this.getCategoryColor(category),
                            image: image,
                            url: `/category/${category.toLowerCase()}?subcategory=${subcat.toLowerCase()}`
                        });
                    }
                });
            });

            this.sidebarSearchResults = results;
        },

        getCategoryColor(categoryName) {
            const category = this.colorCategories.find(c => c.name === categoryName);
            return category ? category.color : 'bg-primary';
        },
        toggleProfileDropdown() {
            this.showProfileDropdown = !this.showProfileDropdown;
        },
        handleLogout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('name');
            this.isLoggedIn = false;
            this.userName = '';
            window.location.reload();
        },
        checkLoginStatus() {
            const token = localStorage.getItem('accessToken');
            const name = localStorage.getItem('name');
            this.isLoggedIn = !!token;
            this.userName = name || '';
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
        },
    }
}
</script>


<style scoped>
.marquee-content {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 18s linear infinite;
}

@keyframes marquee {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.show {
    animation: ShowName 600ms ease-in-out forwards;
}

.fade {
    animation: fadeName 600ms ease-in-out forwards;
}

@keyframes fadeName {
    0% {
        opacity: 100%;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}

@keyframes ShowName {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 100%;
        transform: translateY(0);
    }
}


.underline-animation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease-in-out;
}

.underline-animation.active {
    width: 100%;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.bag-pulse {
    animation: pulse 1.5s ease-out infinite;
}
</style>
