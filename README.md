# Portal EmpireAds

Portal corporativo com sistema de relógio de ponto integrado.

## Estrutura

```
Projeto portal/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos do portal
├── js/
│   ├── main.js         # Scripts principais (saudação, etc)
│   └── ponto.js        # Lógica do relógio de ponto
├── assets/             # Imagens e ícones
│   ├── logo-final-branco.webp
│   ├── logo-empireads.png
│   ├── 2.png           # Favicon
│   ├── Espaço EmpireAds em Preto e Dourado.png
│   └── Ícone de Monitor com Gráficos de Crescimento.png
└── README.md
```

## Funcionalidades

### Relógio de Ponto
- Registro de entrada e saída
- Cálculo automático de horas trabalhadas
- Desconto de almoço (1h para períodos > 6h)
- Detecção automática de plantão (sábados)
- Cálculo de saldo e horas extras
- Status em tempo real (Em andamento / Finalizado)

### Regras de Negócio
- Jornada padrão: 8h/dia
- Entrada esperada: 09:00
- Almoço: 1h (descontado automaticamente)
- Plantão: sábado ou observação contendo "plantão"
- Em plantão: sem desconto de almoço, todas horas = extras

## Como usar

1. Abra `index.html` no navegador
2. Clique em "Entrada" para registrar o início do expediente
3. Clique em "Saída" para registrar o fim do expediente
4. O resumo mostra automaticamente: horas trabalhadas, saldo e status

## Integração com Google Sheets

Para conectar ao Google Forms/Sheets conforme especificado:
1. Crie um Google Apps Script na planilha
2. Publique como Web App
3. Substitua as funções `registrarPonto()` no `ponto.js` para fazer fetch POST ao script
4. Os dados serão enviados automaticamente para a aba "Respostas"

## Tecnologias

- HTML5
- CSS3 (variáveis CSS, flexbox, grid)
- JavaScript vanilla
- Fonte: Rubik (Google Fonts)
