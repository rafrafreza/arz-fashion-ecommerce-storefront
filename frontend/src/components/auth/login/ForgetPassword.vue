<template>
    <form class="w-80 md:w-96 flex flex-col gap-2">
        <!-- Success Message -->
        <p v-if="successMessage" class="text-accent bg-accent/10 px-6 py-2 border border-accent font-medium text-center mb-4">{{ successMessage }}</p>
        <!-- Error Message -->
        <p v-if="error" class="text-secondary font-medium text-center mb-4">{{ error }}</p>

        <h2 class="text-2xl font-medium mb-2">Reset Password</h2>

        <!-- Phone Input -->
        <div v-if="!isPhoneVerified" class="relative z-0 w-full mb-5 group">
            <input type="tel" id="phone" v-model="phoneNumber" maxlength="10" :disabled="isPhoneConfirmed"
                class="block py-2.5 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer pl-8 disabled:opacity-75"
                placeholder="" required />
            <label for="phone"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 translate-x-0 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:translate-x-8 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:translate-x-0">
                Phone Number
            </label>
            <span class="absolute top-2 text-primary font-semibold">+91</span>
        </div>

        <!-- OTP Input Section -->
        <div v-if="showOTP && !isPhoneVerified" class="w-full">
            <p class="mb-2 font-medium">Enter 6-digit OTP sent to <span class="font-semibold">+91-{{ phoneNumber
            }}</span></p>
            <div class="flex gap-2 mb-4">
                <!-- First group of 3 digits -->
                <input v-for="index in 3" :key="`first-${index}`" v-model="otpDigits[index - 1]"
                    @input="handleOtpInput($event, index - 1)" @keydown.delete="handleOtpDelete($event, index - 1)"
                    type="number" maxlength="1"
                    class="w-12 h-12 text-center border-2 focus:border-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    :ref="`otpInput${index - 1}`">

                <div class="w-1"></div>

                <!-- Second group of 3 digits -->
                <input v-for="index in 3" :key="`second-${index}`" v-model="otpDigits[index + 2]"
                    @input="handleOtpInput($event, index + 2)" @keydown.delete="handleOtpDelete($event, index + 2)"
                    type="number" maxlength="1"
                    class="w-12 h-12 text-center border-2 focus:border-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    :ref="`otpInput${index + 2}`">
            </div>
        </div>

        <!-- New Password Input -->
        <div v-if="isPhoneVerified" class="relative z-0 w-full mb-5 group">
            <input name="new_password" id="new_password" :type="showPassword ? 'text' : 'password'"
                v-model="newPassword"
                class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                placeholder=" " required />
            <label for="new_password"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                New Password
            </label>
            <button type="button" @click="togglePasswordVisibility"
                class="absolute right-3 top-6 transform -translate-y-1/2 text-text/50 hover:text-primary">
                <span class="material-icons">
                    {{ showPassword ? 'visibility' : 'visibility_off' }}
                </span>
            </button>
        </div>

        <!-- Action Buttons -->
        <button type="button" @click="handleAction"
            class="self-center px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
            {{ actionButtonText }}
        </button>

        <!-- Back to Login -->
        <button type="button" @click="$emit('back')"
            class="self-center mt-4 text-sm font-medium text-primary hover:underline">
            Back to Login
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: '',
            newPassword: '',
            showPassword: false,
            showOTP: false,
            isPhoneConfirmed: false,
            isPhoneVerified: false,
            otpDigits: ['', '', '', '', '', ''],
            error: null,
            successMessage: null
        }
    },
    computed: {
        actionButtonText() {
            if (!this.isPhoneConfirmed) return 'Send OTP';
            if (this.showOTP && !this.isPhoneVerified) return 'Verify OTP';
            if (this.isPhoneVerified) return 'Reset Password';
            return 'Send OTP';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        handleOtpInput(event, index) {
            const input = event.target.value;
            if (input.length > 0 && index < 5) {
                this.$refs[`otpInput${index + 1}`][0].focus();
            }
        },
        handleOtpDelete(event, index) {
            if (event.key === 'Backspace' && index > 0 && !this.otpDigits[index]) {
                this.$refs[`otpInput${index - 1}`][0].focus();
            }
        },
        async handleAction() {
            if (!this.isPhoneConfirmed) {
                if (!/^[0-9]{10}$/.test(this.phoneNumber)) {
                    this.error = 'Please enter a valid 10-digit phone number';
                    return;
                }
                this.isPhoneConfirmed = true;
                this.showOTP = true;
                this.successMessage = `OTP has been sent to +91-${this.phoneNumber}`;
                this.error = null;
                return;
            }

            if (this.showOTP && !this.isPhoneVerified) {
                const otp = this.otpDigits.join('');
                if (otp.length !== 6) {
                    this.error = 'Please enter complete OTP';
                    return;
                }
                this.isPhoneVerified = true;
                this.showOTP = false;
                this.successMessage = 'Phone number verified successfully.\nPlease set your new password.';
                this.error = null;
                return;
            }

            if (this.isPhoneVerified) {
                if (!this.newPassword) {
                    this.error = 'Please enter new password';
                    return;
                }
                this.$emit('passwordUpdated');
            }
        }
    }
}
</script>