# 🌱 Projeto Estufa Inteligente

Sistema de monitoramento de estufa agrícola com sensores físicos, back-end em Node.js e interface web. O objetivo é fornecer uma plataforma acessível para acompanhamento em tempo real de temperatura, umidade e outros parâmetros ambientais.

---

## ✅ Funcionalidades

- Monitoramento de **temperatura** e **umidade**
- Coleta de dados com microcontrolador (ex: ESP32)
- Visualização dos dados em tempo real no navegador
- Armazenamento em banco de dados

---

## 🧰 Tecnologias Utilizadas

### Back-end
- Node.js  
- Express  
- MySQL   
- dotenv  
- cors  

### Front-end
- HTML, CSS, JavaScript puro


---

## 📁 Estrutura do Projeto

```

Projeto-Estufa/
├── estufa\_backend/         # Código Node.js (API REST)
│   ├── src/                # Código-fonte principal
│   ├── .env                # Variáveis de ambiente
│   └── package.json        # Dependências e scripts
├── Front/                  # Interface web (HTML/CSS/JS)
├── static/                 # Arquivos estáticos
└── backend\_exemplo/        # Exemplos e testes

````

---

## ⚙️ Como Executar o Projeto Localmente

### 1. Clone o repositório
```bash
git clone https://github.com/yas-cm/Projeto-Estufa.git
cd Projeto-Estufa/estufa_backend
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no exemplo abaixo:

```env
SQLPASSWORD="SuaSenhaSQL"
```

### 4. Inicie o servidor

```bash
npm run dev
```

### 5. Abra o front-end

Abra o arquivo `Front/index.html` no seu navegador para visualizar a interface da estufa.

---



---

Se quiser que eu já adicione esse conteúdo diretamente no repositório via pull request ou gere um arquivo `.md` para download, é só avisar! Deseja isso?
```
