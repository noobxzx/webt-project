import { createRouter, createWebHistory } from 'vue-router';
import WordSearch from '../components/WordSearch.vue';
import About from '../components/AboutPage.vue';
// import Account from '../components/Account.vue';

const routes = [
    { path: '/', component: WordSearch },
    { path: '/about', component: About },
    // { path: '/account', component: Account },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;