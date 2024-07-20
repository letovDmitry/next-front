'use client';

import React from 'react';
import styles from '../Calculator/calculator.module.scss';
import CalcSwitch from '../CalcSwitch/CalcSwitch';

const CalcSwitches = ({ options, handleOptionChange }) => {
  const switchData = [
    { label: 'БЕЗ ПЕРЕДАЧИ АККАУНТА', option: 'noAccountTransfer', tooltipText: 'Описание' },
    { label: 'В соло', option: 'solo', tooltipText: 'Описание' },
    { label: 'STEAM OFFLINE', option: 'steamOffline', tooltipText: 'Описание' },
    { label: 'Priority', option: 'priority', tooltipText: 'Описание' },
    { label: 'Экспресс', option: 'express', tooltipText: 'Описание' },
    { label: 'Стрим', option: 'stream', tooltipText: 'Описание' },
  ];

  const renderSwitches = (startIndex, endIndex) => {
    return switchData.slice(startIndex, endIndex).map(({ label, option, tooltipText }) => (
      <CalcSwitch
        key={option}
        label={label}
        checked={options[option]}
        onChange={() => handleOptionChange(option)}
        tooltipText={tooltipText}
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
