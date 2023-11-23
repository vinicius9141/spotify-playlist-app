// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Outras rotas
  {
    path: '/callback',
    name: 'Callback',
    component: {
      template: '<div>Callback Component</div>',
      mounted() {
        // Capturar o token de acesso da URL (parâmetro chamado "access_token")
        const accessToken = this.$route.query.access_token;

        // Agora você tem o token de acesso, use-o para fazer solicitações autenticadas ao Spotify
        // Lembre-se de armazenar o token de acesso de forma segura para uso posterior
        console.log('Token de Acesso:', accessToken);

        // Você pode armazenar o token de acesso em um local seguro, como no LocalStorage, para uso posterior em sua aplicação
        localStorage.setItem('spotifyAccessToken', accessToken);
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
