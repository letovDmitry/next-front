import React, { useState } from "react";
import styles from "./Newordertable.module.scss";
import ReactPaginate from 'react-paginate';
import {
  useGetNewOrdersForBoosterQuery,
  useTakeOrderForBoosterMutation,
} from "@/store/services/ordersApi";

const NewOrderTable = () => {
  const { data } = useGetNewOrdersForBoosterQuery();
  const [takeOrder] = useTakeOrderForBoosterMutation();

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 8;

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayOrders = data ? data.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  ) : [];

  return (
      <div className="container">
        {data && data.length > 0 ? (
        <div className="overflow">          <>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Система</th>
              <th>Тип</th>
              <th>Доп. опции</th>
              <th>Текущий</th>
              <th>Цель</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((row, index) => (
              <tr className={styles.tableRow} key={index}>
                <td>{row.id}</td>
                <td>{getDate(row.createdAt)}</td>
                <td>{row.system}</td>
                <td>{row.type}</td>
                <td>{row.options || ""}</td>
                <td>{row.current}</td>
                <td>{row.goal}</td>
                <td>
                  <button
                    onClick={() => takeOrder(row.id)}
                    className={styles.btn}
                  >
                    Взять заказ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > ordersPerPage && (
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={Math.ceil(data.length / ordersPerPage)}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          />
        )}
      </></div>
        ) : (
          <div><p>Ожидание новых заказов...</p></div>
        )}
      </div>
  );
};

export default NewOrderTable;
