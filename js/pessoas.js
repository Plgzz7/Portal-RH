// ===== PÁGINA DE PESSOAS =====
// Renderiza os cards do time, com busca e filtro por departamento.

let filtroDept = 'todos';
let busca = '';

const peopleGrid = document.getElementById('people-grid');
const peopleCount = document.getElementById('people-count');
const searchInput = document.getElementById('people-search');
const chipsBox = document.getElementById('filter-chips');

// Avatar da topbar com a inicial do usuário logado
const topbarAvatar = document.getElementById('topbar-avatar');
const loggedUser = localStorage.getItem('empireads-user-name');
if (topbarAvatar && loggedUser) topbarAvatar.textContent = loggedUser.trim()[0].toUpperCase();

// Gera os chips de filtro a partir dos departamentos cadastrados
DEPARTAMENTOS.forEach(dep => {
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.dataset.dept = dep.id;
    chip.textContent = dep.nome;
    chipsBox.appendChild(chip);
});

function pessoaCard(p) {
    const badges = p.departamentos
        .map(id => `<span class="dept-badge dept-${id}">${getDepartamento(id).nome}</span>`)
        .join('');
    const corAvatar = 'dept-' + p.departamentos[0];

    return `
        <article class="person-card">
            <div class="person-top">
                <span class="person-avatar ${corAvatar}">${getIniciais(p.nome)}</span>
                <div class="person-info">
                    <h4>${p.nome}</h4>
                    <p class="person-role">${p.cargo}</p>
                </div>
            </div>
            <div class="person-tags">${badges}</div>
            <div class="person-contacts">
                <a class="person-contact" href="mailto:${p.email}">
                    <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    ${p.email}
                </a>
                <a class="person-contact" href="${telefoneLink(p.telefone)}" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ${p.telefone}
                </a>
            </div>
        </article>`;
}

function renderPessoas() {
    const termo = busca.toLowerCase();
    const lista = PESSOAS.filter(p => {
        const matchDept = filtroDept === 'todos' || p.departamentos.includes(filtroDept);
        const matchBusca = !termo
            || p.nome.toLowerCase().includes(termo)
            || p.cargo.toLowerCase().includes(termo)
            || p.email.toLowerCase().includes(termo);
        return matchDept && matchBusca;
    });

    peopleGrid.innerHTML = lista.length
        ? lista.map(pessoaCard).join('')
        : '<p class="people-empty">Nenhuma pessoa encontrada com esses filtros.</p>';

    peopleCount.textContent = lista.length + (lista.length === 1 ? ' pessoa' : ' pessoas');
}

chipsBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    chipsBox.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filtroDept = chip.dataset.dept;
    renderPessoas();
});

searchInput.addEventListener('input', (e) => {
    busca = e.target.value;
    renderPessoas();
});

renderPessoas();
