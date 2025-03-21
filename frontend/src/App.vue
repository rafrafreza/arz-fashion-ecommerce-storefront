<script setup>
import '@fontsource-variable/montserrat';
import 'material-icons/iconfont/material-icons.css';
import { RouterView } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<template>
    <RouterView v-slot="{ Component, route }">
        <component :is="route.meta.layout || DefaultLayout">
            <component :is="Component" />
        </component>
    </RouterView>
</template>
