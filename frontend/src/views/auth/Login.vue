<template>
    <section class="max-h-screen lg:grid grid-cols-3">
        <aside class="bg-primary/10 text-white h-screen hidden lg:flex">
            <img :src="bannerImage" alt="Banner Image" class="w-full h-full object-cover">
        </aside>

        <!-- Login Section -->
        <div class="h-screen col-span-2 flex flex-col items-center justify-center gap-8">
            <a href="/">
                <img src="/ARZ_logo.png" alt="ArzFashion Logo" class="h-20">
            </a>
            <p>
                <span class="material-icons align-middle text-sm">arrow_back</span>
                <span class="ml-1">Back to <a href="/" class="hover:underline">Home</a></span>
            </p>

            <!-- Login Form -->
            <login-form v-if="!showForgetPassword" @login="handleLogin" @forgotPassword="showForgetPassword = true" />

            <!-- Forget Password Form -->
            <forget-password v-else @back="showForgetPassword = false" @passwordUpdated="handlePasswordUpdated" />

            <!-- Sign Up Section -->
            <div v-if="!showForgetPassword" class="w-80 md:w-96 flex flex-col items-center">
                <div class="w-full h-[1px] bg-text"></div>
                <span class="relative -top-3 z-10 text-center font-medium bg-background px-2">New to ArzFashion?</span>
                <p>Create an Account <a href="/register">here</a></p>
                <button type="submit" @click="goToSignUp"
                    class="w-full m-4 px-4 py-2 text-background font-medium bg-secondary/70 hover:bg-secondary/90">
                    Sign Up
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { getdefaultImage } from '@/utils';
import LoginForm from '@/components/auth/login/LoginForm.vue';
import ForgetPassword from '@/components/auth/login/ForgetPassword.vue';

export default {
    components: {
        LoginForm,
        ForgetPassword
    },
    data() {
        return {
            showForgetPassword: false,
            bannerImage: getdefaultImage(true, 1080, 1920)
        }
    },
    methods: {
        async handleLogin({ email, password }) {
            try {
                const accessToken = `${email}:${password}`;
                localStorage.setItem('name', email);
                localStorage.setItem('accessToken', accessToken);
                this.$router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        handlePasswordUpdated() {
            this.showForgetPassword = false;
        },
        goToSignUp() {
            this.$router.push('/register');
        }
    }
}
</script>