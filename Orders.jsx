// Orders.jsx - Оптимизированная обёртка для страницы заказов с кастомным datepicker
import React, { useState, useEffect, useCallback } from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline, timeOutline } from 'ionicons/icons';
import Navigation from './Navigation';
import Topbar from './Topbar';
import OrderSearchBar from './OrderSearchBar';
import OrdersTable from './OrdersTable';
import styles from './Orders.module.css';

const Orders = () => {
  const [isNavActive, setIsNavActive] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState('/orders');

  const toggleMenu = () => setIsNavActive(!isNavActive);
  const handleNavClick = (href) => setActiveNavItem(href);

  const [statusFilter, setStatusFilter] = useState([]);
  const [priceTypeFilter, setPriceTypeFilter] = useState([]);
  const [agentFilter, setAgentFilter] = useState([]);
  const [byDateFilter, setByDateFilter] = useState('start_date');
  const [areaFilter, setAreaFilter] = useState([]);
  const [clientCategoryFilter, setClientCategoryFilter] = useState([]);
  const [warehouseFilter, setWarehouseFilter] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [orders, setOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const statuses = [
    { id: 1, name: 'Новый' },
    { id: 2, name: 'Отгружен' },
    { id: 3, name: 'Доставлен' },
    { id: 4, name: 'Возврат' },
    { id: 5, name: 'Отменен' },
  ];
  const priceTypes = [
    { id: 1, name: 'Наличные' },
    { id: 2, name: 'Карта' },
  ];
  const agents = [
    { id: 1, name: 'Агент 1' },
    { id: 2, name: 'Агент 2' },
  ];
  const areas = [
    { id: 1, name: 'Местность 1' },
    { id: 2, name: 'Местность 2' },
  ];
  const clientCategories = [
    { id: 1, name: 'Категория 1' },
    { id: 2, name: 'Категория 2' },
  ];
  const warehouses = [
    { id: 1, name: 'Центральный склад' },
  ];

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
      const data = await response.json();
      setOrders(data); // Немедленная отрисовка таблицы
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  }, []);

  useEffect(() => {
    fetchData('/refresh');
  }, [fetchData]);

  const handleStatusChange = useCallback((values) => {
    setStatusFilter(values);
    const query = values.length ? `/status/?status=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handlePriceTypeChange = useCallback((values) => {
    setPriceTypeFilter(values);
    const query = values.length ? `/type/?type=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handleAgentChange = useCallback((values) => {
    setAgentFilter(values);
    const query = values.length ? `/agent/?agent=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handleByDateChange = useCallback((value) => {
    setByDateFilter(value);
    fetchData(`/bydate/?bydate=${value}`);
  }, [fetchData]);

  const handleAreaChange = useCallback((values) => {
    setAreaFilter(values);
    const query = values.length ? `/area/?area=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handleClientCategoryChange = useCallback((values) => {
    setClientCategoryFilter(values);
    const query = values.length ? `/client/?client=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handleWarehouseChange = useCallback((values) => {
    setWarehouseFilter(values);
    const query = values.length ? `/warehouse/?warehouse=${values.join(',')}` : '/refresh';
    fetchData(query);
  }, [fetchData]);

  const handleDateRangeChange = useCallback((start, end) => {
    setDateRange({ start, end });
    const query = `/date/?start=${start}&end=${end}`;
    fetchData(query);
  }, [fetchData]);

  const handleRefresh = () => window.location.reload();

  const handleSelectAll = useCallback((e) => {
    setSelectAll(e.target.checked);
    setOrders(orders.map((order) => ({ ...order, selected: e.target.checked })));
  }, [orders]);

  const handleOrderSelect = useCallback((id) => {
    setOrders(
      orders.map((order) =>
        order.id_order === id ? { ...order, selected: !order.selected } : order
      )
    );
  }, [orders]);

  const handleStatusUpdate = useCallback((id, newStatus) => {
    fetchData(`/edit?rid=${id}&status=${newStatus}`);
  }, [fetchData]);

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
              <a className={`${styles.button} ${styles.buttonSuccess}`} href="/customers">
                <IonIcon icon={cartOutline} /> Добавить заказ
              </a>
              <a className={`${styles.button} ${styles.buttonWarning} ${styles.pullRight}`} style={{ margin: '0 15px' }} href="">
                <IonIcon icon={timeOutline} /> Просроченные заказы
              </a>
              <OrderSearchBar
                statuses={statuses}
                priceTypes={priceTypes}
                agents={agents}
                areas={areas}
                clientCategories={clientCategories}
                warehouses={warehouses}
                statusFilter={statusFilter}
                priceTypeFilter={priceTypeFilter}
                agentFilter={agentFilter}
                byDateFilter={byDateFilter}
                areaFilter={areaFilter}
                clientCategoryFilter={clientCategoryFilter}
                warehouseFilter={warehouseFilter}
                dateRange={dateRange}
                handleStatusChange={handleStatusChange}
                handlePriceTypeChange={handlePriceTypeChange}
                handleAgentChange={handleAgentChange}
                handleByDateChange={handleByDateChange}
                handleAreaChange={handleAreaChange}
                handleClientCategoryChange={handleClientCategoryChange}
                handleWarehouseChange={handleWarehouseChange}
                handleDateRangeChange={handleDateRangeChange}
                handleRefresh={handleRefresh}
              />
              <OrdersTable
                orders={orders}
                selectAll={selectAll}
                handleSelectAll={handleSelectAll}
                handleOrderSelect={handleOrderSelect}
                handleStatusUpdate={handleStatusUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;