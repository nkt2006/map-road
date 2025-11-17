import React from 'react';
import { Link } from 'react-router-dom';
import './RoadmapItem.css';

const RoadmapItem = ({ item, onStatusChange }) => {
  // Добавляем проверку на существование item
  if (!item) {
    return (
      <div className="roadmap-item error">
        <div className="item-main">
          <div className="item-content">
            <div className="item-header">
              <h3 className="item-title">Ошибка: элемент не найден</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status) => {
    // Добавляем значение по умолчанию
    const actualStatus = status || 'not_started';
    switch (actualStatus) {
      case 'completed':
        return { 
          class: 'status-completed', 
          text: 'Завершено', 
          icon: '✅',
          color: '#28a745'
        };
      case 'in_progress':
        return { 
          class: 'status-in-progress', 
          text: 'В работе', 
          icon: '🔄',
          color: '#fd7e14'
        };
      default:
        return { 
          class: 'status-not-started', 
          text: 'Не начато', 
          icon: '⭕',
          color: '#6c757d'
        };
    }
  };

  const statusInfo = getStatusInfo(item.status);

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div className={`roadmap-item ${statusInfo.class}`}>
      <div className="item-main">
        <Link to={`/item/${item.id}`} className="item-content-link">
          <div className="item-header">
            <h3 className="item-title">{item.name || 'Без названия'}</h3>
            <span 
              className="status-badge"
              style={{ backgroundColor: statusInfo.color }}
            >
              {statusInfo.icon} {statusInfo.text}
            </span>
          </div>
          
          <p className="item-description">{item.description || 'Описание отсутствует'}</p>
          
          {item.dueDate && (
            <div className="due-date">
              <span className="due-label">Срок:</span>
              {new Date(item.dueDate).toLocaleDateString('ru-RU')}
            </div>
          )}
          
          {item.notes && (
            <div className="item-notes-preview">
              <strong>Заметки:</strong> {item.notes.substring(0, 60)}...
            </div>
          )}
          
          {item.links && item.links.length > 0 && (
            <div className="item-links-count">
              🔗 {item.links.length} ресурс(ов)
            </div>
          )}
        </Link>
      </div>

      <div className="item-actions">
        <select 
          value={item.status || 'not_started'} 
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
          style={{ borderColor: statusInfo.color }}
        >
          <option value="not_started">Не начато</option>
          <option value="in_progress">В работе</option>
          <option value="completed">Завершено</option>
        </select>
        
        <Link to={`/item/${item.id}`} className="btn btn-primary btn-sm">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default RoadmapItem;