// Orders.jsx - Updated to match EJS version visually
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, ChevronDown, RotateCcw, ShoppingCart, Clock, PlaneTakeoff, FileText, Download } from 'lucide-react';
import Navigation from './Navigation';
import Topbar from './Topbar';
import OrdersTable from './OrdersTable';
import styles from './Orders.module.css';

const Orders = () => {
  const [isNavActive, setIsNavActive] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState('/orders');
  const [selectAll, setSelectAll] = useState(false);
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
      location: 'Мирабад',
      selected: false
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
      location: 'Юнусабад',
      selected: false
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
      location: 'Чиланзар',
      selected: false
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
      location: 'Янгихаёт',
      selected: false
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
      location: 'Сергели',
      selected: false
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
      location: 'Учтепи',
      selected: false
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
      location: 'Яшнабад',
      selected: false
    }
  ]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState({ start: '', end: '' });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleMenu = () => setIsNavActive(!isNavActive);
  const handleNavClick = (href) => setActiveNavItem(href);

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

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setOrders(orders.map((order) => ({ ...order, selected: e.target.checked })));
  };

  const handleOrderSelect = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, selected: !order.selected } : order
      )
    );
  };

  const handleStatusUpdate = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    window.location.reload();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Новый': return styles.statusNew;
      case 'Отгружен': return styles.statusShipped;
      case 'Доставлен': return styles.statusDelivered;
      case 'Возврат': return styles.statusReturn;
      case 'Отменен': return styles.statusCanceled;
      default: return styles.statusNew;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <Navigation
        isActive={isNavActive}
        toggleMenu={toggleMenu}
        activeNavItem={activeNavItem}
        onNavClick={handleNavClick}
      />
      
      <div className={`${styles.main} ${isNavActive ? styles.active : ''}`}>
        <Topbar toggleMenu={toggleMenu} />
        
        <div className={styles.hain}>
          <div className={styles.panel}>
            <div className={styles.panelBody}>
              {/* Action buttons at the top */}
              <a href="/customers" className={`${styles.button} ${styles.buttonSuccess}`}>
                <ShoppingCart size={16} /> Добавить заказ
              </a>
              <a href="#" className={`${styles.button} ${styles.buttonWarning} ${styles.pullRight}`}>
                <Clock size={16} /> Просроченные заказы
              </a>
              
              {/* Filter section */}
              <div className={styles.filterSection}>
                <div className={styles.filterRow}>
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
                      <option>Статус</option>
                      <option>Новый</option>
                      <option>Отгружен</option>
                      <option>Доставлен</option>
                      <option>Возврат</option>
                      <option>Отменен</option>
                    </select>
                  </div>
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
                      <option>Тип оплаты</option>
                      <option>Наличные</option>
                      <option>Карта</option>
                    </select>
                  </div>
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
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
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
                      <option>Дата заявки</option>
                      <option>Дата отгрузки</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.filterRow}>
                  <div className={styles.filterItem}>
                    <button 
                      className={styles.filterButton}
                      onClick={() => setIsDatePickerOpen(true)}
                    >
                      <span>
                        <Calendar size={16} style={{ marginRight: '6px' }} />
                        {dateRange.start || 'Начало'} - {dateRange.end || 'Конец'}
                      </span>
                      <ChevronDown size={16} />
                    </button>
                    
                    {isDatePickerOpen && (
                      <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999
                      }}>
                        <div style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '4px',
                          width: '300px'
                        }}>
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Начало:</label>
                            <input
                              type="date"
                              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                              value={tempDateRange.start || ''}
                              onChange={handleDateChange('start')}
                            />
                          </div>
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Конец:</label>
                            <input
                              type="date"
                              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                              value={tempDateRange.end || ''}
                              onChange={handleDateChange('end')}
                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                              style={{ padding: '6px 12px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                              onClick={handleDateCancel}
                            >
                              Отмена
                            </button>
                            <button
                              style={{ padding: '6px 12px', backgroundColor: '#5bc0de', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                              onClick={handleDateApply}
                            >
                              Применить
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
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
                  
                  <div className={styles.filterItem}>
                    <select className={styles.filterSelect}>
                      <option>Категория клиента</option>
                      <option>Оптовый</option>
                      <option>Розничный</option>
                    </select>
                  </div>
                  
                  <div className={styles.filterItem} style={{ display: 'flex', gap: '10px' }}>
                    <select className={styles.filterSelect} style={{ flex: 1 }}>
                      <option>Склад</option>
                      <option>Центральный склад</option>
                    </select>
                    <button className={styles.refreshButton} onClick={handleRefresh}>
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Table tools */}
              <div className={styles.tableTools}>
                <div className={styles.rowsPerPage}>
                  <span>По</span>
                  <select 
                    className={styles.rowsPerPageSelect}
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                <div className={styles.searchBox}>
                  <span>Быстрый поиск:</span>
                  <input type="text" className={styles.searchInput} placeholder="Поиск..." />
                </div>
              </div>
              
              {/* Orders table */}
              <div style={{ overflowX: 'auto' }}>
                <table className={styles.ordersTable}>
                  <thead>
                    <tr>
                      <th className={styles.checkboxCell}>
                        <input 
                          type="checkbox" 
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className={styles.numberCell}>№</th>
                      <th>Дата заявки</th>
                      <th>Дата отгрузки</th>
                      <th>Клиент</th>
                      <th className={styles.quantityCell}>Кол-во</th>
                      <th>Тип цены</th>
                      <th className={styles.amountCell}>Сумма</th>
                      <th>Статус</th>
                      <th>Агент</th>
                      <th>Местность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className={styles.checkboxCell}>
                          <input 
                            type="checkbox" 
                            checked={order.selected}
                            onChange={() => handleOrderSelect(order.id)}
                          />
                        </td>
                        <td className={styles.numberCell}>{order.id}</td>
                        <td className={styles.dateCell}>
                          {order.date.time}<br />{order.date.date}
                        </td>
                        <td>
                          {formatDate(order.shipDate)}
                        </td>
                        <td>{order.client}</td>
                        <td className={styles.quantityCell}>{order.quantity}</td>
                        <td>{order.priceType}</td>
                        <td className={styles.amountCell}>{order.amount}</td>
                        <td className={styles.statusCell}>
                          <button className={`${styles.statusButton} ${getStatusClass(order.status)}`}>
                            {order.status}
                          </button>
                        </td>
                        <td>{order.agent}</td>
                        <td>{order.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Action buttons */}
              <div className={styles.actionButtons}>
                <button className={`${styles.actionButton} ${styles.greenButton}`}>
                  <PlaneTakeoff size={16} /> Изменить статус
                </button>
                <button className={`${styles.actionButton} ${styles.blueButton}`}>
                  Загруз <FileText size={16} />
                </button>
                <button className={`${styles.actionButton} ${styles.blueButton}`}>
                  Экспорт в 1С <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
