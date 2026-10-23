// ===== GUARDA DE AUTENTICAÇÃO =====
// Redireciona para o login (index.html) se o usuário não estiver autenticado.
(function () {
    if (!localStorage.getItem('empireads-user-name')) {
        window.location.replace('index.html');
    }
})();

// Logout: limpa a sessão ao clicar em "Sair"
document.addEventListener('click', (e) => {
    const sair = e.target.closest('a[href="index.html"]');
    if (sair) localStorage.removeItem('empireads-user-name');
});
