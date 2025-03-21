<template>
    <section id="policies" class="w-full flex flex-col md:flex-row gap-4 justify-around items-center py-8 md:py-16 bg-primary/5">
        <article class="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <span class="material-icons-outlined text-primary scale-150 lg:scale-[2]">sync</span>
            <div class="text-center md:text-left">
                <h3 class="md:text-lg lg:text-2xl font-semibold text-text">Easy Returns</h3>
                <p class="text-xs lg:text-sm">7 Days Return & Exchange</p>
            </div>
        </article>
        <span class="w-3/4 sm:w-1/2 md:w-0.5 h-0.5 md:h-16 bg-text/10"></span>
        <article class="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <span class="material-icons-outlined text-accent scale-150 lg:scale-[2]">verified_user</span>
            <div class="text-center md:text-left">
                <h3 class="md:text-lg lg:text-2xl font-semibold text-text">Secure Payment</h3>
                <p class="text-xs lg:text-sm">Easy And Secure Payment</p>
            </div>
        </article>
        <span class="w-3/4 sm:w-1/2 md:w-0.5 h-0.5 md:h-16 bg-text/10"></span>
        <article class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <img src="/assets/home/made_in_india.png" alt="made in india" class="h-8 lg:h-12 text-primary opacity-90" />
            <div class="text-center md:text-left">
                <h3 class="md:text-lg lg:text-2xl font-semibold text-text">Made In India</h3>
                <p class="text-xs lg:text-sm">With Premium Quality</p>
            </div>
        </article>
    </section>

</template>

<script>
export default {
    name: 'Policies',
};
</script>