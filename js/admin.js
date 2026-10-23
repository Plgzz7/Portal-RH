// ===== PAINEL DE ADMINISTRAÇÃO =====
// Lógica da página admin.html

// Aguarda o DOM carregar para verificar admin
document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se é admin, senão redireciona
    if (typeof isAdmin === 'function' && !isAdmin()) {
        window.location.replace('home.html');
        return;
    }

    // Mostra a aba admin no menu
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) navAdmin.style.display = 'flex';

    // Inicialização
    await carregarUsuarios();
    definirDatasPadrao();
    await carregarPontos();
    atualizarAvatar();
});

// Atualiza avatar com inicial do usuário
function atualizarAvatar() {
    const usuario = getUsuarioLogado();
    const avatarEl = document.querySelector('.topbar-actions .avatar');
    if (avatarEl && usuario.nome) {
        avatarEl.textContent = usuario.nome.trim()[0].toUpperCase();
    }
}

// Define datas padrão (últimos 30 dias)
function definirDatasPadrao() {
    const hoje = new Date();
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - 30);
    
    document.getElementById('filtro-data-inicio').value = inicio.toISOString().split('T')[0];
    document.getElementById('filtro-data-fim').value = hoje.toISOString().split('T')[0];
}

// Carrega lista de usuários para o filtro
async function carregarUsuarios() {
    const { data: usuarios } = await PontoService.getUsuariosComPonto();
    const select = document.getElementById('filtro-usuario');
    
    usuarios.forEach(u => {
        const option = document.createElement('option');
        option.value = u.usuario_email;
        option.textContent = u.usuario_nome;
        select.appendChild(option);
    });
}

// Carrega pontos conforme filtros
async function carregarPontos() {
    const email = document.getElementById('filtro-usuario').value;
    const dataInicio = document.getElementById('filtro-data-inicio').value;
    const dataFim = document.getElementById('filtro-data-fim').value;
    
    const tbody = document.getElementById('tabela-body');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Carregando...</td></tr>';
    
    let resultado;
    if (email) {
        resultado = await PontoService.getPontosUsuario(email, dataInicio, dataFim);
    } else {
        resultado = await PontoService.getPontosTodos(dataInicio, dataFim);
    }
    
    if (resultado.error) {
        tbody.innerHTML = '<tr><td colspan="6" class="error">Erro ao carregar dados</td></tr>';
        console.error(resultado.error);
        return;
    }
    
    renderizarTabela(resultado.data);
}

// Renderiza tabela com os dados
function renderizarTabela(dados) {
    const tbody = document.getElementById('tabela-body');
    
    if (!dados || dados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">Nenhum registro encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = dados.map(p => {
        const horas = calcularHoras(p.hora_entrada, p.hora_saida);
        return `
            <tr>
                <td>${formatarDataBR(p.data)}</td>
                <td>${p.usuario_nome}</td>
                <td>${p.hora_entrada || '--:--'}</td>
                <td>${p.hora_saida || '--:--'}</td>
                <td>${p.observacao || '-'}</td>
                <td>${horas}</td>
            </tr>
        `;
    }).join('');
}

// Calcula horas trabalhadas
function calcularHoras(entrada, saida) {
    if (!entrada || !saida) return '--:--';
    
    const [h1, m1] = entrada.split(':').map(Number);
    const [h2, m2] = saida.split(':').map(Number);
    
    let minutos = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (minutos > 360) minutos -= 60; // desconta almoço
    
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Formata data para BR
function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Limpa filtros
function limparFiltros() {
    document.getElementById('filtro-usuario').value = '';
    definirDatasPadrao();
    carregarPontos();
}

// Variável para controlar tipo de exportação
let tipoExportacao = null;

// Abre modal de exportação
function exportarDados(tipo) {
    tipoExportacao = tipo;
    const modal = document.getElementById('modal-export');
    const usuarioSelecionado = document.getElementById('filtro-usuario').value;
    const btnUsuario = document.getElementById('export-usuario');
    
    // Se tem usuário selecionado, habilita opção individual
    if (usuarioSelecionado) {
        const nome = document.getElementById('filtro-usuario').selectedOptions[0].textContent;
        btnUsuario.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Apenas ${nome.split(' ')[0]}
        `;
        btnUsuario.disabled = false;
    } else {
        btnUsuario.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Apenas este usuário
        `;
        btnUsuario.disabled = true;
    }
    
    modal.style.display = 'flex';
    
    // Configura ações dos botões
    document.getElementById('export-usuario').onclick = () => {
        fecharModal();
        executarExportacao(tipoExportacao, false);
    };
    
    document.getElementById('export-todos').onclick = () => {
        fecharModal();
        executarExportacao(tipoExportacao, true);
    };
}

// Fecha modal
function fecharModal() {
    document.getElementById('modal-export').style.display = 'none';
}

// Fecha modal ao clicar fora
document.getElementById('modal-export').addEventListener('click', (e) => {
    if (e.target.id === 'modal-export') fecharModal();
});
