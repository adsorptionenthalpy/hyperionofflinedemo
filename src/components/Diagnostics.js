import React, { useState, useEffect, useRef } from "react";
import Checked from "../assets/images/checkgreen.png";
// import PolygonLogo from "../assets/images/checked.svg";
import EthLogo from "../assets/images/ethereum-logo.jpg";
import PolygonLogo from "../assets/images/polygon.png";
import SolanaLogo from "../assets/images/solana-logo.png";
import FioLogo from "../assets/images/fiologo-1.png";
import WaxChain from "../assets/images/wax-chain-v.png";
import styles from "./FIOGameUXUsers.module.css";
import mainImage from "../assets/images/group-1@2x.png";
import hyperionImg from "../assets/images/hyperion.svg";
import adobeImg from "../assets/images/hyperionbackground.png";
import cancelImg from "../assets/images/cancel.svg";
import fioAppImg from "../assets/images/fio-app-icon.svg";
import misc166Img from "../assets/images/1664313156278-1@2x.png";
import miscImg from "../assets/images/--1.svg";

const Diagnostics = ({ setCurrentScreen }) => {
  const [currentParagraphs, setCurrentParagraphs] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [complete, setComplete] = useState("");
  var org = localStorage.getItem("domain");

  if (!org) {org = "hyperion"}

  const user = localStorage.getItem("handle");

  const endOfLogsRef = useRef(null); // New ref for the end of logs

  const completeRegistration = () => {
    setComplete(false);
    setCurrentScreen(1);
  };

  const [data, setData] = useState({
    orgName: "",
    user: "",
  });

  useEffect(() => {
    setData({
      orgName: org?.toLowerCase(),
      user: user,
    });
  }, [org, user]);

  const paragraphs = [
    {
      text: (vars) => `Creating wallets for: ${vars.user}@${vars.orgName?.toLowerCase()}`,
      type: "heading",
      style: { fontSize: "16px" },
      children: [
        {
          text: () => "EVM:",
          style: {fontSize: "16px", fontWeight: "bold" },
          icon: EthLogo,
        },
        {
          text: () => "0x10E0271ec47d55511a047516f2a7301801d55eaB",
          style: {
            fontSize: "13px",
            marginTop: "1px",
            marginLeft: "2px",
            marginBottom: "6px",
          },
        },
        {
          text: () => "Solana:",
          style: {fontSize: "16px", fontWeight: "bold" },
          icon: SolanaLogo,
        },
        {
          text: () => "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
          style: {
            fontSize: "13px",
            marginTop: "1px",
            marginLeft: "2px",
            marginBottom: "6px",
          },
        },
        {
          text: () => "Polygon:",
          style: {fontSize: "16px", fontWeight: "bold" },
          icon: PolygonLogo,
        },
        {
          text: () => "0xF2A1246e60a57c899DCD6e5166e246bc5cd7E783",
          style: {
            fontSize: "13px",
            marginTop: "1px",
            marginLeft: "2px",
            marginBottom: "6px",
          },
        },
        {
          text: () => "Wax:",
          style: { fontSize: "16px", fontWeight: "bold" },
          icon: WaxChain,
        },
        {
          text: () => "EOS5tdA12sdlfjhKdfdE1uQbwd6B6Wt46bc5cd7E783",
          style: {
            fontSize: "13px",
            marginTop: "1px",
            marginLeft: "2px",
            marginBottom: "6px",
          },
        },
        {
          text: () => "Fio:",
          style: {fontSize: "16px", fontWeight: "bold" },
          icon: FioLogo,
        },
        {
          text: () => "FIO8ktpWmH8m4cFRmfU9LapzPih5sQ5JkwXzwXfNB",
          style: {
            fontSize: "13px",
            marginTop: "1px",
            marginLeft: "2px",
            marginBottom: "6px",
          },
        },
      ],
    },
    {
      text: (vars) => `Registering handle: ${vars.user}@${vars.orgName?.toLowerCase()}`,
      type: "heading",
      style: {fontSize: "16px", marginBottom: "12px" },
    },
  ];

  const getCurrentText = () => {
    const parentParagraph = paragraphs[currentParagraphIndex];
    if (!parentParagraph) return "";

    const parentText = parentParagraph?.text(data);
    if (currentCharIndex < parentText?.length) {
      return parentText[currentCharIndex];
    }

    let totalChars = parentText?.length;
    for (let i = 0; i < parentParagraph?.children?.length; i++) {
      const child = parentParagraph?.children[i];
      if (currentCharIndex < totalChars + child?.text(data)?.length) {
        return child?.text(data)[currentCharIndex - totalChars];
      }
      totalChars += child?.text(data)?.length;
    }
    setComplete(true);
    return "";
  };

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    const currentTextChar = getCurrentText();
    if (currentParagraphIndex < paragraphs?.length && currentTextChar) {
      setTimeout(() => {
        const updatedParagraphs = [...currentParagraphs];
        const parentParagraph = paragraphs[currentParagraphIndex];
        const parentText = parentParagraph?.text(data);

        if (currentCharIndex < parentText?.length) {
          // Append character to parent
          if (updatedParagraphs[currentParagraphIndex]) {
            updatedParagraphs[currentParagraphIndex].text += currentTextChar;
          } else {
            updatedParagraphs.push({
              ...parentParagraph,
              text: currentTextChar,
              children: [],
            });
          }
        } else {
          // Append character to one of the children
          let totalChars = parentText?.length;
          for (let i = 0; i < parentParagraph?.children?.length; i++) {
            const child = parentParagraph?.children?.[i];
            if (currentCharIndex < totalChars + child?.text(data).length) {
              if (!updatedParagraphs[currentParagraphIndex]?.children[i]) {
                updatedParagraphs[currentParagraphIndex].children[i] = {
                  ...child,
                  text: currentTextChar,
                };
              } else {
                updatedParagraphs[currentParagraphIndex].children[i].text +=
                  currentTextChar;
              }
              break;
            }
            totalChars += child?.text(data)?.length;
          }
        }

        setCurrentParagraphs(updatedParagraphs);
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50);
    } else {
      setCurrentCharIndex(0);
      setCurrentParagraphIndex(currentParagraphIndex + 1);
    }
    if (endOfLogsRef.current && !isInViewport(endOfLogsRef.current)) {
      endOfLogsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    currentCharIndex,
    currentParagraphIndex,
    paragraphs,
    currentParagraphs,
    data,
  ]);

  const getStyle = (paragraph) => {
    switch (paragraph.type) {
      case "heading":
        return {
          fontSize: "0.10em",
          fontWeight: "bold",
          ...paragraph.style,
          marginTop: 10,
        };
      default:
        return paragraph.style;
    }
  };

  const getLoaderOrCheckedIcon = (paragraph, index) => {
    if (paragraph.type === "heading") {
      return index === currentParagraphIndex ? (
        <span
          style={{
            ...getStyle(paragraph),
            marginTop: getStyle(paragraph)?.marginTop + 2,
          }}
        >
          <span className="loader"></span>
        </span>
      ) : index < currentParagraphIndex ? (
        <span
          style={{
            ...getStyle(paragraph),
            marginTop: getStyle(paragraph)?.marginTop + 2,
          }}
        >
          <img
            src={Checked}
            alt="Checked icon"
            className="!w-4 !h-4"
            style={{ maxWidth: "none" }}
          />
        </span>
      ) : null;
    } else {
      return <div className="w-[34px]"></div>;
    }
  };

  return (
    <div className={styles.fioGameuxUsers}>
    <div className={styles.background}>
      <img
        className={styles.hyperionbackground}
        alt=""
        src={adobeImg}
      />
      <div className={styles.backgroundChild} />
    </div>
    <div className={styles.mainContentBlock}>
      <div className={styles.enterDomain}>
        Registration mode
      </div>
      <img className={styles.hyperionIcon} alt="" src={hyperionImg} />
      <img className={styles.mainContentImage} alt="" src={mainImage} />
      { complete && (
      <div className={styles.continue}>
          <button
            onClick={completeRegistration}
            className={styles.submit}
          >
          Continue
        </button>
      </div> )}

      <div className={styles.dataBlock}>
        <div className="px-2">
          {currentParagraphs.map((paragraph, index) => (
            <div key={index}>
              <div className="flex space-x-2">
                {getLoaderOrCheckedIcon(paragraph, index)}
                <span style={getStyle(paragraph)}>{paragraph?.text}</span>
              </div>
              {paragraph?.children?.map((child, childIndex) => (
                <div key={childIndex} className="flex space-x-1">
                  {getLoaderOrCheckedIcon(child, childIndex)}
                  {child?.icon ? (
                    <img
                      src={child?.icon}
                      className="w-4 h-4 mt-1"
                    />
                  ) : null}
                  <span
                    className="w-[250px] inline-block break-words sm:w-full"
                    style={getStyle(child)}
                  >
                    {child?.text?.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <div ref={endOfLogsRef}></div>
        </div>
      </div>
      <img className={styles.cancelIcon} alt="" src={cancelImg} />
    </div>


    <div className={styles.copyrightFioLabsParent}>
      <div className={styles.fiolabsinfo}>@2023 FIO Labs</div>
      <div className={styles.fiolabsinfo}>Terms of Use</div>
      <div className={styles.fiolabsinfo}>Discord</div>
    </div>
    <div className={styles.poweredBy}>Powered by</div>
    <b className={styles.x}>X</b>
    <img className={styles.fioAppIcon} alt="" src={fioAppImg} />
    <div className={styles.metakeepAppIcon}>
      <img className={styles.icon} alt="" src={misc166Img}/>
    </div>
    <div className={styles.fioLabs}>
      <img className={styles.icon1} alt="" src={miscImg}/>
    </div>
  </div>
  );
}

export default Diagnostics;
