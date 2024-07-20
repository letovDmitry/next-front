import React from "react";
import Link from "next/link";
import styles from "./regularbutton.module.scss";

type RegularButtonProps = {
  title: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const RegularButton: React.FC<RegularButtonProps> = ({
  title,
  link,
  onClick,
}) => {
  return (
    <Link
      onClick={onClick}
      className={styles.btn}
      href={link || "#"}
    >
      {title}
    </Link>
  );
};

export default RegularButton;
