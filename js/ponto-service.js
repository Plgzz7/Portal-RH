// ===== SERVIÇO DE PONTO =====
// Funções para salvar e buscar registros de ponto no Supabase

const PontoService = {
    
    // Salva um novo registro de ponto
    async salvarRegistro(dados) {
        const usuario = getUsuarioLogado();
        const agora = new Date();
        
        const registro = {
            usuario_email: usuario.email,
            usuario_nome: usuario.nome,
            data: formatarDataSupabase(agora),
            hora_entrada: dados.tipo === 'entrada' ? formatarHoraSupabase(agora) : null,
            hora_saida: dados.tipo === 'saida' ? formatarHoraSupabase(agora) : null,
            observacao: dados.observacao || null
        };

        // Se já existe registro hoje, atualiza; senão, cria novo
        const { data: existente } = await supabase
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
                
            const { error } = await supabase
                .from('registros_ponto')
                .update(updateData)
                .eq('id', existente.id);
                
            return { success: !error, error };
        } else {
            // Cria novo registro
            const { error } = await supabase
                .from('registros_ponto')
                .insert([registro]);
                
            return { success: !error, error };
        }
    },

    // Busca o ponto do usuário logado hoje
    async getPontoHoje() {
        const usuario = getUsuarioLogado();
        const hoje = formatarDataSupabase(new Date());
        
        const { data, error } = await supabase
            .from('registros_ponto')
            .select('*')
            .eq('usuario_email', usuario.email)
            .eq('data', hoje)
            .single();
            
        return { data, error };
    },

    // Busca todos os pontos de um usuário em um período
    async getPontosUsuario(email, dataInicio, dataFim) {
        const { data, error } = await supabase
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
        const { data, error } = await supabase
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
        const { data, error } = await supabase
            .from('registros_ponto')
            .select('usuario_email, usuario_nome')
            .order('usuario_nome');
            
        // Remove duplicatas
        const unicos = data ? [...new Map(data.map(u => [u.usuario_email, u])).values()] : [];
        return { data: unicos, error };
    }
};
