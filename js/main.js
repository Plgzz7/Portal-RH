// ===== SAUDAÇÃO DINÂMICA =====
const hour = new Date().getHours();
let saudacao = 'Boa noite';
if (hour >= 5 && hour < 12) saudacao = 'Bom dia';
else if (hour >= 12 && hour < 18) saudacao = 'Boa tarde';
document.getElementById('greeting-title').textContent = saudacao + ', Alex';
