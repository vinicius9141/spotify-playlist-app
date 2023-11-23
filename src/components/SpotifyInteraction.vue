<template>
  <div>
    <h2>Interação com o Spotify</h2>
    <button @click="searchMusic">Pesquisar Música no Spotify</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async searchMusic() {
      // Obtenha o token de acesso do localStorage
      const accessToken = localStorage.getItem('spotifyAccessToken');

      // Faça uma solicitação à API do Spotify com o token de acesso
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        // Trate a resposta da API do Spotify
        console.log('Resposta da API do Spotify:', response.data);
      } catch (error) {
        // Lide com erros
        console.error('Erro na solicitação à API do Spotify:', error);
      }
    }
  }
}
</script>
