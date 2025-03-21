<template>
    <form class="w-80 md:w-96 flex flex-col gap-2">
        <p v-if="error" class="text-secondary font-medium text-center">{{ error }}</p>
        <h2 class="text-2xl font-medium mb-2">Sign In</h2>

        <div class="relative z-0 w-full mb-5 group">
            <input type="email" name="floating_email" id="floating_email" v-model="email" @input="checkEmailOrPhone"
                class="block py-2.5 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                :class="isPhone ? 'pl-8' : 'pl-0'" placeholder="" required />
            <label for="floating_email"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                Email/Phone Number
            </label>
            <span v-if="isPhone" class="absolute top-2 font-semibold">+91</span>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input name="floating_password" id="floating_password" :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                placeholder=" " required />
            <label for="floating_password"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                Password
            </label>
            <button type="button" @click="togglePasswordVisibility"
                class="absolute right-3 top-6 transform -translate-y-1/2 text-text/50 hover:text-primary">
                <span class="material-icons">
                    {{ showPassword ? 'visibility' : 'visibility_off' }}
                </span>
            </button>
            <button type="button" @click="$emit('forgotPassword')"
                class="inline-block w-full text-right text-sm font-medium text-primary/50 hover:text-primary">
                Forgot Password?
            </button>
        </div>

        <button type="submit" @click.prevent="login"
            class="self-center px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
            Sign In
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            isPhone: false,
            error: null,
            showPassword: false,
        }
    },
    methods: {
        checkEmailOrPhone() {
            this.isPhone = !isNaN(this.email[0]);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        validatInput() {
            if (!this.email || !this.password) {
                this.error = 'Please fill all the fields';
                return false;
            }
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const phoneRegex = /^[0-9]{10}$/;
            if (!emailRegex.test(this.email) && !phoneRegex.test(this.email)) {
                this.error = 'Invalid email or phone number';
                return false;
            }
            return true;
        },
        async login() {
            if (!this.validatInput()) return;
            this.$emit('login', {
                email: this.email,
                password: this.password
            });
        }
    }
}
</script>