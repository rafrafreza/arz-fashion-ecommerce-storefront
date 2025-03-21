<template>
    <section id="marketplaces" class="w-full flex flex-col items-center gap-6 md:gap-2 py-12 bg-secondary/5">
        <h2 class="text-4xl font-medium text-text">Marketplaces</h2>
        <div class="w-full flex flex-col md:flex-row gap-2 justify-around items-center">
            <figure class="w-64 h-24 flex justify-center items-center relative top-3 hover:scale-105 active:scale-105 transition-all duration-300 ease-in-out">
                <img src="/assets/home/marketplaces/amazon.png" alt="amazon" class="w-36">
            </figure>
            <figure class="w-64 h-24 flex justify-center items-center hover:scale-105 active:scale-105 transition-all duration-300 ease-in-out">
                <img src="/assets/home/marketplaces/flipkart.png" alt="flipkart" class="w-48">
            </figure>
            <figure class="w-64 h-24 flex justify-center items-center hover:scale-105 active:scale-105 transition-all duration-300 ease-in-out">
                <img src="/assets/home/marketplaces/myntra.png" alt="myntra" class="w-36">
            </figure>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Marketplaces',
}
</script>