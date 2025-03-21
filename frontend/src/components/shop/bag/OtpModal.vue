<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-text/30">
        <div class="bg-background p-8 shadow-lg w-96">
            <div class="flex flex-col gap-4">
                <!-- Header -->
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-semibold">Confirm Your Order</h3>
                    <button @click="$emit('close')" class="text-text/50 hover:text-text">
                        <span class="material-icons">close</span>
                    </button>
                </div>

                <!-- Error Message -->
                <p v-if="error" class="text-secondary font-medium text-center">{{ error }}</p>

                <!-- Success Message -->
                <p v-if="successMessage"
                    class="text-accent bg-accent/10 px-6 py-2 border border-accent font-medium text-center">
                    {{ successMessage }}
                </p>

                <!-- OTP Instructions -->
                <p class="text-sm font-medium">Enter 6-digit OTP sent to <br>
                    <span class="font-semibold">+91-{{ phone }}</span>
                </p>

                <!-- OTP Input Section -->
                <div class="flex gap-2 justify-center my-4">
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

                <!-- Action Buttons -->
                <div class="flex flex-col gap-2">
                    <button @click="verifyOtp"
                        class="w-full px-4 py-2 font-medium text-background bg-secondary/90 hover:bg-secondary">
                        Verify OTP
                    </button>
                    <button @click="resendOtp" :disabled="resendTimer > 0"
                        class="text-sm font-medium text-primary hover:underline disabled:text-text/50 disabled:no-underline">
                        {{ resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        phone: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            otpDigits: ['', '', '', '', '', ''],
            error: null,
            successMessage: null,
            resendTimer: 30,
            timerInterval: null
        }
    },
    methods: {
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
        verifyOtp() {
            const otp = this.otpDigits.join('');
            if (otp.length !== 6) {
                this.error = 'Please enter complete OTP';
                return;
            }
            this.error = null;
            this.$emit('verify', otp);
        },
        startResendTimer() {
            this.resendTimer = 30;
            this.timerInterval = setInterval(() => {
                if (this.resendTimer > 0) {
                    this.resendTimer--;
                } else {
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },
        resendOtp() {
            if (this.resendTimer > 0) return;

            this.otpDigits = ['', '', '', '', '', ''];
            this.error = null;
            this.successMessage = 'OTP sent successfully';
            this.startResendTimer();

            setTimeout(() => {
                this.successMessage = null;
            }, 3000);
        }
    },
    created() {
        this.startResendTimer();
    },
    beforeUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}
</script>