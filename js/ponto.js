// ===== RELÓGIO DE PONTO =====
const CONFIG = {
    funcionario: 'Eliabe Monteiro',
    entradaEsperada: '09:00',
    jornada: '08:00',
    almoco: '01:00'
};

let pontoHoje = {
    entrada: null,
    saida: null,
    observacao: ''
};

function pad(n) { return n.toString().padStart(2, '0'); }

function timeToMinutes(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

function minutesToTime(mins) {
    const h = Math.floor(Math.abs(mins) / 60);
    const m = Math.abs(mins) % 60;
    return pad(h) + ':' + pad(m);
}

function atualizarRelogio() {
    const now = new Date();
    const clockEl = document.getElementById('ponto-clock');
    if (clockEl) clockEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());

    const dateEl = document.getElementById('ponto-date');
    if (dateEl) {
        const dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
        const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        dateEl.textContent = dias[now.getDay()] + ', ' + now.getDate() + ' ' + meses[now.getMonth()] + ' ' + now.getFullYear();
    }
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

function isPlantao(date, obs) {
    if (date.getDay() === 6) return true; // sábado
    return /plant[aã]o/i.test(obs || '');
}

function registrarPonto(tipo) {
    const now = new Date();
    const horaAtual = pad(now.getHours()) + ':' + pad(now.getMinutes());
    const obs = '';

    if (tipo === 'entrada' && !pontoHoje.entrada) {
        pontoHoje.entrada = horaAtual;
        pontoHoje.observacao = obs;
        document.getElementById('btn-entrada').disabled = true;
        document.getElementById('btn-saida').disabled = false;
        atualizarStatus('entrada');
        mostrarResumo();
    } else if (tipo === 'saida' && pontoHoje.entrada && !pontoHoje.saida) {
        pontoHoje.saida = horaAtual;
        document.getElementById('btn-saida').disabled = true;
        atualizarStatus('finalizado');
        mostrarResumo();
    }
}

function atualizarStatus(status) {
    const el = document.getElementById('ponto-status-text');
    const dot = document.querySelector('.ponto-status-dot');
    const statusEl = document.getElementById('ponto-status');
    if (!el || !dot || !statusEl) return;
    statusEl.classList.remove('status-andamento', 'status-finalizado');
    if (status === 'entrada') {
        el.textContent = 'Em andamento';
        dot.style.background = '#f3ab05';
        statusEl.classList.add('status-andamento');
    } else if (status === 'finalizado') {
        el.textContent = 'Finalizado';
        dot.style.background = '#4caf50';
        statusEl.classList.add('status-finalizado');
    } else {
        el.textContent = 'Fora do expediente';
        dot.style.background = '#6e6f75';
    }
}

function mostrarResumo() {
    const summary = document.getElementById('ponto-summary');
    const info = document.getElementById('ponto-info');
    if (!summary) return;

    const entrada = pontoHoje.entrada;
    const saida = pontoHoje.saida;
    const plantao = isPlantao(new Date(), pontoHoje.observacao);

    document.getElementById('ponto-entrada').textContent = entrada || '--:--';
    document.getElementById('ponto-saida').textContent = saida || '--:--';

    let horasTrabalhadas = '--:--';
    let saldo = '--:--';
    let saldoClass = '';

    if (entrada && saida) {
        let diff = timeToMinutes(saida) - timeToMinutes(entrada);
        if (!plantao && diff > 360) diff -= 60; // desconta almoço se > 6h
        horasTrabalhadas = minutesToTime(diff);

        if (!plantao) {
            const jornadaMin = timeToMinutes(CONFIG.jornada);
            const saldoMin = diff - jornadaMin;
            saldo = (saldoMin >= 0 ? '+' : '-') + minutesToTime(Math.abs(saldoMin));
            saldoClass = saldoMin > 0 ? 'positivo' : saldoMin < 0 ? 'negativo' : 'neutro';
        } else {
            saldo = '⚪ 00:00';
            saldoClass = 'neutro';
        }
    }

    const horasEl = document.getElementById('ponto-horas');
    const saldoEl = document.getElementById('ponto-saldo');
    if (horasEl) horasEl.textContent = horasTrabalhadas;
    if (saldoEl) {
        saldoEl.textContent = saldo;
        saldoEl.className = 'ponto-value ' + saldoClass;
    }

    summary.style.display = 'grid';
    if (info) info.style.display = 'none';
}
