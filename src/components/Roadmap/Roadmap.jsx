import React from 'react';
import RoadmapItem from '../RoadmapItem/RoadmapItem';
import './Roadmap.css';

const Roadmap = ({ roadmap, updateItem }) => {
  if (!roadmap) {
    return (
      <div className="roadmap-empty">
        <div className="empty-state">
          <h2>Добро пожаловать в трекер обучения!</h2>
          <p>Для начала работы загрузите дорожную карту в формате JSON</p>
          <div className="empty-icon">📚</div>
        </div>
      </div>
    );
  }

  // Группировка элементов по статусу
  const itemsByStatus = {
    not_started: roadmap.items.filter(item => item.status === 'not_started'),
    in_progress: roadmap.items.filter(item => item.status === 'in_progress'),
    completed: roadmap.items.filter(item => item.status === 'completed')
  };

  return (
    <div className="roadmap">
      <div className="roadmap-header">
        <h1>{roadmap.title}</h1>
        <p className="roadmap-description">{roadmap.description}</p>
      </div>

      <div className="roadmap-grid">
        {/* Колонка "Не начато" */}
        <div className="status-column">
          <div className="column-header not-started">
            <h3>Не начато</h3>
            <span className="items-count">{itemsByStatus.not_started.length}</span>
          </div>
          <div className="items-container">
            {itemsByStatus.not_started.map(item => (
              <RoadmapItem 
                key={item.id} 
                item={item}
                onStatusChange={(newStatus) => updateItem(item.id, { status: newStatus })}
              />
            ))}
            {itemsByStatus.not_started.length === 0 && (
              <div className="empty-column">Все темы начаты! 🎉</div>
            )}
          </div>
        </div>

        {/* Колонка "В работе" */}
        <div className="status-column">
          <div className="column-header in-progress">
            <h3>В работе</h3>
            <span className="items-count">{itemsByStatus.in_progress.length}</span>
          </div>
          <div className="items-container">
            {itemsByStatus.in_progress.map(item => (
              <RoadmapItem 
                key={item.id} 
                item={item}
                onStatusChange={(newStatus) => updateItem(item.id, { status: newStatus })}
              />
            ))}
            {itemsByStatus.in_progress.length === 0 && (
              <div className="empty-column">Начните работу над темами</div>
            )}
          </div>
        </div>

        {/* Колонка "Завершено" */}
        <div className="status-column">
          <div className="column-header completed">
            <h3>Завершено</h3>
            <span className="items-count">{itemsByStatus.completed.length}</span>
          </div>
          <div className="items-container">
            {itemsByStatus.completed.map(item => (
              <RoadmapItem 
                key={item.id} 
                item={item}
                onStatusChange={(newStatus) => updateItem(item.id, { status: newStatus })}
              />
            ))}
            {itemsByStatus.completed.length === 0 && (
              <div className="empty-column">Завершите первую тему!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;