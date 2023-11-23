// src/spotify.js

import axios from 'axios';

const clientId = 'ae2897eb1dc342099c3686072cc171f2';
const clientSecret = '560a2dee19e34557b95f11053e0fd845';
const auth = btoa(`${clientId}:${clientSecret}`);

export async function getAccessToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;

    // Armazene o token de acesso no LocalStorage
    localStorage.setItem('spotifyAccessToken', accessToken);

    return accessToken;
  } catch (error) {
    console.error('Erro ao obter o token de acesso:', error.message);
    throw error;
  }
}

