// ======== LOGIN ========
document.getElementById('login-btn').addEventListener('click', () => {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('password').value;
  const msg = document.getElementById('login-msg');

  if (user === '' || pass === '') {
    msg.textContent = 'Preencha todos os campos.';
    msg.style.color = '#ffd166';
  } else {
    msg.textContent = `Bem-vindo, ${user}! (login simulado)`;
    msg.style.color = '#00ffcc';
  }
});

// ======== BOTÃO VOLTAR AO TOPO ========
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
