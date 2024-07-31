"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import CalcSwitches from "@/components/CalcSwitches/CalcSwitches";

const PartnersInRankCalc = () => {
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
      price += rankPrices[elo[i]];
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

  const rankPrices = {
    "Серебро-1": 100,
    "Серебро-2": 100,
    "Серебро-3": 100,
    "Серебро-4": 100,
    "Серебро-Элита": 100,
    "Серебро-Великий Магистр": 100,
    "Золотая Звезда-1": 165,
    "Золотая Звезда-2": 165,
    "Золотая Звезда-3": 165,
    "Золотая Звезда-Магистр": 165,
    "Магистр Хранитель-1": 210,
    "Магистр Хранитель-2": 210,
    "Магистр Хранитель-Элита": 210,
    "Заслуженный Магистр-Хранитель": 290,
    "Легендарный Беркут": 390,
    "Легендарный Беркут-Магистр": 500,
    "Великий Магистр Высшего Ранга": 730,
    "Всемирная Элита": 1340,
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
            width={32}
            height={100}
            alt="звания"
          />
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button
                className={styles.minus}
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
                className={styles.plus}
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
                className={styles.minus}
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
                className={styles.plus}
                onClick={() => handleDesiredRatingChange(1)}
              >
                +
              </button>
            </div>
          </div>
          <Image
            src={images[desiredRatingIndex]}
            width={32}
            height={100}
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
                  goal: elo[desiredRatingIndex],
                  current: elo[currentRatingIndex],
                  type: "Напарники по званию",
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

export default PartnersInRankCalc;
