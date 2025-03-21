<template>
    <section class="max-h-screen lg:grid grid-cols-3">
        <aside class="bg-primary/10 text-white h-screen hidden lg:flex">
            <img :src="bannerImage" alt="Banner Image" class="w-full h-full object-cover">
        </aside>

        <div class="h-screen col-span-2 flex flex-col items-center justify-center gap-16">
            <a href="/">
                <img src="/ARZ_logo.png" alt="ArzFashion Logo" class="h-20">
            </a>
            <p>
                <span class="material-icons align-middle text-sm">arrow_back</span>
                <span class="ml-1">Back to <a href="/" class="hover:underline">Home</a></span>
            </p>

            <!-- Loading and Success Messages -->
            <div v-if="isRegistering || registrationSuccess"
                class="w-80 md:w-96 flex flex-col items-center justify-center">
                <div v-if="isRegistering" class="text-center">
                    <h2 class="text-2xl font-medium mb-4">Registering</h2>
                    <p class="text-text/70">Please wait while we create your account...</p>
                </div>
                <div v-else-if="registrationSuccess" class="flex flex-col gap-4 text-center">
                    <h2 class="text-2xl font-medium text-primary">Registration Successful!</h2>
                    <p class="text-text/70">
                        Please <router-link to="/login" class="text-primary hover:underline">login</router-link> to
                        proceed...
                    </p>
                    <!-- add login button -->
                    <button type="submit" @click="goToLogin"
                        class="w-full px-4 py-2 text-background font-medium bg-secondary/70 hover:bg-secondary/90">
                        Log In
                    </button>
                </div>
            </div>

            <phone-verification v-else-if="currentStep === 1" :initial-data="phone" @verify="handlePhoneVerification" />

            <personal-details v-else-if="currentStep === 2" :initial-data="personalDetails" @back="currentStep = 1"
                @submit="handlePersonalDetails" />

            <address-details v-else-if="currentStep === 3" :initial-data="address" @back="currentStep = 2"
                @submit="handleAddressSubmit" />
        </div>
    </section>
</template>

<script>
import { getdefaultImage } from '@/utils';
import PhoneVerification from '@/components/auth/register/PhoneVerification.vue';
import PersonalDetails from '@/components/auth/register/PersonalDetails.vue';
import AddressDetails from '@/components/auth/register/AddressDetails.vue';

export default {
    components: {
        PhoneVerification,
        PersonalDetails,
        AddressDetails
    },
    data() {
        return {
            currentStep: 1,
            phone: '',
            personalDetails: {},
            address: {},
            coords: {},
            bannerImage: getdefaultImage(true, 1080, 1920),
            isRegistering: false,
            registrationSuccess: false
        }
    },
    methods: {
        handlePhoneVerification({ phone, otp }) {
            this.phone = phone;
            if (otp) {
                this.currentStep = 2;
            }
        },
        handlePersonalDetails(details) {
            this.personalDetails = details;
            this.currentStep = 3;
        },
        handleAddressSubmit(address) {
            this.address = address;
            this.submitRegistration();
        },
        async submitRegistration() {
            console.log("Registering");
            this.isRegistering = true;
            const registrationData = {
                phone: this.phone,
                personalDetails: this.personalDetails,
                address: this.address,
                coords: this.coords

            };
            console.log(registrationData);

            await new Promise(resolve => setTimeout(resolve, 2000));

            this.isRegistering = false;
            this.registrationSuccess = true;
        },
        goToLogin() {
            this.$router.push('/login');
        }
    }
}
</script>