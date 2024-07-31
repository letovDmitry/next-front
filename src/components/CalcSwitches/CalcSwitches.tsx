'use client';

import React from 'react';
import styles from '../Calculator/calculator.module.scss';
import CalcSwitch from '../CalcSwitch/CalcSwitch';

const CalcSwitches = ({ options, handleOptionChange }) => {
  const switchData = [
    { label: 'БЕЗ ПЕРЕДАЧИ АККАУНТА', option: 'noAccountTransfer', tooltipText: 'Эта услуга позволяет вам играть с нами в лобби, без передачи данных вашего аккаунта' },
    { label: 'В соло', option: 'solo', tooltipText: 'Бустер будет играть на вашем аккаунте один, в соло' },
    { label: 'STEAM OFFLINE', option: 'steamOffline', tooltipText: 'Бустер выйдет из сети или поставит "Невидимку" в Steam во время выполнения вашего заказа' },
    { label: 'Priority', option: 'priority', tooltipText: 'Ваш заказ становится более приоритетным относительно другого объема заказов' },
    { label: 'Экспресс', option: 'express', tooltipText: 'Максимальная скорость выполнения заказа; Приступим к выполнению сразу после оплаты!' },
    { label: 'Стрим', option: 'stream', tooltipText: 'Бустер включит закрытый прямой эфир только для вас на платформе Twitch во время выполнения заказа' },
  ];

  const renderSwitches = (startIndex, endIndex) => {
    return switchData.slice(startIndex, endIndex).map(({ label, option, tooltipText }) => (
      <CalcSwitch
        key={option}
        label={label}
        checked={options[option]}
        onChange={() => handleOptionChange(option)}
        tooltipText={tooltipText}
        id={option} // Unique identifier for each tooltip
      />
    ));
  };

  return (
    <div className={styles.switchBody}>
      <div className={styles.column}>
        {renderSwitches(0, 3)}
      </div>
      <div className={styles.column}>
        {renderSwitches(3, 6)}
      </div>
    </div>
  );
};

export default CalcSwitches;
