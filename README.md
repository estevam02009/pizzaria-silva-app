# 🍕 Pizzaria Silva

Um aplicativo mobile de delivery para pizzaria desenvolvido em React Native com Expo, oferecendo uma experiência completa de pedidos online.

## 📱 Sobre o Projeto

O **Pizzaria Silva** é um aplicativo de delivery que permite aos clientes:
- Navegar pelo cardápio de pizzas
- Adicionar itens ao carrinho
- Inserir dados pessoais para entrega
- Acompanhar o status do pedido em tempo real

## ✨ Funcionalidades

### 🏠 Tela de Boas-vindas
- Interface acolhedora com logo da pizzaria
- Botão direto para acessar o cardápio

### 📋 Cardápio Interativo
- **Categorias de Pizza:**
  - Tradicionais (Margherita, Calabresa, Quatro Queijos)
  - Especiais (Portuguesa)
  - Doces (Chocolate)
- Modal detalhado para cada pizza
- Seleção de tamanhos
- Controle de quantidade
- Carrossel de imagens promocionais

### 🛒 Carrinho de Compras
- Visualização de itens selecionados
- Controle de quantidade por item
- Cálculo automático do total
- Remoção de itens

### 👤 Dados do Cliente
- Formulário para informações de entrega:
  - Nome completo
  - Telefone
  - Endereço

### 📊 Status do Pedido
- Acompanhamento em tempo real:
  - Vazio
  - Pendente
  - Em preparo
  - Saiu para entrega
  - Finalizado
  - Cancelado

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.79.5
- **Expo** ~53.0.20
- **React Navigation** 7.x
- **Context API** para gerenciamento de estado
- **Lucide React Native** para ícones
- **React Native Vector Icons**
- **React Native Snap Carousel**

## 📁 Estrutura do Projeto

```
pizzaria-silva/
├── assets/                 # Imagens e ícones
├── context/               # Contextos React
│   ├── CartContext.js     # Gerenciamento do carrinho
│   └── ClientContext.js   # Dados do cliente
├── screens/               # Telas do aplicativo
│   ├── WelcomeScreen.js   # Tela inicial
│   ├── MenuScreen.js      # Cardápio
│   ├── CartScreen.js      # Carrinho
│   ├── ClientScreen.js    # Dados do cliente
│   └── OrderStatusScreen.js # Status do pedido
├── App.js                 # Componente principal
└── package.json           # Dependências
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente
- Dispositivo móvel com Expo Go ou emulador

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd pizzaria-silva
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
# ou
expo start
```

4. Escaneie o QR Code com o Expo Go ou execute em um emulador:
```bash
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

## 🎨 Design e UX

- **Cores principais:** Vermelho (#b22222) e Dourado (#ffcc00)
- **Interface intuitiva** com navegação fluida
- **Responsivo** para diferentes tamanhos de tela
- **Feedback visual** para todas as interações

## 📋 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador

## 🔄 Fluxo do Usuário

1. **Boas-vindas** → Apresentação da pizzaria
2. **Cardápio** → Seleção de pizzas e adição ao carrinho
3. **Carrinho** → Revisão dos itens e quantidades
4. **Dados** → Preenchimento de informações de entrega
5. **Status** → Acompanhamento do pedido

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📄 Licença

Este projeto é privado e destinado para uso da Pizzaria Silva.

---

**Desenvolvido com ❤️ para a melhor experiência de delivery de pizzas!**