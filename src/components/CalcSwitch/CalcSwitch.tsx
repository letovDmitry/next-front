'use client';

import React from 'react';
import styles from '../Calculator/calculator.module.scss';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

const CalcSwitch = ({ label, checked, onChange, tooltipText, id }) => {
  return (
    <label className={styles.switchLabel}>
      <input
        className={styles.switch}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.slider}></span>
      <span className={styles.switchTitle}>{label}</span>
      <a className="tooltip" data-tooltip-id={id}>
        <Image className={styles.switchTooltip} src='/calc/info.svg' width={14} height={14} alt='информация' />
      </a>
      <Tooltip anchorSelect={`[data-tooltip-id="${id}"]`} style={{ backgroundColor: "rgba(73, 113, 255, 1)", zIndex: 1000 }} place="top">
        {tooltipText}
      </Tooltip>
    </label>
  );
};

export default CalcSwitch;
