// ===== BUSCA GLOBAL COM SUGESTÕES =====
// Dropdown de busca na topbar com páginas e pessoas

(function () {
    const input = document.getElementById('search-input');
    const dropdown = document.getElementById('search-dropdown');
    if (!input || !dropdown) return;

    const items = Array.from(dropdown.querySelectorAll('.search-item'));
    let highlightedIndex = -1;

    // Abre o dropdown ao focar/clicar no input
    input.addEventListener('focus', () => {
        dropdown.classList.add('visible');
        filtrar(input.value);
    });

    // Filtra conforme digita
    input.addEventListener('input', () => {
        dropdown.classList.add('visible');
        filtrar(input.value);
        highlightedIndex = -1;
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            dropdown.classList.remove('visible');
        }
    });

    // Navegação por teclado (setas + Enter)
    input.addEventListener('keydown', (e) => {
        const visiveis = items.filter(i => !i.classList.contains('search-item-hidden'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, visiveis.length - 1);
            destacar(visiveis);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
            destacar(visiveis);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && visiveis[highlightedIndex]) {
                window.location.href = visiveis[highlightedIndex].href;
            } else if (visiveis.length > 0) {
                window.location.href = visiveis[0].href;
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('visible');
            input.blur();
        }
    });

    function destacar(visiveis) {
        visiveis.forEach((item, i) => {
            item.classList.toggle('highlighted', i === highlightedIndex);
        });
        if (highlightedIndex >= 0 && visiveis[highlightedIndex]) {
            visiveis[highlightedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function filtrar(termo) {
        const t = termo.trim().toLowerCase();
        let algumVisivel = false;

        items.forEach(item => {
            const texto = item.textContent.toLowerCase();
            const keywords = (item.dataset.keywords || '').toLowerCase();
            const match = !t || texto.includes(t) || keywords.includes(t);
            item.classList.toggle('search-item-hidden', !match);
            if (match) algumVisivel = true;
        });

        // Mostra mensagem se nada for encontrado
        let empty = dropdown.querySelector('.search-empty');
        if (!algumVisivel && t) {
            if (!empty) {
                empty = document.createElement('div');
                empty.className = 'search-empty';
                empty.textContent = 'Nenhum resultado encontrado';
                dropdown.appendChild(empty);
            }
        } else if (empty) {
            empty.remove();
        }
    }
})();
