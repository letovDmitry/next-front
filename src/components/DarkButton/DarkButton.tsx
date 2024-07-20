"use client";

import React from "react";
import Link from "next/link";
import styles from "./darkbutton.module.scss";

type DarkButtonProps = {
  title: string;
  link: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const DarkButton: React.FC<DarkButtonProps> = ({ title, link, onClick }) => {
  return (
    <Link className={styles.btn} href={link} onClick={onClick}>
      {title}
    </Link>
  );
};

export default DarkButton;
