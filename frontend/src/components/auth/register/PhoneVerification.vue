<template>
    <form class="w-80 md:w-96 flex flex-col gap-2">
        <p v-if="error" class="text-secondary font-medium text-center">{{ error }}</p>

        <!-- Modified heading row with edit button -->
        <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-medium">Phone Verification</h2>
            <button v-if="isPhoneConfirmed" @click="handleEdit" type="button" class="text-secondary hover:text-primary">
                <span class="material-icons">edit</span>
            </button>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input type="tel" id="phone" v-model="phoneNumber" maxlength="10" :disabled="isPhoneConfirmed"
                class="block py-2.5 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer pl-8 disabled:opacity-75"
                placeholder="" required />
            <label for="phone"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 translate-x-0 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:translate-x-8 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:translate-x-0">
                Phone Number
            </label>
            <span class="absolute top-2 text-primary font-semibold">+91</span>
        </div>

        <div v-if="showOTP" class="w-full">
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

        <button type="button" @click="verifyPhone"
            class="self-center px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
            {{ showOTP ? 'Verify OTP' : 'Send OTP' }}
        </button>

        <!-- Integrated Confirmation Popup -->
        <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-background p-6 shadow-lg max-w-sm w-full mx-4">
                <h3 class="text-lg font-medium mb-4">Confirm Phone Number</h3>
                <p class="text-sm mb-6 font-medium">Is this your phone number: <span class="font-semibold">+91-{{
                    phoneNumber }}?</span></p>
                <div class="flex justify-end gap-4">
                    <button @click="handleConfirmationCancel"
                        class="px-4 py-2 font-medium border-2 border-primary text-primary hover:bg-primary/10">
                        Edit
                    </button>
                    <button @click="handleConfirmationConfirm"
                        class="px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        initialData: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            phoneNumber: this.initialData || '',
            showOTP: false,
            showConfirmation: false,
            otpDigits: ['', '', '', '', '', ''],
            error: null,
            isPhoneConfirmed: false
        }
    },
    methods: {
        verifyPhone() {
            if (!this.showOTP) {
                if (!/^[0-9]{10}$/.test(this.phoneNumber)) {
                    this.error = 'Please enter a valid 10-digit phone number';
                    return;
                }
                this.showConfirmation = true;
            } else {
                const otp = this.otpDigits.join('');
                if (otp.length !== 6) {
                    this.error = 'Please enter complete OTP';
                    return;
                }
                this.$emit('verify', {
                    phone: this.phoneNumber,
                    otp: otp
                });
            }
        },
        handleConfirmationConfirm() {
            this.showConfirmation = false;
            this.showOTP = true;
            this.isPhoneConfirmed = true;
            this.$emit('verify', {
                phone: this.phoneNumber,
                otp: null
            });
        },
        handleConfirmationCancel() {
            this.showConfirmation = false;
        },
        handleOtpInput(event, index) {
            const input = event.target.value;
            if (input.length > 0 && index < 5) {
                this.$refs[`otpInput${index + 1}`][0].focus();
            }
            const allFilled = this.otpDigits.every(digit => digit !== '');
            console.log("All filled: ", allFilled, this.otpDigits);
            if (index === 5 && input.length > 0 && allFilled) {
                this.verifyPhone();
            }
        },
        handleOtpDelete(event, index) {
            if (event.key === 'Backspace' && index > 0 && !this.otpDigits[index]) {
                this.$refs[`otpInput${index - 1}`][0].focus();
            }
        },
        handleEdit() {
            this.isPhoneConfirmed = false;
            this.showOTP = false;
        }
    }
}
</script>