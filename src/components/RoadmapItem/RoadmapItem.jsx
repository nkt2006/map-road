import React from 'react';
import { Link } from 'react-router-dom';
import './RoadmapItem.css';

const RoadmapItem = ({ item, onStatusChange }) => {
  const getStatusInfo = (status) => {
    switch (status) {
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
    onStatusChange(newStatus);
  };

  return (
    <div className={`roadmap-item ${statusInfo.class}`}>
      <div className="item-main">
        <Link to={`/item/${item.id}`} className="item-content-link">
          <div className="item-header">
            <h3 className="item-title">{item.name}</h3>
            <span 
              className="status-badge"
              style={{ backgroundColor: statusInfo.color }}
            >
              {statusInfo.icon} {statusInfo.text}
            </span>
          </div>
          
          <p className="item-description">{item.description}</p>
          
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
          value={item.status} 
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