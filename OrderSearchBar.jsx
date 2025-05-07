// OrderSearchBar.jsx - Компонент для строки фильтров с кастомным datepicker
import React, { useState } from 'react';
import Select from 'react-select';
import { IonIcon } from '@ionic/react';
import { calendarOutline, chevronDownOutline, refreshOutline } from 'ionicons/icons';
import styles from './Orders.module.css';

const OrderSearchBar = ({
  statuses,
  priceTypes,
  agents,
  areas,
  clientCategories,
  warehouses,
  statusFilter,
  priceTypeFilter,
  agentFilter,
  byDateFilter,
  areaFilter,
  clientCategoryFilter,
  warehouseFilter,
  dateRange,
  handleStatusChange,
  handlePriceTypeChange,
  handleAgentChange,
  handleByDateChange,
  handleAreaChange,
  handleClientCategoryChange,
  handleWarehouseChange,
  handleDateRangeChange,
  handleRefresh,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState({ start: dateRange.start, end: dateRange.end });

  const formatOptions = (items) =>
    items.map(item => ({ value: item.id, label: item.name }));

  const statusOptions = formatOptions(statuses);
  const priceTypeOptions = formatOptions(priceTypes);
  const agentOptions = formatOptions(agents);
  const areaOptions = formatOptions(areas);
  const clientCategoryOptions = formatOptions(clientCategories);
  const warehouseOptions = formatOptions(warehouses);
  const byDateOptions = [
    { value: 'start_date', label: 'Дата заявки' },
    { value: 'end_date', label: 'Дата отгрузки' },
  ];

  const handleSelectChange = (selected, action) => {
    const handlerMap = {
      status: handleStatusChange,
      price_type: handlePriceTypeChange,
      agent: handleAgentChange,
      area: handleAreaChange,
      client_category: handleClientCategoryChange,
      warehouse: handleWarehouseChange,
      bydate: handleByDateChange,
    };
    const handler = handlerMap[action.name];
    if (handler) {
      if (action.name === 'bydate') {
        const value = selected ? selected.value : '';
        handler(value);
      } else {
        const values = selected ? selected.map(s => s.value) : [];
        handler(values);
      }
    }
  };

  const handleDateApply = () => {
    handleDateRangeChange(tempDateRange.start, tempDateRange.end);
    setIsDatePickerOpen(false);
  };

  const handleDateCancel = () => {
    setTempDateRange({ start: dateRange.start, end: dateRange.end });
    setIsDatePickerOpen(false);
  };

  const handleDateChange = (field) => (e) => {
    setTempDateRange(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className={styles.innerContainer}>
      <form id="select">
        <div className={`${styles.filtr} ${styles.row}`}>
          <div className={styles.filterGroup}>
            <div className={styles.filterItem}>
              <Select
                id="status"
                name="status"
                options={statusOptions}
                isMulti
                value={statusOptions.filter(option => statusFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'status' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Статус"
              />
            </div>
            <div className={styles.filterItem}>
              <Select
                id="price_type"
                name="price_type"
                options={priceTypeOptions}
                isMulti
                value={priceTypeOptions.filter(option => priceTypeFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'price_type' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Тип оплаты"
              />
            </div>
            <div className={styles.filterItem}>
              <Select
                id="agent"
                name="agent"
                options={agentOptions}
                isMulti
                value={agentOptions.filter(option => agentFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'agent' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Агент"
              />
            </div>
            <div className={styles.filterItem}>
              <Select
                id="bydate"
                name="bydate"
                options={byDateOptions}
                value={byDateOptions.find(option => option.value === byDateFilter)}
                onChange={(selected) => handleSelectChange(selected, { name: 'bydate' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Выберите дату"
              />
            </div>
            <div className={styles.filterItem}>
              <button
                type="button"
                className={`${styles.button} ${styles.buttonInfo} ${styles.reportrangeOrder}`}
                onClick={() => setIsDatePickerOpen(true)}
              >
                <IonIcon icon={calendarOutline} />{' '}
                <span>{dateRange.start || 'Начало'} - {dateRange.end || 'Конец'}</span>{' '}
                <IonIcon icon={chevronDownOutline} />
              </button>
              {isDatePickerOpen && (
                <div className={styles.datePickerModal}>
                  <div className={styles.datePickerContent}>
                    <label>
                      Начало:
                      <input
                        type="date"
                        value={tempDateRange.start || ''}
                        onChange={handleDateChange('start')}
                      />
                    </label>
                    <label>
                      Конец:
                      <input
                        type="date"
                        value={tempDateRange.end || ''}
                        onChange={handleDateChange('end')}
                      />
                    </label>
                    <div className={styles.datePickerButtons}>
                      <button type="button" onClick={handleDateApply}>Применить</button>
                      <button type="button" onClick={handleDateCancel}>Отмена</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterItem}>
              <Select
                id="area"
                name="area"
                options={areaOptions}
                isMulti
                value={areaOptions.filter(option => areaFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'area' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Местность"
              />
            </div>
            <div className={styles.filterItem}>
              <Select
                id="client_category"
                name="client_category"
                options={clientCategoryOptions}
                isMulti
                value={clientCategoryOptions.filter(option => clientCategoryFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'client_category' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Категория клиента"
              />
            </div>
            <div className={styles.filterItem}>
              <Select
                id="warehouse"
                name="warehouse"
                options={warehouseOptions}
                isMulti
                value={warehouseOptions.filter(option => warehouseFilter.includes(option.value))}
                onChange={(selected) => handleSelectChange(selected, { name: 'warehouse' })}
                className={styles.selectpicker}
                classNamePrefix="react-select"
                placeholder="Склад"
              />
            </div>
            <div className={styles.filterItem}>
              <div id="la-buttons">
                <a className={`${styles.button} ${styles.buttonInfo} ${styles.pullRight}`} onClick={handleRefresh}>
                  <IonIcon icon={refreshOutline} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderSearchBar;