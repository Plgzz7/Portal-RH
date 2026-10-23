// ===== PÁGINA DE DEPARTAMENTOS =====
// Renderiza um card por departamento com as funções da área e o time.

const deptGrid = document.getElementById('dept-grid');

// Avatar da topbar com a inicial do usuário logado
const topbarAvatar = document.getElementById('topbar-avatar');
const loggedUser = localStorage.getItem('empireads-user-name');
if (topbarAvatar && loggedUser) topbarAvatar.textContent = loggedUser.trim()[0].toUpperCase();

function deptCard(dep) {
    const membros = PESSOAS.filter(p => p.departamentos.includes(dep.id));

    const funcoesHtml = dep.funcoes
        .map(f => `<span class="funcao-chip">${f}</span>`)
        .join('');

    const membrosHtml = membros.length
        ? membros.map(m => `
            <div class="dept-member">
                <span class="dept-member-avatar dept-${dep.id}">${getIniciais(m.nome)}</span>
                <span class="dept-member-name">${m.nome}<span class="dept-member-role"> · ${m.cargo}</span></span>
            </div>`).join('')
        : '<p class="dept-empty">Nenhuma pessoa alocada neste departamento ainda.</p>';

    return `
        <section class="card dept-card">
            <div class="dept-head">
                <span class="dept-icon dept-${dep.id}">
                    <svg viewBox="0 0 24 24">${dep.icone}</svg>
                </span>
                <div>
                    <h3>${dep.nome}</h3>
                    <p class="dept-count">${membros.length} ${membros.length === 1 ? 'pessoa' : 'pessoas'}</p>
                </div>
            </div>
            <p class="dept-desc">${dep.descricao}</p>
            <div class="dept-section">
                <span class="ponto-label">Funções da área</span>
                <div class="dept-funcoes">${funcoesHtml}</div>
            </div>
            <div class="dept-members">
                <span class="ponto-label">Time</span>
                ${membrosHtml}
            </div>
        </section>`;
}

deptGrid.innerHTML = DEPARTAMENTOS.map(deptCard).join('');
