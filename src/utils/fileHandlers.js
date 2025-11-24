/**
 * Утилиты для работы с файлами дорожных карт
 */

/**
 * Загружает и парсит JSON файл с дорожной картой
 * @param {File} file - Файл для загрузки
 * @returns {Promise<Object>} Promise с объектом дорожной карты
 */
export const loadRoadmapFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const roadmap = JSON.parse(e.target.result);
        
        // Валидация структуры файла
        if (!roadmap.title || typeof roadmap.title !== 'string') {
          throw new Error('Отсутствует или некорректное название дорожной карты');
        }
        
        if (!roadmap.items || !Array.isArray(roadmap.items)) {
          throw new Error('Отсутствует или некорректный массив пунктов');
        }
        
        // Валидация каждого пункта
        roadmap.items.forEach((item, index) => {
          if (!item.id || typeof item.id !== 'string') {
            throw new Error(`Пункт ${index + 1}: отсутствует или некорректный идентификатор`);
          }
          
          if (!item.name || typeof item.name !== 'string') {
            throw new Error(`Пункт ${index + 1}: отсутствует или некорректное название`);
          }
          
          if (!item.description || typeof item.description !== 'string') {
            throw new Error(`Пункт ${index + 1}: отсутствует или некорректное описание`);
          }
          
          if (item.links && !Array.isArray(item.links)) {
            throw new Error(`Пункт ${index + 1}: ссылки должны быть массивом`);
          }
          
          if (item.links) {
            item.links.forEach((link, linkIndex) => {
              if (!link.title || typeof link.title !== 'string') {
                throw new Error(`Пункт ${index + 1}, ссылка ${linkIndex + 1}: отсутствует заголовок`);
              }
              if (!link.url || typeof link.url !== 'string') {
                throw new Error(`Пункт ${index + 1}, ссылка ${linkIndex + 1}: отсутствует URL`);
              }
            });
          }
        });
        
        // Добавляем поля по умолчанию если их нет
        const processedRoadmap = {
          ...roadmap,
          items: roadmap.items.map(item => ({
            status: 'not_started',
            notes: '',
            dueDate: null,
            ...item,
            // Убеждаемся, что links всегда массив
            links: item.links || []
          }))
        };
        
        resolve(processedRoadmap);
      } catch (error) {
        reject(new Error(`Ошибка парсинга JSON: ${error.message}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.onabort = () => reject(new Error('Чтение файла прервано'));
    
    try {
      reader.readAsText(file);
    } catch (error) {
      reject(new Error('Не удалось прочитать файл'));
    }
  });
};

/**
 * Экспортирует текущее состояние дорожной карты в JSON файл
 * @param {Object} roadmap - Объект дорожной карты для экспорта
 */
export const exportRoadmapToFile = (roadmap) => {
  try {
    // Создаем копию для экспорта, чтобы не мутировать исходный объект
    const exportData = {
      title: roadmap.title,
      description: roadmap.description,
      items: roadmap.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        links: item.links || [],
        status: item.status || 'not_started',
        notes: item.notes || '',
        dueDate: item.dueDate || null
      }))
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { 
      type: 'application/json;charset=utf-8' 
    });
    
    // Создаем URL для скачивания
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    
    // Генерируем имя файла с датой
    const date = new Date().toISOString().split('T')[0];
    const fileName = `roadmap-progress-${date}.json`;
    
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Освобождаем память
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Ошибка при экспорте файла:', error);
    alert('Произошла ошибка при экспорте файла');
  }
};

/**
 * Валидирует структуру дорожной карты
 * @param {Object} roadmap - Объект для валидации
 * @returns {boolean} true если структура корректна
 */
export const validateRoadmapStructure = (roadmap) => {
  if (!roadmap || typeof roadmap !== 'object') return false;
  if (!roadmap.title || typeof roadmap.title !== 'string') return false;
  if (!Array.isArray(roadmap.items)) return false;
  
  return roadmap.items.every(item => 
    item && 
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.description === 'string'
  );
};