# Biblioteca Virtual FIAP

Observamos como ponto de melhoria o sistema de reservas de livros, devido à interface não intuitiva. Gerando múltiplos cliques e estresse na hora de reservar um livro.

## Sobre o projeto

**Biblioteca Virtual** é um aplicativo mobile desenvolvido em React Native com Expo que permite ao usuário gerenciar uma lista de livros: visualizar detalhes, alugar, devolver e favoritar títulos.

O app resolve o problema de controle pessoal de leituras e empréstimos, oferecendo uma interface simples e persistente — os dados não se perdem ao fechar o aplicativo.

### O que mudou do CP1

| Funcionalidade | CP1 | CP2 |
|---|---|---|
| Estado dos livros | Em memória (resetava ao fechar) | Persistido com AsyncStorage |
| Autenticação | Não havia | Login e cadastro com validação completa |
| Favoritos | Não havia | Favoritar/desfavoritar com persistência |
| Temas | Apenas dark fixo | Dark/Light com toggle e persistência |
| Busca | Não havia | Busca em tempo real por título |

---

## Funcionalidades

- **Autenticação completa**: cadastro com validação inline, login com verificação, sessão persistida
- **Listagem de livros**: cards com capa, título, autor, ano e status
- **Busca em tempo real**: filtro por título conforme o usuário digita
- **Favoritos**: marcar/desmarcar livros favoritos com filtro dedicado ⭐
- **Alugar/Devolver**: controle de empréstimo por livro
- **Detalhes do livro**: tela individual com descrição completa
- **Dark/Light mode**: alternância de tema com persistência
- **Logout**: encerramento de sessão com redirecionamento automático
- **Persistência total**: AsyncStorage para livros, sessão e tema

---

## Integrantes

Gabriel Fidalgo - RM563213

Gustavo Maia - RM562240

Gustavo Rossi - RM566075

Pedro Lima - RM565461

---

## Como rodar o projeto

- Clone o projeto utilizando o git

```
git clone {link do repositório}
```

- Instale o **Node.js** versão v24.14.0
- Instale as dependências do projeto:

```
npm install
```

- Instale o aplicativo **Expo Go** no celular
- Inicie o projeto:

```
npx expo start
```

- Abra o **Expo Go** e leia o **QR Code** exibido no terminal ou navegador

---

## Demonstração

### Tela de Login
> Adicione print aqui

### Tela de Cadastro com validação inline
> Adicione print aqui

### Lista de livros com busca e favoritos
> Adicione print aqui

### Modo claro
> Adicione print aqui

### Vídeo/GIF de demonstração
> Grave um vídeo curto (~30s) mostrando: login → listagem → favoritar → fechar app → reabrir → favorito mantido

![Página de alugados](./alugados.png)

![Página home](./home.png)

![Página de detalhes](./detalhes.png)

![GIF do projeto](./app.gif)

---

## Decisões Técnicas

### Context API
Optamos por Context API por ser nativa do React, sem dependências externas, e suficiente para a escala do projeto. Temos três contextos:
- **AuthContext**: gerencia sessão do usuário (login, cadastro, logout)
- **BooksContext**: gerencia estado dos livros (alugar, devolver, favoritar)
- **ThemeContext**: gerencia tema claro/escuro

### AsyncStorage
Usado para persistir quatro tipos de dados:
- `@biblioteca:users` — lista de usuários cadastrados
- `@biblioteca:session` — usuário logado atualmente
- `@app:books` — estado completo dos livros (inclui `isRent` e `isFavorite`)
- `@app:theme` — preferência de tema do usuário

Estratégia: `useEffect([books])` salva automaticamente a cada mudança de estado — simples e sem lógica adicional.

### Validação de formulário
Feita manualmente (sem Formik ou Zod) para manter o projeto sem dependências extras. Os erros são exibidos inline abaixo de cada campo em vermelho, e o botão de submit fica desabilitado enquanto o formulário for inválido.

Utilizamos TypeScript visando o uso de types, assim, deixando nosso projeto mais robusto e consolidado.

Além disso, o uso de React Native com Expo permite o desenvolvimento de um app multiplataforma com uma arquitetura (set-up) já pré-definida.

Utilizamos `expo-router` para realizar a navegação. Mais detalhes em [Expo Router](https://docs.expo.dev/versions/latest/sdk/router/).

Dentre os hooks que implementamos, estão: useContext, useState e useEffect.

- **useContext**: para acessar estados globalmente em múltiplas telas.
- **useState**: para gerenciar os estados locais e globais.
- **useEffect**: para carregar e persistir dados no AsyncStorage automaticamente.

---

## Diferencial escolhido: Favoritos ⭐

A funcionalidade de favoritos foi escolhida por agregar valor real ao usuário — permitindo marcar livros de interesse sem precisar lembrar manualmente quais são.

**Por que favoritos:**
- Implementação simples sem quebrar a arquitetura existente (apenas o campo `isFavorite` no objeto de livro)
- Persistência automática pelo AsyncStorage já existente
- Melhora a experiência de uso de forma visível (filtro + ícone de coração na lista)
- Não exige nova tela, novo contexto nem novas dependências

---

## Próximos passos

Ainda sentimos necessidade de classificar livros por gênero e ter a possibilidade de entrar em contato com os responsáveis pela biblioteca.
