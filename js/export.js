// ===== EXPORTAÇÃO DE DADOS =====
// Funções para exportar registros em Excel e PDF

// Executa a exportação
async function executarExportacao(tipo, todosUsuarios) {
    const email = todosUsuarios ? null : document.getElementById('filtro-usuario').value;
    const dataInicio = document.getElementById('filtro-data-inicio').value;
    const dataFim = document.getElementById('filtro-data-fim').value;
    
    // Busca os dados
    let resultado;
    if (todosUsuarios) {
        resultado = await PontoService.getPontosTodos(dataInicio, dataFim);
    } else {
        resultado = await PontoService.getPontosUsuario(email, dataInicio, dataFim);
    }
    
    if (resultado.error || !resultado.data) {
        alert('Erro ao buscar dados para exportação');
        return;
    }
    
    const dados = resultado.data;
    const nomeArquivo = todosUsuarios 
        ? `ponto_todos_${dataInicio}_a_${dataFim}`
        : `ponto_${email.split('@')[0]}_${dataInicio}_a_${dataFim}`;
    
    if (tipo === 'excel') {
        exportarExcel(dados, nomeArquivo);
    } else {
        exportarPDF(dados, nomeArquivo, todosUsuarios);
    }
}

// Exporta para Excel (CSV com encoding correto)
function exportarExcel(dados, nomeArquivo) {
    // Cabeçalho
    let csv = '\uFEFF'; // BOM para Excel reconhecer UTF-8
    csv += 'Data;Usuário;E-mail;Entrada;Saída;Observação;Horas Trabalhadas\n';
    
    // Dados
    dados.forEach(p => {
        const horas = calcularHoras(p.hora_entrada, p.hora_saida);
        const linha = [
            formatarDataBR(p.data),
            p.usuario_nome,
            p.usuario_email,
            p.hora_entrada || '--:--',
            p.hora_saida || '--:--',
            (p.observacao || '').replace(/;/g, ','), // remove ; para não quebrar CSV
            horas
        ].join(';');
        csv += linha + '\n';
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${nomeArquivo}.csv`;
    link.click();
}

// Exporta para PDF (usando jsPDF)
async function exportarPDF(dados, nomeArquivo, todosUsuarios) {
    // Carrega jsPDF dinamicamente se necessário
    if (typeof window.jspdf === 'undefined') {
        await carregarScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        await carregarScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Título
    const titulo = todosUsuarios 
        ? 'Relatório de Ponto - Time Completo'
        : `Relatório de Ponto - ${dados[0]?.usuario_nome || 'Usuário'}`;
    
    doc.setFontSize(18);
    doc.text(titulo, 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Período: ${formatarDataBR(document.getElementById('filtro-data-inicio').value)} a ${formatarDataBR(document.getElementById('filtro-data-fim').value)}`, 14, 30);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 36);
    
    // Tabela
    const colunas = ['Data', 'Usuário', 'Entrada', 'Saída', 'Horas', 'Observação'];
    const linhas = dados.map(p => [
        formatarDataBR(p.data),
        p.usuario_nome,
        p.hora_entrada || '--:--',
        p.hora_saida || '--:--',
        calcularHoras(p.hora_entrada, p.hora_saida),
        p.observacao || '-'
    ]);
    
    doc.autoTable({
        head: [colunas],
        body: linhas,
        startY: 45,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [26, 26, 46] }, // cor escura do EmpireAds
        alternateRowStyles: { fillColor: [245, 245, 250] }
    });
    
    // Totalizadores
    const totalRegistros = dados.length;
    const totalHoras = dados.reduce((acc, p) => {
        const horas = calcularHoras(p.hora_entrada, p.hora_saida);
        if (horas === '--:--') return acc;
        const [h, m] = horas.split(':').map(Number);
        return acc + h * 60 + m;
    }, 0);
    
    const h = Math.floor(totalHoras / 60);
    const m = totalHoras % 60;
    
    const finalY = doc.lastAutoTable.finalY || 45;
    doc.setFontSize(10);
    doc.text(`Total de registros: ${totalRegistros}`, 14, finalY + 10);
    doc.text(`Total de horas: ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`, 14, finalY + 16);
    
    // Download
    doc.save(`${nomeArquivo}.pdf`);
}

// Carrega script dinamicamente
function carregarScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
