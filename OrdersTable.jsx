import React, { useState, useEffect } from 'react';
import { ChevronDown, RotateCcw, Calendar, PlaneTakeoff, Download, FileText } from 'lucide-react';

const OrdersTable = () => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      date: { time: '16:05', date: '07-05-25' }, 
      shipDate: '2025-05-06T19:00:00.000Z', 
      client: 'Xurshid', 
      quantity: 1, 
      priceType: 'Наличные', 
      amount: 1, 
      status: 'Новый', 
      agent: 'Fidel', 
      location: 'Мирабад'
    },
    { 
      id: 2, 
      date: { time: '16:10', date: '07-05-25' }, 
      shipDate: '2025-05-07T09:00:00.000Z', 
      client: 'Ali', 
      quantity: 2, 
      priceType: 'Карта', 
      amount: 50, 
      status: 'Отгружен', 
      agent: 'Elena', 
      location: 'Юнусабад'
    },
    { 
      id: 3, 
      date: { time: '16:15', date: '07-05-25' }, 
      shipDate: '2025-05-07T14:00:00.000Z', 
      client: 'Bakhtiyor', 
      quantity: 3, 
      priceType: 'Наличные', 
      amount: 75, 
      status: 'Доставлен', 
      agent: 'Sergey', 
      location: 'Чиланзар'
    },
    { 
      id: 4, 
      date: { time: '16:20', date: '07-05-25' }, 
      shipDate: '2025-05-08T10:00:00.000Z', 
      client: 'Dilshod', 
      quantity: 1, 
      priceType: 'Карта', 
      amount: 30, 
      status: 'Возврат', 
      agent: 'Marina', 
      location: 'Янгихаёт'
    },
    { 
      id: 5, 
      date: { time: '16:25', date: '07-05-25' }, 
      shipDate: '2025-05-07T15:00:00.000Z', 
      client: 'Zafar', 
      quantity: 2, 
      priceType: 'Наличные', 
      amount: 45, 
      status: 'Отменен', 
      agent: 'Oleg', 
      location: 'Сергели'
    },
    { 
      id: 6, 
      date: { time: '16:30', date: '07-05-25' }, 
      shipDate: '2025-05-08T12:00:00.000Z', 
      client: 'Rustam', 
      quantity: 1, 
      priceType: 'Карта', 
      amount: 20, 
      status: 'Новый', 
      agent: 'Irina', 
      location: 'Учтепи'
    },
    { 
      id: 7, 
      date: { time: '16:35', date: '07-05-25' }, 
      shipDate: '2025-05-07T18:00:00.000Z', 
      client: 'Shokhrukh', 
      quantity: 3, 
      priceType: 'Наличные', 
      amount: 90, 
      status: 'Отгружен', 
      agent: 'Dmitry', 
      location: 'Яшнабад'
    }
  ]);

  const getStatusButton = (status) => {
    const statusStyles = {
      'Новый': 'bg-blue-400 text-white',
      'Отгружен': 'bg-yellow-400 text-white',
      'Доставлен': 'bg-green-500 text-white',
      'Возврат': 'bg-red-500 text-white',
      'Отменен': 'bg-gray-500 text-white'
    };
    
    return (
      <button className={`py-1 px-3 rounded ${statusStyles[status] || 'bg-blue-400 text-white'} w-full`}>
        {status}
      </button>
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center mb-4">
        <button className="bg-green-500 text-white flex items-center py-2 px-4 rounded gap-2">
          <span>Добавить заказ</span>
        </button>
        <button className="bg-yellow-400 text-white flex items-center py-2 px-4 rounded gap-2 ml-auto">
          <span>Просроченные заказы</span>
        </button>
      </div>
      
      {/* Filter Section */}
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Статус</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Тип оплаты</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Агент</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Дата заявки</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <button className="w-full bg-blue-400 text-white p-2 rounded flex justify-between items-center">
              <span className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Начало - Конец</span>
              </span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Местность</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Категория клиента</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
              <option>Склад</option>
            </select>
            <button className="ml-2 bg-blue-400 text-white p-2 rounded w-12 flex justify-center">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Table Tools */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">По</span>
          <select className="border border-gray-300 rounded p-1 mr-2">
            <option>50</option>
            <option>25</option>
            <option>10</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Быстрый поиск:</label>
          <input type="text" className="border border-gray-300 rounded p-1 w-64" />
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-400 text-white p-2 border border-blue-500 text-center w-12">
                <input type="checkbox" />
              </th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500 text-center">№</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Дата заявки</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Дата отгрузки</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Клиент</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500 text-center">Кол-во</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Тип цены</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500 text-right">Сумма</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Статус</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Агент</th>
              <th className="bg-blue-400 text-white p-2 border border-blue-500">Местность</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  <input type="checkbox" />
                </td>
                <td className="border border-gray-300 p-2 text-center">{order.id}</td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {order.date.time}<br/>{order.date.date}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">{order.shipDate}</td>
                <td className="border border-gray-300 p-2">{order.client}</td>
                <td className="border border-gray-300 p-2 text-center">{order.quantity}</td>
                <td className="border border-gray-300 p-2">{order.priceType}</td>
                <td className="border border-gray-300 p-2 text-right">{order.amount}</td>
                <td className="border border-gray-300 p-2">
                  {getStatusButton(order.status)}
                </td>
                <td className="border border-gray-300 p-2">{order.agent}</td>
                <td className="border border-gray-300 p-2">{order.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-4 gap-2">
        <button className="bg-green-500 text-white py-2 px-4 rounded flex gap-2 items-center">
          <PlaneTakeoff size={16} /> Изменить статус
        </button>
        <button className="bg-blue-400 text-white py-2 px-4 rounded flex gap-2 items-center">
          Загруз <FileText size={16} />
        </button>
        <button className="bg-blue-400 text-white py-2 px-4 rounded flex gap-2 items-center">
          Экспорт в 1С <Download size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
