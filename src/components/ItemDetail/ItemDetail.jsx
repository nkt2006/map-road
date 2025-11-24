import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ItemDetail.css';

const ItemDetail = ({ roadmap, updateItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = roadmap?.items.find(item => item.id === id);

  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('not_started');
  const [dueDate, setDueDate] = useState('');

  // Инициализация состояния при загрузке компонента или изменении item
  useEffect(() => {
    if (item) {
      setNotes(item.notes || '');
      setStatus(item.status || 'not_started');
      setDueDate(item.dueDate || '');
    }
  }, [item]);

  if (!item) {
    return (
      <div className="item-detail-container">
        <div className="item-not-found">
          <h2>Тема не найдена</h2>
          <p>Запрошенная тема не существует в текущей дорожной карте.</p>
          <Link to="/" className="btn btn-primary">← Вернуться к карте</Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateItem(id, {
      notes: notes.trim(),
      status,
      dueDate: dueDate || null
    });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleClearNotes = () => {
    setNotes('');
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'Завершено', color: '#28a745' };
      case 'in_progress':
        return { text: 'В работе', color: '#fd7e14' };
      default:
        return { text: 'Не начато', color: '#6c757d' };
    }
  };

  const statusInfo = getStatusInfo(item.status);

  return (
    <div className="item-detail-container">
      <div className="item-detail">
        <div className="detail-header">
          <Link to="/" className="back-button">
            ← Назад к дорожной карте
          </Link>
          <h1>{item.name}</h1>
          <div 
            className="current-status-badge"
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.text}
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>📋 Описание темы</h3>
            <div className="description-content">
              <p>{item.description}</p>
            </div>
          </div>

          {item.links && item.links.length > 0 && (
            <div className="detail-section">
              <h3>🔗 Полезные ресурсы</h3>
              <div className="links-list">
                {item.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    <span className="link-title">{link.title}</span>
                    <span className="link-url">{link.url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <h3>🎯 Управление прогрессом</h3>
            <div className="progress-controls">
              <div className="control-group">
                <label htmlFor="status-select">Статус изучения:</label>
                <select 
                  id="status-select"
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="not_started">Не начато</option>
                  <option value="in_progress">В работе</option>
                  <option value="completed">Завершено</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="due-date">Планируемая дата завершения:</label>
                <input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="notes-header">
              <h3>📝 Мои заметки</h3>
              {notes && (
                <button 
                  onClick={handleClearNotes}
                  className="btn btn-secondary btn-sm"
                >
                  Очистить
                </button>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Добавьте ваши заметки, конспекты, полезные команды, ссылки на решенные задачи или другие мысли, связанные с изучением этой темы..."
              className="notes-textarea"
              rows="8"
            />
            <div className="notes-help">
              💡 Заметки автоматически сохраняются при нажатии "Сохранить изменения"
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button onClick={handleCancel} className="btn btn-secondary">
            Отмена
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            💾 Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;