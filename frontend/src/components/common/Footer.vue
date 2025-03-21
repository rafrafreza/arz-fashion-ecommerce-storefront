<template>
    <footer class="bg-secondary/5 py-8">
        <div
            class="w-full flex flex-col md:flex-row justify-around items-center md:items-start gap-12 md:gap-6 px-12 pb-12">
            <div>
                <h3 class="font-bold text-lg mb-2 text-center md:text-left">CUSTOMER SERVICE</h3>
                <ul class="flex flex-col gap-2 items-center md:items-start pl-1">
                    <li><a href="#" class="hover:underline font-medium">Size Guide</a></li>
                    <li><a href="#" class="hover:underline font-medium">Track Order</a></li>
                    <li><a href="#" class="hover:underline font-medium">Contact Us</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-bold text-lg mb-2 text-center md:text-left">COMPANY</h3>
                <ul class="flex flex-col gap-2 items-center md:items-start pl-1">
                    <li><a href="#" class="hover:underline font-medium">Terms & Conditions</a></li>
                    <li><a href="#" class="hover:underline font-medium">Return & Refund Policy</a></li>
                    <li><a href="#" class="hover:underline font-medium">Sitemap</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-bold text-lg mb-2 text-center md:text-left">CONNECT WITH US</h3>
                <div class="flex items-center justify-center gap-6 mb-6">
                    <a href="#" title="" class="hover:scale-105 active:scale-105 transition-all duration-300">
                        <img src="/assets/socials/facebook.svg" alt="Facebook" class="w-7 h-7">
                    </a>
                    <a href="#" title="" class="hover:scale-105 active:scale-105 transition-all duration-300">
                        <img src="/assets/socials/instagram.svg" alt="Instagram" class="w-6 h-6">
                    </a>
                    <a href="#" title="" class="hover:scale-105 active:scale-105 transition-all duration-300">
                        <img src="/assets/socials/pinterest.svg" alt="Pinterest" class="w-7 h-7">
                    </a>
                    <a href="#" title="" class="hover:scale-105 active:scale-105 transition-all duration-300">
                        <img src="/assets/socials/x.svg" alt="X (formely Twitter)" class="w-7 h-7">
                    </a>
                </div>

                <ul class="space-y-2 pl-1">
                    <li class="flex items-center font-medium">
                        <span class="material-icons text-secondary mr-2">local_shipping</span> 15 Days Return Policy*
                    </li>
                    <li class="flex items-center font-medium">
                        <span class="material-icons text-secondary mr-2">payment</span> Cash on Delivery*
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t pt-4 px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-sm">
            <p class="font-medium">&copy; 2025 Arz Fashion</p>


            <!-- Payment Icons -->
            <div class="flex space-x-4 mt-4 md:mt-0">
                <img src="/ARZ_logo.png" alt="" class="w-8 h-auto">
                <img src="/ARZ_logo.png" alt="" class="w-8 h-auto">
                <img src="/ARZ_logo.png" alt="" class="w-8 h-auto">
                <img src="/ARZ_logo.png" alt="" class="w-8 h-auto">
                <img src="/ARZ_logo.png" alt="" class="w-8 h-auto">
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>
