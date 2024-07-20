import React from 'react'
import styles from './orders.module.scss';
import NewOrderTable from '../NewOrderTable/NewOrderTable';

const NewOrders = () => {
  return (
    <div className={styles.orders}>

            <div className={styles.body}>
                <NewOrderTable />
            </div>

    </div>
  )
}

export default NewOrders
