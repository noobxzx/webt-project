import { createRouter, createWebHistory } from 'vue-router';
import WordSearch from '../components/WordSearch.vue';
import About from '../components/AboutPage.vue';

const routes = [
    { path: '/', component: WordSearch },
    { path: '/about', component: About },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;