// ===== PÁGINA DE CULTURA =====
// Renderiza os valores da EmpireAds em cards compactos.

const cultureValues = document.getElementById('culture-values');

// Avatar da topbar com a inicial do usuário logado
const topbarAvatar = document.getElementById('topbar-avatar');
const loggedUser = localStorage.getItem('empireads-user-name');
if (topbarAvatar && loggedUser) topbarAvatar.textContent = loggedUser.trim()[0].toUpperCase();

function cultureCard(cultura) {
    return `
        <div class="culture-value-card">
            <span class="culture-value-icon">
                <svg viewBox="0 0 24 24">${cultura.icone}</svg>
            </span>
            <h4>${cultura.titulo}</h4>
            <p>${cultura.descricao}</p>
        </div>`;
}

cultureValues.innerHTML = CULTURAS.map(cultureCard).join('');
