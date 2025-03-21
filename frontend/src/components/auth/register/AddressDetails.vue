<template>
    <form class="w-80 md:w-96 flex flex-col gap-2">
        <h2 class="text-2xl font-medium mb-2">Address Details</h2>
        <p v-if="error" class="text-secondary font-medium text-center">{{ error }}</p>

        <!-- Location Section -->
        <div v-if="!isLocationSet" class="mb-4 text-center">
            <p class="text-sm mb-4">Please share your location to auto-fill your address details</p>
            <button type="button" @click="getLocation"
                class="px-8 py-2 font-medium border-2 border-primary text-primary hover:bg-primary/10 flex items-center justify-center gap-2 mx-auto">
                <span class="material-icons">location_on</span>
                {{ locationButtonText }}
            </button>
            <p v-if="locationError" class="text-secondary text-sm mt-4 bg-secondary/10 p-3 rounded">
                {{ locationError }}
                <button v-if="locationDenied" @click="getLocation" class="text-primary underline ml-1">
                    Try again
                </button>
            </p>
        </div>

        <!-- Rest of the form fields -->
        <div v-show="isLocationSet || locationDenied">
            <!-- Building Input -->
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" id="building" v-model="addressData.building"
                    class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                    placeholder=" " required />
                <label for="building"
                    class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                    Building/House No.
                </label>
            </div>

            <!-- Street Input -->
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" id="street" v-model="addressData.street"
                    class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                    placeholder=" " required />
                <label for="street"
                    class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                    Street/Area
                </label>
            </div>

            <!-- State Dropdown -->
            <div class="relative z-20 w-full mb-5 group">
                <input type="text" id="state" v-model="stateSearch" @focus="showStateDropdown = true"
                    @input="filterStates"
                    class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                    required />
                <label for="state"
                    class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                    State
                </label>
                <!-- State Dropdown List -->
                <div v-if="showStateDropdown && filteredStates.length > 0"
                    class="absolute w-full mt-1 max-h-60 overflow-auto bg-background border border-text/10 rounded-md shadow-lg touch-pan-y"
                    style="-webkit-overflow-scrolling: touch;">
                    <div v-for="state in filteredStates" :key="state" @click="selectState(state)"
                        class="px-4 py-2 hover:bg-primary/10 cursor-pointer">
                        {{ state }}
                    </div>
                </div>
            </div>

            <!-- City Dropdown -->
            <div class="relative z-10 w-full mb-5 group">
                <input type="text" id="city" v-model="citySearch" @focus="showCityDropdown = true" @input="filterCities"
                    :disabled="!addressData.state"
                    class="block py-2.5 px-0 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary/80 peer"
                    :class="{ 'opacity-50 cursor-not-allowed': !addressData.state }" required />
                <label for="city"
                    class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                    City
                </label>
                <!-- City Dropdown List -->
                <div v-if="showCityDropdown && filteredCities.length > 0"
                    class="absolute w-full mt-1 max-h-60 overflow-auto bg-background border border-text/10 rounded-md shadow-lg touch-pan-y"
                    style="-webkit-overflow-scrolling: touch;">
                    <div v-for="city in filteredCities" :key="city" @click="selectCity(city)"
                        class="px-4 py-2 hover:bg-primary/10 cursor-pointer">
                        {{ city }}
                    </div>
                </div>
            </div>

            <!-- Pincode Input -->
            <div class="relative z-0 w-full mb-5 group">
                <input type="number" id="pincode" v-model="addressData.pincode" maxlength="6"
                    class="block py-2.5 w-full text-sm font-medium bg-transparent border-0 border-b-2 border-text/10 focus:outline-none focus:ring-0 focus:border-primary/80 peer disabled:opacity-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="" required />
                <label for="pincode"
                    class="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                    Pincode
                </label>
            </div>

            <div class="flex gap-4">
                <button type="button" @click="$emit('back')"
                    class="px-4 py-2 font-medium border-2 border-primary text-primary hover:bg-primary/10">
                    Back
                </button>
                <button type="button" @click="submitAddress"
                    class="flex-1 px-4 py-2 font-medium text-background border-2 border-primary bg-primary/90 hover:bg-primary">
                    Submit
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import statesData from '@/static/data/states_cities.json';

