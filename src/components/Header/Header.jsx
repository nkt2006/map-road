import React, { useRef } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './Header.css';

const Header = ({ roadmap, onImport, onExport }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Проверка расширения файла
      if (!file.name.endsWith('.json')) {
        alert('Пожалуйста, выберите файл в формате JSON');
        return;
      }
      onImport(file);
    }
    event.target.value = '';
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-content">
          <div className="header-title">
            <h1>🚀 Персональный Трекер Технологий</h1>
            <p>Систематизируйте и отслеживайте прогресс обучения</p>
          </div>
          
          <div className="header-actions">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".json"
              style={{ display: 'none' }}
            />
            <button 
              className="btn btn-primary"
              onClick={handleImportClick}
            >
              📁 Импорт карты
            </button>
            
            {roadmap && (
              <button 
                className="btn btn-success"
                onClick={onExport}
              >
                💾 Экспорт прогресса
              </button>
            )}
          </div>
        </div>
      </div>

      {roadmap && (
        <div className="header-bottom">
          <div className="header-content">
            <ProgressBar roadmap={roadmap} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;