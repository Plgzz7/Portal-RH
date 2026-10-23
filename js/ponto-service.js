// ===== SERVIÇO DE PONTO =====
// Funções para salvar e buscar registros de ponto no Supabase
// Versão: 2.0

// Helpers locais (fallback caso supabase.js não tenha carregado)
function _getUsuarioLogado() {
    if (typeof getUsuarioLogado === 'function') return getUsuarioLogado();
    return {
        nome: localStorage.getItem('empireads-user-name'),
        email: localStorage.getItem('empireads-user-email'),
        admin: localStorage.getItem('empireads-user-admin') === 'true'
    };
}

function _formatarDataSupabase(data) {
    if (typeof formatarDataSupabase === 'function') return formatarDataSupabase(data);
    return data.toISOString().split('T')[0];
}

function _formatarHoraSupabase(data) {
    if (typeof formatarHoraSupabase === 'function') return formatarHoraSupabase(data);
    return data.toTimeString().split(' ')[0];
}

const PontoService = {
    
    // Cliente Supabase (usa global ou cria fallback)
    _client() {
        if (window._sb) return window._sb;
        if (window.supabaseClient) return window.supabaseClient;
        return window.supabase.createClient(
            'https://mrrufxybzbqzbfvemgcr.supabase.co',
            'sb_publishable_IeqXRTlSLhD8Wx2i_To4bA_5Kgf--p_'
        );
    },
    
    // Salva um novo registro de ponto
    async salvarRegistro(dados) {
        const usuario = _getUsuarioLogado();
        const agora = new Date();
        
        const registro = {
            usuario_email: usuario.email,
            usuario_nome: usuario.nome,
            data: _formatarDataSupabase(agora),
            hora_entrada: dados.tipo === 'entrada' ? _formatarHoraSupabase(agora) : null,
            hora_saida: dados.tipo === 'saida' ? _formatarHoraSupabase(agora) : null,
            observacao: dados.observacao || null
        };

        // Se já existe registro hoje, atualiza; senão, cria novo
        const { data: existente } = await this._client()
            .from('registros_ponto')
            .select('id')
            .eq('usuario_email', usuario.email)
            .eq('data', registro.data)
            .single();

        if (existente) {
            // Atualiza o registro existente
            const updateData = dados.tipo === 'entrada' 
                ? { hora_entrada: registro.hora_entrada, observacao: registro.observacao }
                : { hora_saida: registro.hora_saida, observacao: registro.observacao };
                
            const { error } = await this._client()
                .from('registros_ponto')
                .update(updateData)
                .eq('id', existente.id);
                
            return { success: !error, error };
        } else {
            // Cria novo registro
            const { error } = await this._client()
                .from('registros_ponto')
                .insert([registro]);
                
            return { success: !error, error };
        }
    },

    // Busca o ponto do usuário logado hoje
    async getPontoHoje() {
        const usuario = _getUsuarioLogado();
        const hoje = _formatarDataSupabase(new Date());
        
        const { data, error } = await this._client()
            .from('registros_ponto')
            .select('*')
            .eq('usuario_email', usuario.email)
            .eq('data', hoje)
            .single();
            
        return { data, error };
    },

    // Busca todos os pontos de um usuário em um período
    async getPontosUsuario(email, dataInicio, dataFim) {
        const { data, error } = await this._client()
            .from('registros_ponto')
            .select('*')
            .eq('usuario_email', email)
            .gte('data', dataInicio)
            .lte('data', dataFim)
            .order('data', { ascending: false });
            
        return { data, error };
    },

    // Busca pontos de todos os usuários em um período (admin)
    async getPontosTodos(dataInicio, dataFim) {
        const { data, error } = await this._client()
            .from('registros_ponto')
            .select('*')
            .gte('data', dataInicio)
            .lte('data', dataFim)
            .order('data', { ascending: false })
            .order('usuario_nome', { ascending: true });
            
        return { data, error };
    },

    // Lista todos os usuários únicos que já bateram ponto
    async getUsuariosComPonto() {
        const { data, error } = await this._client()
            .from('registros_ponto')
            .select('usuario_email, usuario_nome')
            .order('usuario_nome');
            
        // Remove duplicatas
        const unicos = data ? [...new Map(data.map(u => [u.usuario_email, u])).values()] : [];
        return { data: unicos, error };
    }
};