export default {
    props: {
        initialData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            addressData: {
                building: this.initialData.building || '',
                street: this.initialData.street || '',
                city: this.initialData.city || '',
                state: this.initialData.state || '',
                pincode: this.initialData.pincode || '',
            },
            coords: {
                latitude: null,
                longitude: null
            },
            error: null,
            locationError: null,
            locationButtonText: 'Share Location',

            stateSearch: '',
            citySearch: '',
            showStateDropdown: false,
            showCityDropdown: false,
            states: statesData.states,
            cities: statesData.cities,
            filteredStates: [],
            filteredCities: [],
            isLocationSet: false,
            locationDenied: false,
            isLoading: false
        }
    },
    created() {
        if (this.initialData.state) {
            this.stateSearch = this.initialData.state;
            this.filteredStates = [this.initialData.state];
        } else {
            this.filteredStates = this.states;
        }

        if (this.initialData.city) {
            this.citySearch = this.initialData.city;
            this.filteredCities = [this.initialData.city];
        }

        document.addEventListener('click', this.handleClickOutside);
        this.getLocation();
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        resetLocation() {
            this.isLocationSet = false;
            this.coords = { latitude: null, longitude: null };
            this.locationButtonText = 'Share Location';
            this.locationError = null;
            this.locationDenied = false;
        },

        async getLocation() {
            if (!navigator.geolocation) {
                this.locationError = 'Your browser doesn\'t support location services. Please enter your address manually.';
                this.locationDenied = true;
                return;
            }

            this.isLoading = true;
            this.locationButtonText = 'Getting Location...';

            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    });
                });

                const { latitude, longitude } = position.coords;

                this.coords = { latitude, longitude };
                await this.fetchAddressFromCoords(latitude, longitude);
                this.isLocationSet = true;
                this.locationError = null;
                this.locationDenied = false;

            } catch (error) {
                console.error('Location error:', error);

                if (error.code === 1) {
                    this.locationError = 'Please allow access to your location in your browser settings to auto-fill your address details.';
                    this.locationDenied = true;
                } else if (error.message.includes('within India')) {
                    this.locationError = 'Your location appears to be outside India. Please enter your address manually.';
                    this.locationDenied = true;
                } else {
                    this.locationError = 'Unable to get your location. Please try again or enter your address manually.';
                    this.locationDenied = true;
                }
            } finally {
                this.isLoading = false;
                this.locationButtonText = 'Share Location';
            }
        },

        async fetchAddressFromCoords(lat, lon) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                );
                const data = await response.json();

                if (data.address) {
                    const country = data.address.country;

                    if (country && country.toLowerCase() !== 'india') {
                        this.locationError = `Sorry, we are currently available only in India. We'll be available soon in ${country}!`;
                        this.locationDenied = true;
                        this.isLocationSet = false;
                        return;
                    }

                    const {
                        postcode,
                        state,
                        city,
                        county,
                        suburb,
                        road,
                        house_number
                    } = data.address;

                    const matchedState = this.states.find(s =>
                        state?.toLowerCase().includes(s.toLowerCase()) ||
                        s.toLowerCase().includes(state?.toLowerCase())
                    );

                    if (matchedState) {
                        this.addressData.state = matchedState;
                        this.stateSearch = matchedState;

                        this.filteredCities = this.cities[matchedState];

                        const cityName = city || county;
                        if (cityName) {
                            const matchedCity = this.filteredCities.find(c =>
                                cityName.toLowerCase().includes(c.toLowerCase()) ||
                                c.toLowerCase().includes(cityName.toLowerCase())
                            );
                            if (matchedCity) {
                                this.addressData.city = matchedCity;
                                this.citySearch = matchedCity;
                            }
                        }
                    }

                    this.addressData.pincode = postcode || '';
                    this.addressData.street = [road, suburb].filter(Boolean).join(', ');
                    this.addressData.building = house_number || '';

                    this.isLocationSet = true;
                }
            } catch (error) {
                console.error('Error fetching address:', error);
                this.error = 'Unable to fetch address details. Please enter manually.';
                this.locationDenied = true;
            }
        },

        filterStates() {
            this.filteredStates = this.states.filter(state =>
                state.toLowerCase().includes(this.stateSearch.toLowerCase())
            );
        },
        filterCities() {
            if (!this.addressData.state) return;
            this.filteredCities = this.cities[this.addressData.state].filter(city =>
                city.toLowerCase().includes(this.citySearch.toLowerCase())
            );
        },
        selectState(state) {
            this.addressData.state = state;
            this.stateSearch = state;
            this.showStateDropdown = false;
            this.addressData.city = '';
            this.citySearch = '';
        },
        selectCity(city) {
            this.addressData.city = city;
            this.citySearch = city;
            this.showCityDropdown = false;
        },
        handleClickOutside(event) {
            const stateDropdown = document.getElementById('state');
            const cityDropdown = document.getElementById('city');

            if (!stateDropdown?.contains(event.target)) {
                this.showStateDropdown = false;
            }
            if (!cityDropdown?.contains(event.target)) {
                this.showCityDropdown = false;
            }
        },
        submitAddress() {
            const requiredFields = ['building', 'street', 'city', 'state', 'pincode'];
            if (requiredFields.some(field => !this.addressData[field])) {
                this.error = 'Please fill all fields';
                return;
            }
            if (!/^[0-9]{6}$/.test(this.addressData.pincode)) {
                this.error = 'Please enter a valid 6-digit pincode';
                return;
            }
            this.$emit('submit', {
                ...this.addressData,
                ...this.coords
            });
        }
    },
    watch: {
        'addressData.state'(newState) {
            if (newState) {
                this.filteredCities = this.cities[newState];
            }
        }
    }
}
</script>

<style scoped>
/* Custom scrollbar for dropdowns */
.overflow-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-primary), 0.3);
    border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(var(--color-primary), 0.5);
}
</style>