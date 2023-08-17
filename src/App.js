import React, { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { ClipLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const handleVerification = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="head">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="heading">👍🏻Login Success..</h2>
        ) : (
          <div className="write_program">
            <h1 className="heading">
              OTP
              <br /> GENERATOR
            </h1>
            {showOTP ? (
              <>
                <div className="lock">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="enter_otp">
                  ENTER YOUR OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={loading}
                  autoFocus
                  className="otp-container"
                />
                <button
                  className="verify-otp"
                  onClick={onOTPVerify}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="lock">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="enter_otp">
                  Verify Phone Number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />

                <button
                  className="verify-otp"
                  onClick={onSignup}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                  ) : (
                    "Send Code via SMS.."
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
