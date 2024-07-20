"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";

const FiByWinsCalc = () => {
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
    let price = basePrice + wins * 20;
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
    "Без уровня",
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
    "/calc/faceit/0.png",
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
            width={70}
            height={70}
            quality={100}
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
                  goal: `${wins} побед`,
                  current: elo[currentRatingIndex],
                  type: "По победам",
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

export default FiByWinsCalc;
