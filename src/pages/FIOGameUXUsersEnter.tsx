import { FunctionComponent } from "react";
import styles from "./FIOGameUXUsersEnter.module.css";

const FIOGameUXUsersEnter: FunctionComponent = () => {
  return (
    <div className={styles.fioGameuxUsersEnter}>
      <img
        className={styles.adobestock6152461491Icon}
        alt=""
        src="/adobestock-615246149-1@2x.png"
      />
      <div className={styles.fioGameuxUsersEnterChild} />
      <div className={styles.welcomeParent}>
        <b className={styles.welcome}>Welcome!</b>
        <div className={styles.creatingYourAccount}>
          Creating your account now.
        </div>
        <div className={styles.hyperion}>hyperion</div>
        <img className={styles.frameChild} alt="" src="/group-1@2x.png" />
        <div className={styles.groupParent}>
          <div className={styles.byContinuingYouAreAcknowlWrapper}>
            <div className={styles.byContinuingYouContainer}>
              <p className={styles.byContinuingYou}>
                By continuing, you are acknowledging and accepting our
              </p>
              <p className={styles.termsOfUseAndPrivacyPolic}>
                <span className={styles.termsOfUse}>Terms of Use</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.and}>and</span>
                <span className={styles.span}>{` `}</span>
                <span>Privacy Policy</span>
              </p>
            </div>
          </div>
          <img className={styles.checkmarkIcon} alt="" src="/checkmark.svg" />
        </div>
        <div className={styles.mainCtaGreen}>
          <b className={styles.submit}>Submit</b>
        </div>
        <div className={styles.userxmyemailaddressWrapper}>
          <div className={styles.userxmyemailaddress}>userX@myemailaddress</div>
        </div>
        <div className={styles.alreadyHaveAnAccountParent}>
          <div className={styles.alreadyHaveAn}>Already have an account?</div>
          <div className={styles.signInNowParent}>
            <div className={styles.signInNow}>Sign In Now</div>
            <img
              className={styles.openInBrowser}
              alt=""
              src="/open-in-browser.svg"
            />
          </div>
        </div>
        <img className={styles.cancelIcon} alt="" src="/cancel.svg" />
      </div>
      <div className={styles.copyrightFioLabsParent}>
        <div className={styles.signInNow}>@Copyright FIO Labs</div>
        <div className={styles.signInNow}>Terms of Use</div>
        <div className={styles.signInNow}>Discord</div>
      </div>
      <div className={styles.poweredBy}>Powered by</div>
      <b className={styles.x}>X</b>
      <img className={styles.fioAppIcon} alt="" src="/fio-app-icon.svg" />
      <div className={styles.fioAppIcon1}>
        <img className={styles.icon} alt="" src="/1664313156278-1@2x.png" />
      </div>
      <div className={styles.parent}>
        <img className={styles.icon1} alt="" src="/--1.svg" />
        <b className={styles.fiolabs}>FIOLABS</b>
      </div>
    </div>
  );
};

export default FIOGameUXUsersEnter;
