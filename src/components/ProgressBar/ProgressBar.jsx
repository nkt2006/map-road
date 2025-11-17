import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ roadmap }) => {
  if (!roadmap || !roadmap.items) return null;

  const totalItems = roadmap.items.length;
  const completedItems = roadmap.items.filter(item => item.status === 'completed').length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <div className="progress-text">
          <h3>Общий прогресс освоения</h3>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        <div className="progress-stats">
          Завершено: {completedItems} из {totalItems} тем
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
          title={`${progressPercentage}% завершено`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;