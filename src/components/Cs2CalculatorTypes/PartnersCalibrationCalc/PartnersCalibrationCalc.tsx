"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import CalcSwitches from "@/components/CalcSwitches/CalcSwitches";

const PartnersCalibrationCalc = () => {
  const [options, setOptions] = useState({
    noAccountTransfer: false,
    solo: false,
    steamOffline: false,
    priority: false,
    express: false,
    stream: false,
  });

  const [currentRatingIndex, setCurrentRatingIndex] = useState(0);
  const [wins, setWins] = useState(0);

  const basePrice = 0;
  const calculatePrice = () => {
    let price = basePrice + wins * 75;
    if (options.solo) price *= 1.55;
    if (options.priority) price *= 1.25;
    if (options.express) price *= 1.6;
    if (options.stream) price *= 1.15;
    if (options.steamOffline) price *= 1.0;

    return price.toFixed(2);
  };

  const handleOptionChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const elo = [
    "Серебро-1",
    "Серебро-2",
    "Серебро-3",
    "Серебро-4",
    "Серебро-Элита",
    "Серебро-Великий Магистр",
    "Золотая Звезда-1",
    "Золотая Звезда-2",
    "Золотая Звезда-3",
    "Золотая Звезда-Магистр",
    "Магистр Хранитель-1",
    "Магистр Хранитель-2",
    "Магистр Хранитель-Элита",
    "Заслуженный Магистр-Хранитель",
    "Легендарный Беркут",
    "Легендарный Беркут-Магистр",
    "Великий Магистр Высшего Ранга",
    "Всемирная Элита",
  ];

  const images = [
    "/calc/partner-ranks/1.png",
    "/calc/partner-ranks/2.png",
    "/calc/partner-ranks/3.png",
    "/calc/partner-ranks/4.png",
    "/calc/partner-ranks/5.png",
    "/calc/partner-ranks/6.png",
    "/calc/partner-ranks/7.png",
    "/calc/partner-ranks/8.png",
    "/calc/partner-ranks/9.png",
    "/calc/partner-ranks/10.png",
    "/calc/partner-ranks/11.png",
    "/calc/partner-ranks/12.png",
    "/calc/partner-ranks/13.png",
    "/calc/partner-ranks/14.png",
    "/calc/partner-ranks/15.png",
    "/calc/partner-ranks/16.png",
    "/calc/partner-ranks/17.png",
    "/calc/partner-ranks/18.png",
  ];

  const incrementRating = () => {
    if (currentRatingIndex < elo.length - 1) {
      setCurrentRatingIndex(currentRatingIndex + 1);
    }
  };

  const decrementRating = () => {
    if (currentRatingIndex > 0) {
      setCurrentRatingIndex(currentRatingIndex - 1);
    }
  };

  const incrementWins = () => {
    if (wins < 10) {
      setWins(wins + 1);
    }
  };

  const decrementWins = () => {
    if (wins > 0) {
      setWins(wins - 1);
    }
  };

  const handleWinsChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setWins(value);
  };

  const handleSubmit = (e) => {
    if (calculatePrice() === "0.00") {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.calcs}>
        <div className={styles.item}>
          <Image
            src={images[currentRatingIndex]}
            width={32}
            height={100}
            alt="звания"
          />
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button className={styles.minus} onClick={decrementRating}>
                -
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  <span className={styles.span}>{elo[currentRatingIndex]}</span>
                </div>
              </div>
              <button className={styles.plus} onClick={incrementRating}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className={styles.arrow}>
          <Image
            src="./calc/straight.svg"
            alt="стрелка"
            width={42}
            height={40}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.desiredRating}>
            <div className={styles.desiredCalc}>
              <button className={styles.minus} onClick={decrementWins}>
                -
              </button>
              <div className={styles.center}>
                <div className={styles.desiredTitle}>Кол-во побед</div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    value={wins}
                    onChange={handleWinsChange}
                    min="0"
                  />
                </div>
              </div>
              <button className={styles.plus} onClick={incrementWins}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.switches}>
      <CalcSwitches
          options={options}
          handleOptionChange={handleOptionChange}
        />
        <div className={styles.priceColumn}>
          <div className={styles.priceText}>ИТОГОВАЯ ЦЕНА:</div>
          <div className={styles.price}>{calculatePrice()} ₽</div>
          <div className={styles.submit}>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  system: "CS2",
                  options: Object.keys(options)
                    .filter((e) => options[e])
                    .map((e) => {
                      if (options[e]) {
                        switch (e) {
                          case "noAccountTransfer":
                            return "Без передачи аккаунта";
                          case "solo":
                            return "В соло";
                          case "steamOffline":
                            return "Steam Offline";
                          case "priority":
                            return "Priority";
                          case "express":
                            return "Экспресс";
                          case "stream":
                            return "Стрим";
                        }
                      }
                    })
                    .join(),
                  goal: `${wins} побед`,
                  current: elo[currentRatingIndex],
                  type: "Напарники калибровка",
                  price: calculatePrice(),
                },
              }}
              onClick={handleSubmit}
            >
              ЗАКАЗАТЬ БУСТ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersCalibrationCalc;
