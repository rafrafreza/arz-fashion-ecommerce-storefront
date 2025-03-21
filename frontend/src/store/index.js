import { createStore } from 'vuex';
import bag from './modules/bag';

export default createStore({
    modules: {
        bag
    }
});