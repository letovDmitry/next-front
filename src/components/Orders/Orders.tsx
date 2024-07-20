import React from 'react'
import styles from './orders.module.scss';
import OrderTable from '../OrderTable/OrderTable';

const Orders = () => {
  return (
    <div className={styles.orders}>

            <div className={styles.body}>
                <OrderTable />
            </div>

    </div>
  )
}

export default Orders
