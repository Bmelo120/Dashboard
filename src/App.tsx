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
  //controla o estado d bloco vazio
  const [addServers, setAddServers] = useState<number[]>([]);

  //Cria um novo cluster no bloco e adiciona a lista. 
  const handleAddApp = (id: string, name: string, color: string) => {
    const newApp: ClusterApp = {
      id,
      name,
      color,
      createdAt: new Date() // Gera uma nova data assim que um bloco novo é adicionado
    }

    setApps((oldApps) => [...oldApps, newApp]);
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

  //Adiciona um blooco
  const handleNewServer = () => {
    setAddServers(add => [...add, Date.now()])
  }
  
  return (
        <>
          {/* //recebe as funções de adicionar e remover como props */}
          <NavBar onAddServer={handleNewServer} onRemoveApp={handleRemoveApp} onAddApp={handleAddApp} apps={apps}/> 
          {/* // Recebe uma lista de props e renderiza  */}
          <Dashboard pad={apps}/>
        </>
  )
}

export default App
