import React, { useState } from "react";
import styles from "./ordertable.module.scss";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import {
  useCompleteOrderForBoosterMutation,
  useGetOrdersForBoosterQuery,
  useGetOrdersForMemberQuery,
} from "@/store/services/ordersApi";
import { useGetMeQuery } from "@/store/services/userApi";

const OrderTable = () => {
  const { data: user } = useGetMeQuery();
  const { data: boosterOrders, refetch } = useGetOrdersForBoosterQuery();
  const { data: memberOrders } = useGetOrdersForMemberQuery();

  const [completeOrder] = useCompleteOrderForBoosterMutation();
  const data = user?.isBooster ? boosterOrders : memberOrders;

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 6;

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayOrders = data?.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );


  return (
    <div className="container">
      <div className={styles.height}>
        {data && data.length > 0 ? (
          <div className="overflow">
                      <>
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
                  <th>Статус</th>
                  <th>Чат</th>
                </tr>
              </thead>
              <tbody>
                {displayOrders?.map((row, index) => (
                  <tr className={styles.tableRow} key={index}>
                    <td>{row.id}</td>
                    <td>{getDate(row.createdAt)}</td>
                    <td>{row.system}</td>
                    <td>{row.type}</td>
                    <td>{row.options || ""}</td>
                    <td>{row.current}</td>
                    <td>{row.goal}</td>
                    <td>
                      {row.status === "В процессе" && user?.isBooster ? (
                        <button
                          className={styles.btn}
                          onClick={() => completeOrder(row.id).then(() => refetch())}
                        >
                          Сдать заказ
                        </button>
                      ) : (
                        row.status
                      )}
                    </td>
                    <td>
                      {row.status === "Поиск бустера" ? (
                        <img src="/inputs/mute.svg" alt="mute" />
                      ) : (
                        <Link
                          href={{
                            pathname: "/chat",
                            query: {
                              orderId: row.id,
                              boosterEmail: row.booster?.email,
                              userEmail: row.user?.email,
                            },
                          }}
                        >
                          <img src="/inputs/unmute.svg" alt="unmute" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
          </div>
        ) : user?.isBooster ? (
          <div className={styles.noOrders}>
            К сожалению в данный момент у тебя нет активных заказов, чтобы взять заказ перейди на вкладку НОВЫЕ ЗАКАЗЫ
          </div>
        ) : (
          <div className={styles.noOrders}>
            К сожалению в данный момент у тебя нет заказов, чтобы заказать буст нажми <Link href="/#calcs">здесь</Link>
          </div>
        )}
      </div>
      {data && data.length > ordersPerPage && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(data.length / ordersPerPage)}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      )}
    </div>
  );
};

export default OrderTable;
