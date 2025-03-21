<template>
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-background w-full max-w-md shadow-xl p-2">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-text/10">
                <h2 class="text-lg font-medium">Share Product</h2>
                <button @click="$emit('close')" class="p-2 hover:bg-text/5 flex items-center">
                    <span class="material-icons">close</span>
                </button>
            </div>

            <!-- Copy Link Section -->
            <div class="p-4 border-b border-text/10">
                <div class="flex gap-2">
                    <input ref="linkInput" type="text" :value="productLink" readonly
                        class="flex-1 bg-text/5 px-3 py-2 text-sm">
                    <button @click="copyLink"
                        class="px-4 py-2 bg-secondary text-background font-medium hover:bg-secondary/90">
                        {{ copied ? 'Copied!' : 'Copy' }}
                    </button>
                </div>
            </div>

            <div class="p-4">
                <h3 class="font-medium mb-3">Social Media</h3>
                <div class="flex gap-8">
                    <router-link :to="social.link" v-for="(social, index) in socialLinks" :key="index" target="_blank"
                        rel="noopener noreferrer" class="w-8 h-8 flex items-center justify-center group"
                        :title="`Share on ${social.name}`">
                        <img :src="`/assets/socials/${social.icon}`" :alt="`${social.name} icon`"
                            class="w-full h-full group-hover:scale-110 transition-transform">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShareModal',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            copied: false
        }
    },
    computed: {
        productLink() {
            return `${window.location.origin}/category/${this.product.category}/${this.product.sku}`
        },
        shareText() {
            return `${this.product.name} by ArzFashion. Click on the link below to buy.`
        },
        socialLinks() {
            const encodedText = encodeURIComponent(this.shareText)
            const encodedUrl = encodeURIComponent(this.productLink)

            return [
                {
                    name: 'Facebook',
                    icon: 'facebook.svg',
                    link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                },
                {
                    name: 'Instagram',
                    icon: 'instagram.svg',
                    link: `https://instagram.com/share?text=${encodedText}&url=${encodedUrl}`
                },
                {
                    name: 'X (formely Twitter)',
                    icon: 'x.svg',
                    link: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
                },
                {
                    name: 'Pinterest',
                    icon: 'pinterest.svg',
                    link: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`
                },
                {
                    name: 'Telegram',
                    icon: 'telegram.svg',
                    link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
                }
            ]
        }
    },
    methods: {
        async copyLink() {
            try {
                await navigator.clipboard.writeText(this.productLink)
                this.copied = true
                setTimeout(() => this.copied = false, 2000)
            } catch (err) {
                this.$refs.linkInput.select()
                document.execCommand('copy')
                this.copied = true
                setTimeout(() => this.copied = false, 2000)
            }
        }
    },
    mounted() {
        document.body.style.overflow = 'hidden'
    },
    beforeUnmount() {
        document.body.style.overflow = ''
    },
    emits: ['close']
}
</script>