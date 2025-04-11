import { useState } from 'react';
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
  const [addServers, setAddServers] = useState<(number[])>([
  Date.now(),
  Date.now() + 1,
  Date.now() + 2,
  Date.now() + 3,
  ]);

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
        setAddServers(updated);

       //adiciona um novo app 
       setApps([...apps, newApp])
  };

  //Remove um cluster com o id informado na lista (ou seja de acordo com o app selecionado)
  const handleRemoveApp = (id: string) => {
    const index = apps.findIndex((app) => app.id === id);
    if (index !== -1) {
      const updatedApps = [...apps];
      updatedApps.splice(index, 1); // remove só a primeira ocorrência
      setApps(updatedApps);
    }
  };

     //Adiciona um novo blooco vazio
     const handleNewServer = () => {
        setAddServers((oldServer) => [...oldServer, Date.now()]);
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
