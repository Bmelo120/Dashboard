import { useEffect, useState } from 'react';
import './App'
import Dashboard from './componotens/Dashboard/Dashboard'
import NavBar from './componotens/Navbar/Navbar'

// Define o formato que o bloco vai ter 
export interface ClusterApp {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

function App() {
  //controla o estado do bloco sem cluster
  const [ apps, setApps ] = useState<ClusterApp[]>([]);

  //controla o estado do bloco vazio
  const [addServers, setAddServers] = useState<(number[])>([]);

   // Recupera os dados do localStorage ao carregar
   useEffect(() => {
    const savedApps = localStorage.getItem('apps');
    const savedAddServers = localStorage.getItem('addServers');

    if (savedApps && savedApps !== "undefined") {
      const parsedApps: ClusterApp[] = JSON.parse(savedApps).map((app: ClusterApp) => ({
        ...app,
        createdAt: new Date(app.createdAt)
      }));
      setApps(parsedApps);
    }

    if (savedAddServers) {
      const parsedServers: number[] = JSON.parse(savedAddServers);
      setAddServers(parsedServers);
    } else if (!savedAddServers && savedApps) {
      // Se só apps foram salvos, calcula blocos restantes
      const parsedApps = JSON.parse(savedApps);
      const totalBlocks = 4;
      const remaining = totalBlocks - parsedApps.length;
      if (remaining > 0) {
        const newServers = Array.from({ length: remaining }, () => Date.now() + Math.random());
        setAddServers(newServers);
        localStorage.setItem('addServers', JSON.stringify(newServers));
      }
    } else if (!savedApps && !savedAddServers) {
      // Primeiro acesso, define 4 blocos vazios
      const initialServers = [
        Date.now(),
        Date.now() + 1,
        Date.now() + 2,
        Date.now() + 3
      ];
      setAddServers(initialServers);
      localStorage.setItem('addServers', JSON.stringify(initialServers));
    }
  }, []);

  //Cria um novo cluster dentro do  bloco . 
  const handleAddApp = (id: string, name: string, color: string) => {
    
    //verifica se tem um servidor disponivel
    if (addServers.length === 0) {
      alert("Não há servidores vazios disponíveis!");
      return;
    }
    
    // Cria um obj novo
    const newApp: ClusterApp = {
      id,
      name,
      color,
      createdAt: new Date(), // Gera uma nova data assim que um bloco novo é adicionado 
    }

       //remove o vazio
       const updated = [...addServers];
       updated.splice(0, 1);
       const updatedApps = [...apps, newApp];

       setApps(updatedApps);
       setAddServers(updated);
   
       localStorage.setItem('apps', JSON.stringify(updatedApps));
       localStorage.setItem('addServers', JSON.stringify(updated));
  };

  //Remove um cluster com o id informado na lista (ou seja de acordo com o app selecionado)
  const handleRemoveApp = (id: string) => {
    const index = apps.findIndex((app) => app.id === id);
    if (index !== -1) {
      const updatedApps = [...apps];
      updatedApps.splice(index, 1); // remove só a primeira ocorrência

      const updatedAddServers = [...addServers, Date.now()];

      setApps(updatedApps);
      setAddServers(updatedAddServers);

      localStorage.setItem('apps', JSON.stringify(updatedApps));
      localStorage.setItem('addServers', JSON.stringify(updatedAddServers));
    }
  };

     //Adiciona um novo blooco vazio
     const handleNewServer = () => {
        setAddServers((oldServer) => [...oldServer, Date.now()]);
        localStorage.setItem('addServers', JSON.stringify(setAddServers));
      }

      //Remove blocos vazios 
      const handleRemoveServer = () => {
        //verifica se tem um servidor vazio
        if (addServers.length === 0) {
          alert("Não há servidores vazios disponíveis!");
          return;
        } 

          const updatedServers = [...addServers];
          updatedServers.splice(0, 1); // remove só a primeira ocorrência
          setAddServers(updatedServers); 
          localStorage.setItem('addServers', JSON.stringify(updatedServers));
      }


  
  return (
        <>
          {/* //recebe as funções de adicionar e remover como props */}
          <NavBar 
            onAddServer={handleNewServer} 
            onRemoveServer={handleRemoveServer}
            onRemoveApp={handleRemoveApp} 
            onAddApp={handleAddApp} 
            apps={apps}/> 
          {/* // Recebe uma lista de props e renderiza  */}
          <Dashboard pad={apps} addServers={addServers}/>
        </>
  )
}

export default App
