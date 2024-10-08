"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import CalcSwitches from "@/components/CalcSwitches/CalcSwitches";

const FiByLevelCalc = () => {
  const [options, setOptions] = useState({
    noAccountTransfer: false,
    solo: false,
    steamOffline: false,
    priority: false,
    express: false,
    stream: false,
  });

  const [currentRatingIndex, setCurrentRatingIndex] = useState(0);
  const [desiredRatingIndex, setDesiredRatingIndex] = useState(0);
  const [price, setPrice] = useState(0);

  const basePrice = 0;
  const calculatePrice = () => {
    let price = basePrice;
    for (let i = currentRatingIndex + 1; i <= desiredRatingIndex; i++) {
      price += levelPrices[elo[i]];
    }

    if (options.noAccountTransfer) price *= 1.2;
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
    "1 уровень",
    "2 уровень",
    "3 уровень",
    "4 уровень",
    "5 уровень",
    "6 уровень",
    "7 уровень",
    "8 уровень",
    "9 уровень",
    "10 уровень",
  ];

  const images = [
    "/calc/faceit/1.png",
    "/calc/faceit/2.png",
    "/calc/faceit/3.png",
    "/calc/faceit/4.png",
    "/calc/faceit/5.png",
    "/calc/faceit/6.png",
    "/calc/faceit/7.png",
    "/calc/faceit/8.png",
    "/calc/faceit/9.png",
    "/calc/faceit/10.png",
  ];

  const levelPrices = {
    "1 уровень": 0,
    "2 уровень": 430,
    "3 уровень": 510,
    "4 уровень": 550,
    "5 уровень": 570,
    "6 уровень": 650,
    "7 уровень": 810,
    "8 уровень": 990,
    "9 уровень": 1450,
    "10 уровень": 1750,
  };

  const handleCurrentRatingChange = (direction) => {
    setCurrentRatingIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return 0;
      if (newIndex >= elo.length) return elo.length - 1;
      setDesiredRatingIndex(newIndex);
      return newIndex;
    });
  };

  const handleDesiredRatingChange = (direction) => {
    setDesiredRatingIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < currentRatingIndex) return currentRatingIndex;
      if (newIndex >= elo.length) return elo.length - 1;
      return newIndex;
    });
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
            width={70}
            height={70}
            quality={100}
            alt="звания"
          />
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button
                className={styles.subtract}
                onClick={() => handleCurrentRatingChange(-1)}
              >
                -
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  <span className={styles.span}>{elo[currentRatingIndex]}</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() => handleCurrentRatingChange(1)}
              >
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
              <button
                className={styles.subtract}
                onClick={() => handleDesiredRatingChange(-1)}
              >
                -
              </button>
              <div className={styles.center}>
                <div className={styles.desiredTitle}>Желаемый Рейтинг</div>
                <div className={styles.inputWrapper}>
                  <span className={styles.span}>{elo[desiredRatingIndex]}</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() => handleDesiredRatingChange(1)}
              >
                +
              </button>
            </div>
          </div>
          <Image
            src={images[desiredRatingIndex]}
            width={70}
            height={70}
            quality={100}
            alt="звания"
          />
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
                  system: "Faceit",
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
                  goal: elo[desiredRatingIndex],
                  current: elo[currentRatingIndex],
                  type: "По уровню",
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

export default FiByLevelCalc;
