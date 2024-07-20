"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";

const PremierCalibrationCalc = () => {
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
    let price = basePrice + wins * 500;
    if (options.priority) price += 200;
    if (options.express) price += 300;
    if (options.stream) price += 100;
    return price;
  };

  const handleOptionChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const elo = [
    "Без звания",
    "Серый",
    "Голубой",
    "Синий",
    "Фиолетовый",
    "Розовый",
    "Красный",
    "Золотой",
  ];

  const images = [
    "/calc/levels/0.png",
    "/calc/levels/1.png",
    "/calc/levels/2.png",
    "/calc/levels/3.png",
    "/calc/levels/4.png",
    "/calc/levels/5.png",
    "/calc/levels/6.png",
    "/calc/levels/7.png",
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
    setWins(wins + 1);
  };

  const decrementWins = () => {
    if (wins > 0) {
      setWins(wins - 1);
    }
  };

  const handleWinsChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setWins(value);
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
              <button className={styles.subtract} onClick={decrementRating}>
                -
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  <span className={styles.span}>{elo[currentRatingIndex]}</span>
                </div>
              </div>
              <button className={styles.add} onClick={incrementRating}>
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
              <button className={styles.subtract} onClick={decrementWins}>
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
              <button className={styles.add} onClick={incrementWins}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.switches}>
        <div className={styles.switchBody}>
          <div className={styles.column}>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.noAccountTransfer}
                onChange={() => handleOptionChange("noAccountTransfer")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>БЕЗ ПЕРЕДАЧИ АККАУНТА</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.solo}
                onChange={() => handleOptionChange("solo")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>В соло</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.steamOffline}
                onChange={() => handleOptionChange("steamOffline")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>STEAM OFFLINE</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
          </div>
          <div className={styles.column}>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.priority}
                onChange={() => handleOptionChange("priority")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>Priority</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.express}
                onChange={() => handleOptionChange("express")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>Экспресс</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
            <label className={styles.switchLabel}>
              <input
                className={styles.switch}
                type="checkbox"
                checked={options.stream}
                onChange={() => handleOptionChange("stream")}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchTitle}>Стрим</span>
              <a className="tooltip">
                <Image
                  className={styles.switchTooltip}
                  src="./calc/info.svg"
                  width={14}
                  height={14}
                  alt="информация"
                ></Image>
              </a>
              <Tooltip
                anchorSelect=".tooltip"
                style={{ backgroundColor: "rgba(73, 113, 255, 1)" }}
                place="top"
              >
                Описание
              </Tooltip>
            </label>
          </div>
        </div>
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
                  type: "Прьемьер калибровка",
                  price: calculatePrice(),
                },
              }}
            >
              ЗАКАЗАТЬ БУСТ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremierCalibrationCalc;
