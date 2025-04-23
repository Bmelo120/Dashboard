#  Dashboard

O Dashboard simula uma interface de um servidor no cluster. 

🔧 Tecnologias utilizadas:
✔ React.js
✔ TypeScript 
✔ Vite
✔ Styled-components e Material UI para estilização.
✔ Hooks do React para controle de estado.


## App.tsx

Componente principal da aplicação. O comportamento da aplicação envolve a manipulação dinâmica de "clusters" e "blocos", além de persistir as alterações no localStorage para garantir a persistência de dados mesmo após o recarregamento da página. Funções principais dentro do componente:  

- "useEffect" - Recupera dados do localStorage ao carregar o componente. Isso inclui os aplicativos e blocos vazios (se houver) salvos anteriormente.
- "handleAddApp" - Cria um novo cluter dentro do bloco
- "handleRemoveApp" - Remove um cluster de bloco existente
- "handleNewServer" - Adiciona um bloco vazio 
- "handleRemoveServer" - Remove blocos vazios 



## #src/componentes/Navbar/Navbar.tsx

Este componente é a barra lateral da aplicação, responsável por gerenciar servidores e aplicativos.

Ele contém:
 - Uma lista de aplicativos disponiveis
 - Dois icones que cria e remove um novo servidor
 - Uma função "countCluste" definida para contagem dos clustes. 
 
Utiliza o Grid do Material UI para organizar o laytou dos clusters. Dentro de AppContent, a lista de aplicativos é percorrida com map para renderizar cada aplicativo com sua cor e nome pré-definida e utiliza o id para a quantidade de clusters ativos. Além disso, o ícone AddCircleIcon possui uma logica que limita a adição de no máximo duas instância por aplicativo.

## src/componentes/Dashboard/Dashboard.tsx

Este componente exibe visualmente os servidores ativos.

- É utilizada uma interface para receber Props: "pad" uma lista de servidores ativos onde cada item é um aplicativo com, nome, cor e data de criação e "addServers" um array numerico apenas para controle e renderização de blocos vazios. 

- Uma função "formatTime" que calcula quantos minutos se passaram desde que o app foi criado.

- Utiliza Grid do Material UI para montar uma grande de servidores, a lista de servidores (pad) é pecorridado com map para renderizar um bloco com a cor da borda de acordo com o aplicativo, mostra o nome do aplicativo e há quanto tempo ele foi adicionado. 

- O array "addSerbers" é pecorrido com map para renderizar um bloco vazio.

