<template>
  <div class="app">
    <button @click="startLogin">Login com Spotify</button>
    <button @click="loginWithSpotify">Login com Spotssssssify</button>

    <h1>Criador de Playlists do Spotify</h1>
    <div>
      <input v-model="keywords" placeholder="Digite as palavras-chave" />
      <button @click="searchTracks">Pesquisar</button>
    </div>
    <div v-if="tracks.length > 0">
      <h2>Resultados da Pesquisa</h2>
      <ul>
        <li v-for="track in tracks" :key="track.id">
          {{ track.name }} - {{ track.artists[0].name }} 
        </li>
      </ul>
      <input v-model="playlistName" placeholder="Digite o nome da playlist" />
      <input v-model="playlistDescription" placeholder="Digite a descrição da playlist (opcional)" />
      <button @click="createPlaylistWithLink">Criar Playlist</button>
    </div>
    <div v-if="playlistUrl">
      <h2>Playlist Criada</h2>
      <p>URL da Playlist: <a :href="playlistUrl" target="_blank">{{ playlistUrl }}</a></p>
    </div>
  </div>
</template>

<script>
import { getAccessToken } from './spotify';
import axios from 'axios';

export default {
  data() {
    return {
      keywords: '',
      tracks: [],
      playlistName: '',
      playlistDescription: '',
      playlistUrl: '',
      cleitin: true
    };
  },
  methods: {
      async loginWithSpotify() {
      const clientId = 'ae2897eb1dc342099c3686072cc171f2';
      const redirectUri = 'http://localhost:8080/callback'; // Sua URL de redirecionamento autorizada
      const scopes = 'user-read-private user-read-email'; // Permissões necessárias

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;
      window.location.href = authUrl;
    },
    async searchTracks() {
      try {
        this.cleitin = false
        console.log("Searching" , this.cleitin)
        const accessToken = await getAccessToken();
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(this.keywords)}&type=track`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        this.tracks = response.data.tracks.items;
        this.cleitin = true
        console.log('alterando o cleitin' ,this.cleitin)
      } catch (error) {
        console.error('Erro ao pesquisar músicas:', error.message);
      }
    },
    async getUserId() {
      try {
        const accessToken = await getAccessToken();
        console.log('Token de Acesso:', accessToken); // Adicione esta linha para depuração

        const response = await axios.get(
          'https://api.spotify.com/v1/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data.id;
      } catch (error) {
        console.error('Erro ao obter o user_id:', error.message);
        return null;
      }
    },
    async createPlaylistWithLink() {
      try {
        const accessToken = await getAccessToken();
        const trackUris = this.tracks.map((track) => track.uri);

        const userId = await this.getUserId();

        if (!userId) {
          console.error('Não foi possível obter o user_id.');
          return;
        }

        const playlistResponse = await axios.post(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            name: this.playlistName,
            public: true,
            description: this.playlistDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const playlistId = playlistResponse.data.id;

        await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris: trackUris },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        this.playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
        console.log(`Playlist "${this.playlistName}" criada com sucesso. URL da Playlist: ${this.playlistUrl}`);
      } catch (error) {
        console.error('Erro ao criar a playlist:', error.message);
      }
    },
  },
};
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

input {
  width: 300px;
  margin-right: 10px;
}

button {
  cursor: pointer;
}
</style>
