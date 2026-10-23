# ===== CONFIGURAÇÃO DO SUPABASE =====
# Para desenvolvimento local, copie este arquivo para config.js e preencha os valores.
# No Netlify, essas variáveis são configuradas no painel.

const CONFIG_SUPABASE = {
    URL: 'https://mrrufxybzbqzbfvemgcr.supabase.co',
    ANON_KEY: 'sb_publishable_IeqXRTlSLhD8Wx2i_To4bA_5Kgf--p_'
};

// Se estiver no Netlify, usa variáveis de ambiente
if (typeof process !== 'undefined' && process.env) {
    CONFIG_SUPABASE.URL = process.env.SUPABASE_URL || CONFIG_SUPABASE.URL;
    CONFIG_SUPABASE.ANON_KEY = process.env.SUPABASE_ANON_KEY || CONFIG_SUPABASE.ANON_KEY;
}
