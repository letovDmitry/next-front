"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import CalcSwitches from "@/components/CalcSwitches/CalcSwitches";

const FiEloCalc = () => {
  const [options, setOptions] = useState({
    noAccountTransfer: false,
    solo: false,
    steamOffline: false,
    priority: false,
    express: false,
    stream: false,
  });

  const [currentRating, setCurrentRating] = useState(0);
  const [desiredRating, setDesiredRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const basePrice = 0;

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

  const getRatingImage = (rating) => {
    if (rating >= 2001) return images[10];
    if (rating >= 1751) return images[9];
    if (rating >= 1531) return images[8];
    if (rating >= 1351) return images[7];
    if (rating >= 1201) return images[6];
    if (rating >= 1051) return images[5];
    if (rating >= 901) return images[4];
    if (rating >= 751) return images[3];
    if (rating >= 501) return images[2];
    if (rating >= 100) return images[1];
    return images[0];
  };

  const calculatePrice = () => {
    let price = basePrice;
    const eloDifference = Math.max(0, desiredRating - currentRating);

    const ratingRanges = [
      { max: 500, price: 2.92 },
      { max: 750, price: 3.04 },
      { max: 1050, price: 3.08 },
      { max: 1200, price: 3.96 },
      { max: 1350, price: 5.2 },
      { max: 1530, price: 5.6 },
      { max: 1750, price: 6 },
      { max: 2000, price: 7.4 },
      { max: 2200, price: 15 },
      { max: 2400, price: 18.4 },
      { max: 2500, price: 19.6 },
      { max: 2600, price: 27.6 },
      { max: 2700, price: 29 },
      { max: 2800, price: 31.2 },
      { max: 2900, price: 34 },
      { max: 3000, price: 38.4 },
    ];

    if (eloDifference > 0) {
      let remainingDifference = eloDifference;
      let currentThreshold = currentRating;

      for (let i = 0; i < ratingRanges.length; i++) {
        const range = ratingRanges[i];
        const rangeMax = Math.min(range.max, desiredRating);
        if (currentThreshold < rangeMax) {
          const rangeDifference = rangeMax - currentThreshold;
          price += rangeDifference * range.price;
          currentThreshold = rangeMax;
          remainingDifference -= rangeDifference;
        }
        if (remainingDifference <= 0) break;
      }
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

  const updateRatings = (currentDelta, desiredDelta) => {
    setCurrentRating((prev) =>
      Math.min(3000, Math.max(0, prev + currentDelta))
    );
    setDesiredRating((prev) =>
      Math.min(3000, Math.max(currentRating + 25, prev + desiredDelta))
    );
    setErrorMessage("");
  };

  const handleRatingChange = (setter, adjuster) => (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 3000) {
      setter(value);
      adjuster(value);
      setErrorMessage("");
    }
  };

  const price = calculatePrice();

  const handleSubmit = (e) => {
    if (desiredRating < 25 || calculatePrice() === "0.00") {
      e.preventDefault();
    } 
  };

  return (
    <div className={styles.body}>
      <div className={styles.calcs}>
        <div className={styles.item}>
          <Image
            src={getRatingImage(currentRating)}
            width={70}
            height={70}
            quality={100}
            alt="уровень"
          />
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button
                className={styles.subtract}
                onClick={() => updateRatings(-25, 0)}
              >
                -25
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    value={currentRating}
                    onChange={handleRatingChange(setCurrentRating, (val) =>
                      setDesiredRating(Math.max(desiredRating, val + 25))
                    )}
                  />
                  <span className={styles.span}>ELO</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() => updateRatings(25, 25)}
              >
                +25
              </button>
            </div>
          </div>
        </div>
        <div className={styles.arrow}>
          <Image
            src="/calc/straight.svg"
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
                onClick={() => updateRatings(0, -25)}
              >
                -25
              </button>
              <div className={styles.center}>
                <div className={styles.desiredTitle}>Желаемый Рейтинг</div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    value={desiredRating}
                    onChange={handleRatingChange(setDesiredRating, () => {})}
                    onBlur={handleRatingChange(setDesiredRating, () => {})}
                  />
                  <span className={styles.span}>ELO</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() => updateRatings(0, 25)}
              >
                +25
              </button>
            </div>
          </div>
          <Image
            src={getRatingImage(desiredRating)}
            width={70}
            height={70}
            quality={100}
            alt="уровень"
          />
        </div>
      </div>
      <div className={styles.switches}>
      <CalcSwitches
          options={options}
          handleOptionChange={handleOptionChange}
        />
        <div className={styles.priceColumn}>
<div className={styles.priceContent}>
            <div className={styles.priceText}>ИТОГОВАЯ ЦЕНА:</div>
            <div className={styles.price}>{calculatePrice()} ₽</div>
</div>
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
                  goal: `${desiredRating} ELO`,
                  current: `${currentRating} ELO`,
                  type: "По эло",
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

export default FiEloCalc;
