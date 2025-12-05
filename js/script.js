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

// ======== FORMULÁRIO DE CONTATO ========
// Implementação: tenta enviar via EmailJS (sem backend) se você configurar seu userID/serviceID/templateID.
// Se não configurar, usa fallback mailto: para abrir cliente de email do usuário.
// Para usar EmailJS (opcional): crie conta em https://www.emailjs.com, copie o snippet e substitua as IDs abaixo.
const contatoForm = document.getElementById('contato-form');
const contatoFeedback = document.getElementById('contato-feedback');

if (contatoForm) {
  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // coletar valores
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const perfil = document.getElementById('perfil').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // validação simples
    if (!email || !telefone || !mensagem) {
      contatoFeedback.textContent = 'Preencha os campos obrigatórios (email, telefone e mensagem).';
      contatoFeedback.style.color = '#ffd166';
      return;
    }

    contatoFeedback.textContent = 'Enviando...';
    contatoFeedback.style.color = '#164757';

  // CONFIGURAÇÕES: credenciais fornecidas
  const useEmailJS = true; // mantenha true para usar EmailJS
  const emailjsServiceID = 'service_glyg5so';
  const emailjsTemplateID = 'template_coemtym';
  const emailjsUserID = 'DesFll64BpRKGpdCt';

    const payload = {
      nome,
      email,
      telefone,
      perfil,
      mensagem,
    };

    try {
      if (useEmailJS && window.emailjs) {
        // Se EmailJS estiver disponível, usa ele (API v3) — o user/public key deve ser inicializado via emailjs.init('PUBLIC_KEY') no HTML
        await emailjs.send(emailjsServiceID, emailjsTemplateID, payload);
        contatoFeedback.textContent = 'Mensagem enviada com sucesso!';
        contatoFeedback.style.color = '#00ffcc';
        contatoForm.reset();
        return;
      }

      // Fallback: abrir cliente de e-mail via mailto: (não envia automaticamente sem cliente configurado)
      const subject = encodeURIComponent('Contato pelo site SEDU - ' + nome);
      const bodyLines = [
        `Nome: ${nome}`,
        `Email: ${email}`,
        `Telefone: ${telefone}`,
        `Perfil: ${perfil}`,
        '',
        mensagem,
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));

  // E-mail destino — fallback quando EmailJS não estiver disponível
  const destino = 'sedu_oficial@outlook.com.br';
      const mailto = `mailto:${destino}?subject=${subject}&body=${body}`;

      // abrir mailto
      window.location.href = mailto;
      contatoFeedback.textContent = 'Abrindo seu cliente de email...';
      contatoFeedback.style.color = '#00ffcc';
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      // Tentar extrair mensagem amigável do erro EmailJS
      let friendly = 'Ocorreu um erro ao enviar. Tente novamente mais tarde.';
      try {
        if (err && err.text) friendly = `Erro: ${err.text}`;
        else if (err && err.statusText) friendly = `Erro: ${err.statusText}`;
        else if (err && err.message) friendly = `Erro: ${err.message}`;
      } catch (e) {
        // ignore
      }
      contatoFeedback.textContent = friendly;
      contatoFeedback.style.color = '#ff6b6b';
    }
  });
}
