<template>
    <button @click="toggleChat"
        class="fixed z-50 bottom-10 right-10 w-20 h-20 rounded-full shadow-lg bg-accent overflow-hidden group hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">
        <div
            class="w-full h-full rounded-full pt-7 scale-150 group-hover:scale-[1.7] transition-all duration-300 ease-in-out">
            <span v-if="isOpen" class="w-full h-full text-text material-icons-outlined">close</span>
            <span v-else class="w-full h-full text-text material-icons-outlined scale-x-[-1]">chat</span>
        </div>
    </button>
    <div v-if="isOpen"
        class="fixed z-50 bottom-32 right-10 w-80 min-h-96 bg-background rounded-lg shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-4 bg-accent/80">
            <h3 v-if="currentView === 'main'" class="text-text font-bold text-lg">Chat with us</h3>
            <button v-else @click="currentView = 'main'"
                class="scale-[1.2] pt-1 active:scale-100 transition-all duration-300 ease-in-out"><span
                    class="material-icons-outlined">keyboard_backspace</span></button>
            <button @click="toggleChat" class="text-white">
                <span
                    class="w-full h-full text-text material-icons-outlined scale-[1.2] pt-1 active:scale-100 transition-all duration-300 ease-in-out">
                    close
                </span>
            </button>
        </div>

        <!-- Body -->
        <div v-if="currentView === 'main'">
            <section id="instant-btns" class="bg-accent/10 flex flex-col gap-4 p-4">
                <button @click="trackOrder"
                    class="w-full p-2 bg-accent/5 font-medium border-2 border-text rounded hover:bg-accent/20 active:bg-accent/30">
                    Track my order
                </button>
                <button @click="openSizeChart"
                    class="w-full p-2 bg-accent/5 font-medium border-2 border-text rounded hover:bg-accent/20 active:bg-accent/30">
                    Size Chart
                </button>
                <button @click="showContactInfo"
                    class="w-full p-2 bg-accent/5 font-medium border-2 border-text rounded hover:bg-accent/20 active:bg-accent/30">
                    Our Contact Info
                </button>
            </section>

            <section id="chat" class="bg-accent/50 px-4 py-6">
                <h4 class="text-lg text-text font-semibold">Need Assistance?</h4>
                <p class="text-sm font-medium">We're here to help!</p>
                <div class="pt-4 grid grid-cols-4">
                    <input v-model="message" type="text" placeholder="I want to know about..."
                        class="col-span-3 w-full p-2 rounded-l bg-gray-200 font-medium outline-none focus:bg-background">
                    <button @click="sendWhatsApp"
                        class="w-full rounded-r bg-accent/80 hover:bg-accent active:bg-accent">
                        <span class="material-icons-outlined scale-[0.9]">
                            send
                        </span>
                    </button>
                </div>
            </section>
        </div>

        <div v-if="currentView === 'trackOrder'" class="w-full h-80 flex flex-col gap-4 items-center p-4 bg-accent/10">
            <h3 class="text-lg text-text font-semibold">Track My Order</h3>
            <input v-model="orderID" type="text" placeholder="Enter Order ID"
                class="w-full p-2 rounded font-medium border border-transparent hover:border-text active:border-text focus:border-text outline-none">
            <button @click="submitOrderTracking"
                class="px-4 py-2 bg-accent/80  rounded hover:bg-accent active:bg-accent font-medium">
                Submit
            </button>
            <p>order Status</p>
        </div>

        <div v-if="currentView === 'contactInfo'" class="w-full h-80 flex flex-col gap-4 p-4 bg-accent/10">
            <h3 class="self-center text-lg text-text font-semibold p-4">Our Contact Info</h3>
            <p class="font-medium"><strong>Address:</strong> 123, ARZ fashion, Bihar, India - 100000</p>
            <p><strong>Phone:</strong> <a href="tel=+911234567890" class="text-text font-medium">+91 12345 67890</a>
            </p>
            <p class="font-medium"><strong>Email:</strong><a href="mailto:support@arzfashion.com"
                    class="text-text font-medium"> support@arzfashion.com</a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chat',
    data() {
        return {
            isOpen: false,
            currentView: 'main',
            message: '',
            orderID: '',
            phoneNumber: '+1234567890'
        }
    },
    methods: {
        toggleChat() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.currentView = 'main'
            }
        },
        trackOrder() {
            this.currentView = 'trackOrder'
        },
        openSizeChart() {
            window.open('/size-chart', '_blank')
        },
        showContactInfo() {
            this.currentView = 'contactInfo'
        },
        submitOrderTracking() {
            alert(`Tracking order: ${this.orderID}`)
            this.orderID = ''
        },
        sendWhatsApp() {
            const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`
            window.open(url, '_blank')
            this.message = ''
        }
    }
}
</script>