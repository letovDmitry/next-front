"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkButton from "../DarkButton/DarkButton";
import styles from "./header.module.scss";
import RegularButton from "../RegularButton/RegularButton";
import Cookies from "js-cookie";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Set loading to false once the token check is done
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await Cookies.remove("access_token");
    await Cookies.remove("isBooster");
    window.location.reload();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src="/logo.svg" alt="лого" width={153} height={32} />
            </Link>
          </div>
          <button className={styles.burgerMenu} onClick={toggleMenu}>
            ☰
          </button>
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
            {loading ? (
             
              <div></div>
            ) : isLoggedIn ? (
              <>
                <RegularButton
                  title="Личный кабинет"
                  link={"/member"}
                  onClick={closeMenu}
                />
                <DarkButton
                  title="Выйти"
                  link="/login"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <DarkButton
                title="Для участников"
                link="/login"
                onClick={closeMenu}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
