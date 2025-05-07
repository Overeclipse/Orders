import React, { useState } from 'react';
import { Calendar, ChevronDown, RotateCcw } from 'lucide-react';

const OrderSearchBar = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState({ start: '', end: '' });

  const handleDateChange = (field) => (e) => {
    setTempDateRange(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDateApply = () => {
    setDateRange(tempDateRange);
    setIsDatePickerOpen(false);
  };

  const handleDateCancel = () => {
    setTempDateRange({ start: dateRange.start, end: dateRange.end });
    setIsDatePickerOpen(false);
  };

  return (
    <div className="border-t border-b border-gray-200 py-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Статус</option>
            <option>Новый</option>
            <option>Отгружен</option>
            <option>Доставлен</option>
            <option>Возврат</option>
            <option>Отменен</option>
          </select>
        </div>
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Тип оплаты</option>
            <option>Наличные</option>
            <option>Карта</option>
          </select>
        </div>
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Агент</option>
            <option>Fidel</option>
            <option>Elena</option>
            <option>Sergey</option>
            <option>Marina</option>
            <option>Oleg</option>
            <option>Irina</option>
            <option>Dmitry</option>
          </select>
        </div>
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Дата заявки</option>
            <option>Дата отгрузки</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <button 
            className="w-full bg-blue-400 text-white p-2 rounded flex justify-between items-center"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{dateRange.start || 'Начало'} - {dateRange.end || 'Конец'}</span>
            </span>
            <ChevronDown size={16} />
          </button>
          
          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow-lg w-80">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block mb-1">Начало:</label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={tempDateRange.start || ''}
                      onChange={handleDateChange('start')}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Конец:</label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={tempDateRange.end || ''}
                      onChange={handleDateChange('end')}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      className="px-4 py-2 bg-gray-200 rounded"
                      onClick={handleDateCancel}
                    >
                      Отмена
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={handleDateApply}
                    >
                      Применить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Местность</option>
            <option>Мирабад</option>
            <option>Юнусабад</option>
            <option>Чиланзар</option>
            <option>Янгихаёт</option>
            <option>Сергели</option>
            <option>Учтепи</option>
            <option>Яшнабад</option>
          </select>
        </div>
        
        <div className="relative">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Категория клиента</option>
            <option>Оптовый</option>
            <option>Розничный</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <select className="w-full p-2 border border-gray-300 rounded appearance-none">
            <option>Склад</option>
            <option>Центральный склад</option>
          </select>
          <button className="ml-2 bg-blue-400 text-white p-2 rounded w-12 flex justify-center">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSearchBar;
