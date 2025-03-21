<template>
    <section id="faq" class="lg:grid lg:grid-rows-1  lg:grid-cols-3 gap-16 py-12 px-12 md:px-24">
        <article class="flex flex-col gap-2 mb-8 lg:mb-0">
            <h2 class="text-4xl font-medium">Frequently Asked Questions <br>(FAQ)</h2>
            <div class="flex flex-col gap-8 pl-2">
                <p>
                    Your queries about modest fashion answered.
                </p>
                <p>
                    <span class="block text-lg text-secondary font-medium italic underline pb-2">
                        From abayas to kurtis, we’re here to help you find what you love.
                    </span>
                    Whether you're shopping for traditional attire or modern modest wear, we're here to guide you every
                    step of the way.
                </p>
                <p>
                    Have more questions? Reach out to us at
                    <a href="mailto:support@arzfashion.com" class="font-medium underline">support@arzfashion.com</a>
                </p>
            </div>
        </article>

        <div class="lg:col-span-2">
            <article v-for="(faq, index) in faqs" :key="index"
                class="border-b border-text/50 transition-all duration-300 hover:bg-secondary/5">
                <button @click="toggleFaq(index)"
                    class="w-full text-left flex justify-between items-center py-4 pr-2 md:pr-10">
                    <span class="text-xl font-medium" :class="{ 'text-secondary': faq.open, 'text-text': !faq.open }">{{
                        faq.question }}</span>
                    <span :class="{ 'rotate-90 text-secondary': faq.open, 'rotate-0 text-text/50': !faq.open }"
                        class="transform transition-transform material-icons-outlined">
                        arrow_forward_ios
                    </span>
                </button>
                <div v-if="faq.open" class="py-2 pb-4 pl-1 pr-2 md:pr-10">
                    {{ faq.answer }}
                </div>
            </article>
        </div>
    </section>
</template>

<script>
export default {
    name: "FaqSection",
    data() {
        return {
            faqs: [
                {
                    question: "What is ArzFashion and how does it work?",
                    answer:
                        "ArzFashion is your go-to platform for stylish and modest clothing. Browse our collection, add items to your bag, and enjoy seamless checkout.",
                    open: false,
                },
                {
                    question: "How can I place an order?",
                    answer:
                        "Placing an order is easy! Simply create an account, select your desired items, and proceed to checkout.",
                    open: false,
                },
                {
                    question: "Are your products ethically made?",
                    answer:
                        "Yes, we prioritize ethical sourcing and ensure that all our products are made with care and respect for workers.",
                    open: false,
                },
                {
                    question: "Do you offer international shipping?",
                    answer:
                        "Yes, we ship worldwide! Shipping costs and delivery times vary based on your location.",
                    open: false,
                },
                {
                    question: "What is ArzFashion and how does it work?",
                    answer:
                        "ArzFashion is your go-to platform for stylish and modest clothing. Browse our collection, add items to your bag, and enjoy seamless checkout.",
                    open: false,
                },
                {
                    question: "How can I place an order?",
                    answer:
                        "Placing an order is easy! Simply create an account, select your desired items, and proceed to checkout.",
                    open: false,
                },
                {
                    question: "Are your products ethically made?",
                    answer:
                        "Yes, we prioritize ethical sourcing and ensure that all our products are made with care and respect for workers.",
                    open: false,
                },
                {
                    question: "Do you offer international shipping?",
                    answer:
                        "Yes, we ship worldwide! Shipping costs and delivery times vary based on your location.",
                    open: false,
                },
            ],
        };
    },
    methods: {
        toggleFaq(index) {
            this.faqs.forEach((faq, i) => {
                faq.open = i === index ? !faq.open : false;
            });
        },
    },
};
</script>

<style scoped>
/* Add any additional styles if required */
</style>