import { FunctionComponent } from "react";
import styles from "./FIOGameUXUsersSignIn.module.css";

const FIOGameUXUsersSignIn: FunctionComponent = () => {
  return (
    <div className={styles.fioGameuxUsersSignIn}>
      <img
        className={styles.adobestock6152461491Icon}
        alt=""
        src="/adobestock-615246149-1@2x.png"
      />
      <div className={styles.fioGameuxUsersSignInChild} />
      <div className={styles.welcomeParent}>
        <b className={styles.welcome}>Welcome!</b>
        <div className={styles.signInTo}>Sign in to continue</div>
        <div className={styles.hyperion}>hyperion</div>
        <img className={styles.frameChild} alt="" src="/group-1@2x.png" />
        <div className={styles.signInWrapper}>
          <b className={styles.signIn}>Sign In</b>
        </div>
        <div className={styles.enterUsernameParent}>
          <i className={styles.enterUsername}>Enter username</i>
          <b className={styles.hyperion1}>@hyperion</b>
        </div>
        <div className={styles.dontHaveAnAccountParent}>
          <div className={styles.dontHaveAn}>Don’t have an account?</div>
          <div className={styles.signUpNowParent}>
            <div className={styles.signUpNow}>Sign Up Now</div>
            <img
              className={styles.openInBrowser}
              alt=""
              src="/open-in-browser.svg"
            />
          </div>
        </div>
        <img className={styles.cancelIcon} alt="" src="/cancel.svg" />
        <div className={styles.group}>
          <img className={styles.checkedIcon} alt="" src="/checked.svg" />
          <b className={styles.titleCopy3}>
            Account Created - You may sign into your account
          </b>
        </div>
      </div>
      <div className={styles.copyrightFioLabsParent}>
        <div className={styles.signUpNow}>@Copyright FIO Labs</div>
        <div className={styles.signUpNow}>Terms of Use</div>
        <div className={styles.signUpNow}>Discord</div>
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

export default FIOGameUXUsersSignIn;
