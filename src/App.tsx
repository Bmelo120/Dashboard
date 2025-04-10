import { useState } from 'react';
import './App'
import Dashboard from './componotens/Dashboard/Dashboard'
import NavBar from './componotens/Navbar/Navbar'

export interface ClusterApp {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

function App() {
  const [ apps, setApps ] = useState<ClusterApp[]>([]);

  const handleAddApp = (id: string, name: string, color: string) => {
    const newApp: ClusterApp = {
      id: id.toString(),
      name,
      color,
      createdAt: new Date()
    }

    setApps((oldApps) => [...oldApps, newApp]);
  };

  const handleRemoveApp = (id: string) => {
    setApps((oldApps) => oldApps.filter(app => app.id !== id));
  };
  

  return (
        <>
          <NavBar onRemoveApp={handleRemoveApp} onAddApp={handleAddApp}/>
          <Dashboard pad={apps}/>
        </>
  )
}

export default App
