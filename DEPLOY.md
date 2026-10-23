# Portal EmpireAds - Instruções de Deploy

## 🚀 Como subir para o GitHub + Netlify

### Passo 1: Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `portal-empireads`
3. **Marque como Private** (recomendado, mesmo com as chaves protegidas)
4. Clique em **Create repository**

### Passo 2: Subir o código

No terminal, dentro da pasta do projeto:

```bash
# Inicializa o git (se ainda não tiver)
git init

# Adiciona todos os arquivos (o .gitignore vai excluir o config.js)
git add .

# Faz o primeiro commit
git commit -m "feat: portal EmpireAds com sistema de ponto e admin"

# Conecta ao repositório do GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/portal-empireads.git

# Envia o código
git push -u origin main
```

### Passo 3: Deploy no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **Add new site** → **Import an existing project**
3. Conecte sua conta do **GitHub** e selecione o repositório `portal-empireads`
4. Configure:
   - **Build command**: deixe em branco
   - **Publish directory**: `.` (ponto)
5. Clique em **Show advanced** → **New variable** e adicione:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://mrrufxybzbqzbfvemgcr.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_IeqXRTlSLhD8Wx2i_To4bA_5Kgf--p_` |

6. Clique em **Deploy site**

### Passo 4: Configurar domínio (opcional)

O Netlify gera uma URL tipo `random-name-123.netlify.app`. Para mudar:

1. Vá em **Site settings** → **Change site name**
2. Escolha algo como `portal-empireads.netlify.app`

---

## 📁 Estrutura do projeto

```
portal-empireads/
├── index.html          # Login
├── home.html           # Página inicial
├── ponto.html          # Relógio de ponto
├── pessoas.html        # Lista de pessoas
├── departamentos.html  # Departamentos
├── cultura.html        # Cultura da empresa
├── admin.html          # ⭐ Administração (só admin)
├── style.css           # Estilos principais
├── login.css           # Estilos do login
├── netlify.toml        # Configuração do Netlify
├── .gitignore          # Arquivos ignorados pelo Git
├── js/
│   ├── config.js       # ⚠️ NÃO commitar (tem chaves)
│   ├── config.example.js  # Exemplo sem valores reais
│   ├── supabase.js     # Conexão com banco
│   ├── ponto-service.js # Lógica de ponto
│   ├── admin.js        # Lógica do admin
│   ├── export.js       # Exportar Excel/PDF
│   ├── auth.js         # Autenticação
│   ├── data.js         # Dados de usuários/departamentos
│   ├── main.js         # Scripts gerais
│   ├── pessoas.js      # Lógica da página pessoas
│   ├── departamentos.js # Lógica de departamentos
│   ├── cultura.js      # Lógica da cultura
│   └── ponto.js        # Lógica do ponto (backup)
└── img/                # Imagens do projeto
```

---

## 🔒 Segurança

- ✅ `js/config.js` está no `.gitignore` → nunca vai pro GitHub
- ✅ `js/config.example.js` é o modelo sem valores reais
- ✅ No Netlify, as chaves ficam em variáveis de ambiente
- ✅ O repositório pode ser privado para segurança extra

---

## 🛠️ Desenvolvimento local

Para rodar na sua máquina:

```bash
# 1. Copie o arquivo de configuração
cp js/config.example.js js/config.js

# 2. Edite js/config.js com suas chaves reais

# 3. Rode um servidor local
npx serve .
# ou
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

---

## 📋 Checklist final

- [ ] Criar repositório no GitHub (privado)
- [ ] Subir código com `git push`
- [ ] Criar conta no Netlify
- [ ] Conectar repositório no Netlify
- [ ] Configurar variáveis de ambiente
- [ ] Testar o site deployado
- [ ] Criar tabela no Supabase (SQL abaixo)

```sql
CREATE TABLE registros_ponto (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_email VARCHAR(255) NOT NULL,
    usuario_nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    hora_entrada TIME,
    hora_saida TIME,
    observacao TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_registros_email ON registros_ponto(usuario_email);
CREATE INDEX idx_registros_data ON registros_ponto(data);

ALTER TABLE registros_ponto DISABLE ROW LEVEL SECURITY;
```

---

Pronto! Qualquer dúvida em algum passo, me avisa.
