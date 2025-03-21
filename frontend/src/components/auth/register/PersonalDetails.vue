<template>
    <form class="w-80 md:w-96 flex flex-col gap-2">
        <h2 class="text-2xl font-medium mb-2">Personal Details</h2>
        <p v-if="error" class="text-secondary font-medium text-center">{{ error }}</p>

        <div class="relative z-0 w-full mb-5 group">
            <input name="name" id="name" type="text" v-model="details.name"
                class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                placeholder=" " required />
            <label for="name"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                Full Name
            </label>
        </div>

        <div class="relative z-0 w-full mb-5 group">
            <input name="email" id="email" type="email" v-model="details.email"
                class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                placeholder=" " required />
            <label for="email"
                class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                Email
            </label>
        </div>

        <div class="mb-5">
            <label class="text-sm mb-2 block">Gender</label>
            <div class="flex gap-4">
                <label v-for="option in ['male', 'female', 'other']" :key="option" class="flex items-center font-medium"
                    :class="{ 'text-primary': details.gender === option }">
                    <input type="radio" v-model="details.gender" :value="option" class="mr-2">
                    {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                </label>
            </div>
        </div>

        <div class="flex gap-4">
            <button type="button" @click="$emit('back')"
                class="px-4 py-2 font-medium border-2 border-primary text-primary hover:bg-primary/10">
                Back
            </button>
            <button type="button" @click="submitDetails"
                class="flex-1 px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
                Next
            </button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        initialData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            details: {
                name: this.initialData.name || '',
                email: this.initialData.email || '',
                gender: this.initialData.gender || ''
            },
            error: null
        }
    },
    methods: {
        submitDetails() {
            if (!this.details.name || !this.details.email || !this.details.gender) {
                this.error = 'Please fill all fields';
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.details.email)) {
                this.error = 'Please enter a valid email address';
                return;
            }
            this.$emit('submit', this.details);
        }
    }
}
</script>