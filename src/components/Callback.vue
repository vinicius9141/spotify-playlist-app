<template>
  <div>
    <h1>Callback Component</h1>
  </div>
</template>

<script>
export default {
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
</script>
