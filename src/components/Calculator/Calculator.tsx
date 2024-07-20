import React, { useState, ChangeEvent } from "react";
import styles from "./calculator.module.scss";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import Link from "next/link";

type CalculatorProps = {
  type: string;
  inputValue: number | null;
  count: number | null;
  elo: string | string[];
  currentRating: number | null;
  desiredRating: string;
  images?: string[];
};

const Calculator: React.FC<CalculatorProps> = ({
  type,
  inputValue,
  count,
  elo,
  currentRating,
  desiredRating,
  images,
}) => {
  const [currentElo, setCurrentElo] = useState<number>(currentRating || 0);
  const [desiredElo, setDesiredElo] = useState<number>(currentRating || 0);
  const [options, setOptions] = useState({
    noAccountTransfer: false,
    solo: false,
    steamOffline: false,
    priority: false,
    express: false,
    stream: false,
  });
  const [currentEloIndex, setCurrentEloIndex] = useState<number>(0);
  const [desiredEloIndex, setDesiredEloIndex] = useState<number>(0);
  const [premierCalibrationCount, setPremierCalibrationCount] =
    useState<number>(0);

  const basePrice = 0;

  const calculatePrice = () => {
    let price = basePrice;
    if (options.priority) price += 200;
    if (options.express) price += 300;
    if (options.stream) price += 100;
    if (type === "premier")
      price += (Math.max(0, desiredElo - currentElo) / 200) * 500;
    if (type === "premier_calibration") price += premierCalibrationCount * 500;
    return price;
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleEloChange = (
    e: ChangeEvent<HTMLInputElement>,
    setElo: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setElo(value);
      if (type === "premier") {
        setDesiredElo(value);
      }
    }
  };

  const incrementElo = (increment: number) => {
    setCurrentElo((prevElo) => {
      const newElo = Math.max(prevElo + increment, 0);
      if (type === "premier") {
        setDesiredElo(newElo);
      }
      return newElo;
    });
  };

  const incrementDesiredElo = (increment: number) => {
    setDesiredElo((prevElo) => Math.max(prevElo + increment, currentElo));
  };

  const incrementPremierCalibrationCount = (increment: number) => {
    setPremierCalibrationCount((prevCount) =>
      Math.max(prevCount + increment, 0)
    );
  };

  const incrementEloIndex = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    index: number
  ) => {
    if (Array.isArray(elo)) {
      setIndex((prevIndex) => (prevIndex + 1) % elo.length);
    }
  };

  const decrementEloIndex = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    index: number
  ) => {
    if (Array.isArray(elo)) {
      setIndex((prevIndex) => (prevIndex - 1 + elo.length) % elo.length);
    }
  };

  const currentEloDisplay = Array.isArray(elo) ? elo[currentEloIndex] : elo;
  const currentImage =
    Array.isArray(images) && images.length > 0 ? images[currentEloIndex] : null;

  const desiredEloDisplay = Array.isArray(elo) ? elo[desiredEloIndex] : elo;
  const desiredImage =
    Array.isArray(images) && images.length > 0 ? images[desiredEloIndex] : null;

  return (
    <div className={styles.body}>
      <div className={styles.calcs}>
        <div className={styles.item}>
          {currentImage && (
            <Image src={currentImage} width={32} height={100} alt="звания" />
          )}
          <div className={styles.currentRating}>
            <div className={styles.currentCalc}>
              <button
                className={styles.subtract}
                onClick={() =>
                  type === "premier"
                    ? incrementElo(-200)
                    : decrementEloIndex(setCurrentEloIndex, currentEloIndex)
                }
              >
                -{count}
              </button>
              <div className={styles.center}>
                <div className={styles.currentTitle}>ТЕКУЩИЙ РЕЙТИНГ</div>
                <div className={styles.inputWrapper}>
                  {type !== "premier_calibration" && inputValue !== null && (
                    <input
                      className={styles.input}
                      value={currentElo}
                      onChange={(e) => handleEloChange(e, setCurrentElo)}
                    />
                  )}
                  <span className={styles.span}>{currentEloDisplay}</span>
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() =>
                  type === "premier"
                    ? incrementElo(200)
                    : incrementEloIndex(setCurrentEloIndex, currentEloIndex)
                }
              >
                +{count}
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
                onClick={() =>
                  type === "premier_calibration"
                    ? incrementPremierCalibrationCount(-1)
                    : incrementDesiredElo(-200)
                }
              >
                -{count}
              </button>
              <div className={styles.center}>
                <div className={styles.desiredTitle}>{desiredRating}</div>
                <div className={styles.inputWrapper}>
                  {type === "premier_calibration" ? (
                    <span className={styles.span}>
                      {premierCalibrationCount}
                    </span>
                  ) : (
                    <>
                      {inputValue !== null && (
                        <input
                          className={styles.input}
                          value={desiredElo}
                          onChange={(e) => handleEloChange(e, setDesiredElo)}
                        />
                      )}
                      <span className={styles.span}>{desiredEloDisplay}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                className={styles.add}
                onClick={() =>
                  type === "premier_calibration"
                    ? incrementPremierCalibrationCount(1)
                    : incrementDesiredElo(200)
                }
              >
                +{count}
              </button>
            </div>
          </div>
          {type !== "premier_calibration" && desiredImage && (
            <Image src={desiredImage} width={32} height={100} alt="звания" />
          )}
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
            <Link href="/checkout">ЗАКАЗАТЬ БУСТ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
