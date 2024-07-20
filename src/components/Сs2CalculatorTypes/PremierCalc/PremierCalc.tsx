"use client";

import React, { useState } from "react";
import styles from "../../Calculator/calculator.module.scss";
import Image from "next/image";
import Link from "next/link";
import CalcSwitches from "@/components/CalcSwitches/CalcSwitches";

const PremierCalc = () => {
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

  const calculatePrice = () => {
    let price = basePrice;
    const eloDifference = Math.max(0, desiredRating - currentRating);
    const ratingRanges = [
      { max: 10000, price: 0.55 },
      { max: 15000, price: 0.78 },
      { max: 25000, price: 1.1 },
      { max: 35000, price: 2.3 },
    ];

    if (eloDifference > 0) {
      let remainingDifference = eloDifference;
      let currentThreshold = currentRating;

      ratingRanges.forEach((range) => {
        const rangeMax = Math.min(range.max, desiredRating);
        if (currentThreshold < rangeMax) {
          const rangeDifference = rangeMax - currentThreshold;
          price += rangeDifference * range.price;
          currentThreshold = rangeMax;
          remainingDifference -= rangeDifference;
        }
        if (remainingDifference <= 0) return;
      });
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
      Math.min(30000, Math.max(0, prev + currentDelta))
    );
    setDesiredRating((prev) =>
      Math.min(35000, Math.max(currentRating + 200, prev + desiredDelta))
    );
    setErrorMessage("");
  };

  const handleRatingChange = (setter, adjuster) => (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 30000) {
      setter(value);
      adjuster(value);
      setErrorMessage("");
    }
  };

  const price = calculatePrice();
  const numericPrice = parseFloat(price);

  return (
    <div className={styles.body}>
      <div className={styles.calcs}>
        <div className={styles.item}>
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button
                className={styles.subtract}
                onClick={() => updateRatings(-200, 0)}
              >
                -200
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    value={currentRating}
                    onChange={handleRatingChange(setCurrentRating, (val) =>
                      setDesiredRating(Math.max(desiredRating, val + 200))
                    )}
                  />
                  <span className={styles.span}>ELO</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() => updateRatings(200, 200)}
              >
                +200
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
        <div className={styles.itemPremier}>
          <div className={styles.desiredRating}>
            <div className={styles.desiredCalc}>
              <button
                className={styles.subtract}
                onClick={() => updateRatings(0, -200)}
              >
                -200
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
                onClick={() => updateRatings(0, 200)}
              >
                +200
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
          <div className={styles.priceContent}>
            <div className={styles.priceText}>ИТОГОВАЯ ЦЕНА:</div>
            <div className={styles.price}>{price} ₽</div>
          </div>
          <div className={styles.submit}>
            {numericPrice > 0 ? (
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
                    goal: `${desiredRating} ELO`,
                    current: `${currentRating} ELO`,
                    type: "Прьемьер",
                    price: price,
                  },
                }}
              >
                ЗАКАЗАТЬ БУСТ
              </Link>
            ) : (
              <button className={styles.disabledButton} disabled>
                ЗАКАЗАТЬ БУСТ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremierCalc;
