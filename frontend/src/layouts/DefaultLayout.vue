<template>
    <div>
        <Header />
        <slot /> <!-- This is where routed components will be rendered -->
        <Footer />
        <Chat />
    </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Chat from '@/components/common/Chat.vue'
</script>