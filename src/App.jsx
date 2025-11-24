import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Roadmap from './components/Roadmap/Roadmap';
import ItemDetail from './components/ItemDetail/ItemDetail';
import { loadRoadmapFromFile, exportRoadmapToFile } from './utils/fileHandlers';
import sampleRoadmap from './data/sample-roadmap.json';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Загрузка примерной карты при первом рендере
  useEffect(() => {
    setRoadmap(sampleRoadmap);
  }, []);

  const handleImport = async (file) => {
    setLoading(true);
    setError('');
    
    try {
      const importedRoadmap = await loadRoadmapFromFile(file);
      setRoadmap(importedRoadmap);
    } catch (err) {
      setError('Ошибка загрузки файла: Неверный формат JSON файла');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (roadmap) {
      exportRoadmapToFile(roadmap);
    }
  };

  const updateItem = (itemId, updates) => {
    setRoadmap(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };

  return (
    <Router>
      <div className="App">
        <Header 
          roadmap={roadmap}
          onImport={handleImport}
          onExport={handleExport}
        />
        
        <main className="main-content">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError('')} className="close-error">×</button>
            </div>
          )}
          
          {loading && (
            <div className="loading">Загрузка дорожной карты...</div>
          )}
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Roadmap 
                  roadmap={roadmap} 
                  updateItem={updateItem}
                />
              } 
            />
            <Route 
              path="/item/:id" 
              element={
                <ItemDetail 
                  roadmap={roadmap} 
                  updateItem={updateItem} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;