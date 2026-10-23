// ===== CONEXÃO COM SUPABASE =====
// Configuração do cliente Supabase para o Portal EmpireAds

// Tenta carregar do config.js (desenvolvimento local)
// Se não existir, usa as credenciais padrão (produção/StayCloud)
const SUPABASE_URL = typeof CONFIG_SUPABASE !== 'undefined' 
    ? CONFIG_SUPABASE.URL 
    : 'https://mrrufxybzbqzbfvemgcr.supabase.co';

const SUPABASE_ANON_KEY = typeof CONFIG_SUPABASE !== 'undefined' 
    ? CONFIG_SUPABASE.ANON_KEY 
    : 'sb_publishable_IeqXRTlSLhD8Wx2i_To4bA_5Kgf--p_';

// Inicializa o cliente Supabase (global para uso em outros arquivos)
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alias para compatibilidade
const supabase = window.supabaseClient;

// Helper: pega o usuário logado do localStorage
function getUsuarioLogado() {
    return {
        nome: localStorage.getItem('empireads-user-name'),
        email: localStorage.getItem('empireads-user-email'),
        admin: localStorage.getItem('empireads-user-admin') === 'true'
    };
}

// Helper: verifica se é admin
function isAdmin() {
    return getUsuarioLogado().admin;
}

// Helper: formata data para o Supabase (YYYY-MM-DD)
function formatarDataSupabase(data) {
    return data.toISOString().split('T')[0];
}

// Helper: formata hora para o Supabase (HH:MM:SS)
function formatarHoraSupabase(data) {
    return data.toTimeString().split(' ')[0];
}
