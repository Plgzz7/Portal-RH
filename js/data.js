// ===== DADOS DO PORTAL EMPIREADS =====
// Fonte única de dados: departamentos, pessoas e usuários de acesso.

const DEPARTAMENTOS = [
    {
        id: 'diretoria',
        nome: 'Diretoria',
        descricao: 'Definição de estratégia, metas e visão de crescimento da EmpireAds.',
        funcoes: [
            'Estratégia e visão de negócio',
            'Gestão de resultados',
            'Relações institucionais',
            'Tomada de decisão'
        ],
        icone: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
    },
    {
        id: 'trafego',
        nome: 'Tráfego',
        descricao: 'Gestão e otimização de campanhas de mídia paga e aquisição de clientes.',
        funcoes: [
            'Gestor de Tráfego',
            'Campanhas Meta Ads e Google Ads',
            'Otimização de verba e ROI',
            'Análise de métricas e relatórios'
        ],
        icone: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'
    },
    {
        id: 'marketing',
        nome: 'Marketing',
        descricao: 'Conteúdo, identidade e presença digital da marca EmpireAds.',
        funcoes: [
            'Gestão de redes sociais',
            'Criação de conteúdo',
            'Design gráfico',
            'Copywriting',
            'Edição de vídeos'
        ],
        icone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'
    },
    {
        id: 'crm',
        nome: 'CRM & Automações',
        descricao: 'Gestão do relacionamento com clientes e automação de processos comerciais.',
        funcoes: [
            'Gestão de CRM',
            'Automação de fluxos e funis',
            'E-mail marketing',
            'Integrações e webhooks'
        ],
        icone: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    },
    {
        id: 'sdr',
        nome: 'SDR',
        descricao: 'Prospecção e qualificação de leads para o time comercial.',
        funcoes: [
            'Prospecção ativa',
            'Qualificação de leads',
            'Agendamento de reuniões',
            'Follow-up de oportunidades'
        ],
        icone: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm18 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z"/><path d="M3 11v-2a9 9 0 0 1 18 0v2"/>'
    },
    {
        id: 'financeiro',
        nome: 'Financeiro',
        descricao: 'Controle financeiro, cobranças e saúde do caixa da empresa.',
        funcoes: [
            'Contas a pagar e receber',
            'Faturamento e cobrança',
            'Fluxo de caixa',
            'Relatórios financeiros'
        ],
        icone: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
    }
];

const PESSOAS = [
    {
        nome: 'Junior Almeida',
        cargo: 'Diretor',
        departamentos: ['diretoria'],
        email: 'junior.almeida@empireads.com.br',
        telefone: '11 98453-5907'
    },
    {
        nome: 'Eliabe Santos',
        cargo: 'Gestor de Tráfego',
        departamentos: ['trafego'],
        email: 'eliabe.santos@empireads.com.br',
        telefone: '11 96093-4434'
    },
    {
        nome: 'Kennedy Wanderson',
        cargo: 'Diretor & CRM e Automações',
        departamentos: ['diretoria', 'crm'],
        email: 'kennedy.wanderson@empireads.com.br',
        telefone: '11 95449-5028'
    },
    {
        nome: 'Matheus Gomes',
        cargo: 'Gestor de Tráfego',
        departamentos: ['trafego'],
        email: 'matheus.gomes@empireads.com.br',
        telefone: '11 96505-7281'
    },
    {
        nome: 'Rafaella Gomes',
        cargo: 'Marketing',
        departamentos: ['marketing'],
        email: 'rafaella.lopes@empireads.com.br',
        telefone: '11 93013-1570'
    },
    {
        nome: 'Ryan Silva',
        cargo: 'Gestor de Tráfego',
        departamentos: ['trafego'],
        email: 'ryan.silva@empireads.com.br',
        telefone: '11 96652-7360'
    },
    {
        nome: 'Victor Alves',
        cargo: 'CRM & Automações',
        departamentos: ['crm'],
        email: 'victor.ribeiro@empireads.com.br',
        telefone: '11 96109-6011'
    },
    {
        nome: 'Rhafaelly Lima',
        cargo: 'Financeiro',
        departamentos: ['financeiro'],
        email: 'rhafaelly.lima@empireads.com.br',
        telefone: '11 98354-3618'
    }
];

// ===== USUÁRIOS COM ACESSO AO PORTAL =====
// Senha padrão de primeiro acesso: Empire123
const SENHA_PADRAO = 'Empire123';
// Senha exclusiva do administrador (Junior Almeida)
const SENHA_ADMIN = '3mp1r3@2026';

const USUARIOS = [
    { nome: 'Administrador', email: 'admin@empireads.com.br', senha: SENHA_PADRAO, admin: true },
    ...PESSOAS.map(p => ({
        nome: p.nome,
        email: p.email,
        senha: p.email === 'junior.almeida@empireads.com.br' ? SENHA_ADMIN : SENHA_PADRAO,
        admin: p.email === 'junior.almeida@empireads.com.br'
    }))
];

// ===== CULTURA DA EMPIREADS =====
const CULTURAS = [
    {
        titulo: 'Extremo comprometimento com resultados',
        descricao: 'Não medimos esforços para entregar o que foi combinado. Cada campanha, cada projeto e cada tarefa tem um objetivo claro, e trabalhamos com foco total até alcançá-lo. Resultado é a nossa principal métrica de sucesso.',
        icone: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'
    },
    {
        titulo: 'Relação Ganha-Ganha',
        descricao: 'Acreditamos que parcerias só duram quando todos saem ganhando. Buscamos construir relações em que cliente, empresa e colaborador cresçam juntos, com acordos justos e benefícios mútuos em cada negociação.',
        icone: '<path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"/><path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"/><path d="M7 17h.01"/><path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"/>'
    },
    {
        titulo: 'Proatividade',
        descricao: 'Não esperamos o problema acontecer para agir. Antecipamos necessidades, propomos melhorias e tomamos a iniciativa. Quem é proativo enxerga oportunidades onde os outros veem apenas rotina.',
        icone: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
    },
    {
        titulo: 'Foco e organização',
        descricao: 'Com processos bem definidos e prioridades claras, eliminamos desperdício de tempo e energia. Organização não é burocracia: é o que nos permite escalar com qualidade e manter a consistência nas entregas.',
        icone: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>'
    },
    {
        titulo: 'Excelência em tudo que fazemos',
        descricao: 'Do menor ajuste de campanha ao maior contrato, entregamos sempre o nosso melhor. Excelência é um hábito diário: revisar, testar, refinar e nunca se contentar com o "mais ou menos".',
        icone: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>'
    },
    {
        titulo: 'Transparência e Lealdade',
        descricao: 'Falamos a verdade, mesmo quando é difícil. Compartilhamos resultados, erros e aprendizados com clareza, e defendemos quem está do nosso lado. Confiança é a base de qualquer relação duradoura.',
        icone: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>'
    }
];

// ===== HELPERS COMPARTILHADOS =====
function getDepartamento(id) {
    return DEPARTAMENTOS.find(d => d.id === id);
}

function getIniciais(nome) {
    const partes = nome.trim().split(/\s+/);
    const primeira = partes[0][0];
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
}

function telefoneLink(telefone) {
    return 'https://wa.me/55' + telefone.replace(/\D/g, '');
}
