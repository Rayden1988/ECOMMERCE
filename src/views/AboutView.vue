<template>
  <section class="about-view">
    <p class="eyebrow">Sobre a base</p>
    <h1>O projeto agora esta organizado para servir como ponto de partida do e-commerce.</h1>
    <p>
      A home concentra a vitrine, o carrinho e o resumo da compra. A partir daqui, fica
      simples conectar API, autenticacao, checkout e persistencia real.
    </p>
  </section>
</template>

<style scoped>
.about-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 32px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(255, 247, 237, 0.9));
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #c2410c;
}

h1 {
  margin: 0;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.05;
}

p:last-child {
  max-width: 60ch;
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  font-size: 1.02rem;
}

@media (max-width: 720px) {
  .about-view {
    padding: 1.5rem;
    border-radius: 24px;
  }
}
</style>
