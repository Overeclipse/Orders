// OrdersTable.jsx - Обновленный компонент таблицы заказов
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { paperPlaneOutline, documentTextOutline, downloadOutline } from 'ionicons/icons';
import styles from './Orders.module.css';

const OrdersTable = ({
  orders,
  selectAll,
  handleSelectAll,
  handleOrderSelect,
  handleStatusUpdate,
}) => {
  const [statusDropdowns, setStatusDropdowns] = useState({});
  const [massStatusDropdownOpen, setMassStatusDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleStatusDropdown = (id) => {
    setStatusDropdowns((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = false;
      });
      newState[id] = !prev[id];
      return newState;
    });
    setMassStatusDropdownOpen(false);
    setExportDropdownOpen(false);
  };

  const toggleMassStatusDropdown = () => {
    setMassStatusDropdownOpen((prev) => !prev);
    setExportDropdownOpen(false);
    setStatusDropdowns({});
  };

  const toggleExportDropdown = () => {
    setExportDropdownOpen((prev) => !prev);
    setMassStatusDropdownOpen(false);
    setStatusDropdowns({});
  };

  const handleStatusChange = (id, newStatus) => {
    handleStatusUpdate(id, newStatus);
    setStatusDropdowns((prev) => ({ ...prev, [id]: false }));
  };

  const getStatusButton = (status) => {
    switch (status) {
      case 1:
        return <button className={styles.statusButton + ' ' + styles.statusNew}>Новый</button>;
      case 2:
        return <button className={styles.statusButton + ' ' + styles.statusShipped}>Отгружен</button>;
      case 3:
        return <button className={styles.statusButton + ' ' + styles.statusDelivered}>Доставлен</button>;
      case 4:
        return <button className={styles.statusButton + ' ' + styles.statusReturn}>Возврат</button>;
      case 5:
        return <button className={styles.statusButton + ' ' + styles.statusCanceled}>Отменен</button>;
      default:
        return <button className={styles.statusButton + ' ' + styles.statusNew}>Новый</button>;
    }
  };

  const renderStatusButton = (order) => {
    return (
      <div className={styles.dropdown}>
        {getStatusButton(order.stat)}
      </div>
    );
  };

  // Фильтрация заказов
  const filteredOrders = orders.filter(order =>
    order.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.agent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.area?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Пагинация
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Форматирование даты отгрузки
  const formatShippingDate = (dateString) => {
    if (!dateString) return '';
    try {
      return dateString;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableToolbar}>
        <div className={styles.rowsPerPageContainer}>
          <span>По</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={styles.rowsPerPageSelect}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className={styles.searchContainer}>
          <span>Быстрый поиск:</span>
          <input
            type="search"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th className={styles.checkboxHeader}>
                <input
                  type="checkbox"
                  id="order-select-all"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className={styles.numberHeader}>№</th>
              <th className={styles.dateHeader}>Дата заявки</th>
              <th className={styles.shippingDateHeader}>Дата отгрузки</th>
              <th className={styles.clientHeader}>Клиент</th>
              <th className={styles.quantityHeader}>Кол-во</th>
              <th className={styles.priceTypeHeader}>Тип цены</th>
              <th className={styles.amountHeader}>Сумма</th>
              <th className={styles.statusHeader}>Статус</th>
              <th className={styles.agentHeader}>Агент</th>
              <th className={styles.areaHeader}>Местность</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id_order} className={styles.orderRow}>
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={order.selected || false}
                    onChange={() => handleOrderSelect(order.id_order)}
                  />
                </td>
                <td className={styles.numberCell}>{order.id_order}</td>
                <td className={styles.dateCell}>
                  {order.start_time}<br/>{order.start}
                </td>
                <td className={styles.shippingDateCell}>{formatShippingDate(order.end)}</td>
                <td className={styles.clientCell}>{order.client_name}</td>
                <td className={styles.quantityCell}>{order.count}</td>
                <td className={styles.priceTypeCell}>{order.price_type}</td>
                <td className={styles.amountCell}>{order.amount}</td>
                <td className={styles.statusCell}>{renderStatusButton(order)}</td>
                <td className={styles.agentCell}>{order.agent}</td>
                <td className={styles.areaCell}>{order.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? styles.activePageButton : styles.pageButton}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      <div className={styles.actionButtons}>
        <div className={styles.dropdown}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            onClick={toggleMassStatusDropdown}
          >
            <IonIcon icon={paperPlaneOutline} /> Изменить статус
          </button>
          {massStatusDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <a className={`${styles.dropdownItem} ${styles.buttonWarning}`} href="#">
                  <IonIcon icon="airplane-departure" /> Отгружен
                </a>
              </li>
              <li>
                <a className={`${styles.dropdownItem} ${styles.buttonSuccess}`} href="#">
                  <IonIcon icon="airplane-check" /> Доставлен
                </a>
              </li>
              <li>
                <a className={`${styles.dropdownItem} ${styles.buttonDanger}`} href="#">
                  <IonIcon icon="airplane-arrival" /> Возврат
                </a>
              </li>
              <li>
                <a className={`${styles.dropdownItem} ${styles.buttonSecondary}`} href="#">
                  <IonIcon icon="airplane-slash" /> Отменен
                </a>
              </li>
              <li>
                <a className={`${styles.dropdownItem} ${styles.buttonInfo}`} href="#">
                  <IonIcon icon="airplane" /> Восстановить
                </a>
              </li>
            </ul>
          )}
        </div>
        <span className={`${styles.button} ${styles.buttonInfo} ${styles.orderZagruz}`}>
          Загруз <IonIcon icon={documentTextOutline} />
        </span>
        <div className={styles.dropdown}>
          <button
            className={`${styles.button} ${styles.buttonInfo}`}
            onClick={toggleExportDropdown}
          >
            Экспорт в 1С <IonIcon icon={downloadOutline} />
          </button>
          {exportDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <button className={`${styles.button} ${styles.buttonInfo}`} value="XML2">
                  Загруз XML 2.0 <IonIcon icon="download" />
                </button>
              </li>
              <li>
                <button className={`${styles.button} ${styles.buttonInfo}`} value="CSV">
                  Загруз CSV 1.0 <IonIcon icon="download" />
                </button>
              </li>
              <li>
                <button className={`${styles.button} ${styles.buttonInfo}`} value="EXCEL1C1">
                  Загруз EXCEL 1.0 <IonIcon icon="download" />
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;