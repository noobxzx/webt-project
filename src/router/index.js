import { createRouter, createWebHistory } from 'vue-router';
import WordSearch from '../components/WordSearch.vue';
import About from '../components/AboutPage.vue';
import CatsPage from '../components/CatsPage.vue';
import QuizComponent from "../components/QuizComponent.vue";

const routes = [
    { path: '/', component: WordSearch },
    { path: '/about', component: About },
    { path: '/cats', component: CatsPage },
    { path: '/quiz', component: QuizComponent}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;