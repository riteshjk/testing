import React from "react";
import websiteLogo from "../../public/images/new_webiste_logo.png";
import instaLogo from "../../public/images/insta_logo.svg";
import twitterLogo from "../../public/images/twitter_logo.svg";
import linkdinLogo from "../../public/images/linkdin_logo.svg";

const Footer = () => {
  return (
    <div>
      <footer
        className="mt-10 md:text-black h-auto flex flex-col justify-center text-center items-center px-5  bottom-0 w-full"
        style={{ backgroundColor: "#E1D3B8", textAlign: "center" }}
      >
        <img className="w-20 mt-4" src={websiteLogo} alt="Buddy Up Logo" />
        <p className="text-lg font-bold mt-4" style={{ color: "#D3674A" }}>
          Empowering Mental Health Practitioners!
        </p>
        <div>
          <div className="flex gap-6 justify-center mt-2">
            <img
              className="cursor-pointer w-4 h-4"
              src={instaLogo}
              alt="instagram"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/therapybuddyio/",
                  "_blank"
                )
              }
            />
            <img
              className="cursor-pointer w-4 h-4"
              src={twitterLogo}
              alt="twitter"
              onClick={() =>
                window.open("https://x.com/TherapyBuddyIO", "_blank")
              }
            />
            <img
              className="cursor-pointer w-4 h-4"
              src={linkdinLogo}
              alt="linkdin"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/103322295/admin/feed/posts/",
                  "_blank"
                )
              }
            />
          </div>
          <p
            className="text-lg mt-4 font-semibold"
            style={{ color: "#D3674A" }}
          >
            +91-70057-06432
          </p>
          <p className="text-lg  font-semibold" style={{ color: "#D3674A" }}>
            support@therapybuddy.io
          </p>
        </div>
        <div
          className="text-lg mt-4 font-semibold"
          style={{ color: "#D3674A" }}
        >
          <p>Mohali, Punjab, India, 140308</p>
          <p>© 2024 by Therapy Buddy. All rights reserved.</p>
        </div>
        <div
          className="text-lg mt-4 font-semibold flex justify-center flex-wrap gap-2"
          style={{ color: "#D3674A" }}
        >
          <p
            onClick={() =>
              window.open("https://www.utopicplanet.org/terms", "_blank")
            }
            className="cursor-pointer"
            style={{ color: "#D3674A" }}
          >
            Terms Of Use&nbsp;
          </p>
          <p
            onClick={() =>
              window.open("https://www.utopicplanet.org/privacy", "_blank")
            }
            className="cursor-pointer"
            style={{ color: "#D3674A" }}
          >
            | Privacy Policy&nbsp;
          </p>
          <p
            onClick={() =>
              window.open("https://www.utopicplanet.org/cancellation", "_blank")
            }
            className="cursor-pointer"
            style={{ color: "#D3674A" }}
          >
            | Cancellation Policy&nbsp;
          </p>
          <p
            onClick={() =>
              window.open("https://www.utopicplanet.org/refunds", "_blank")
            }
            className="cursor-pointer"
            style={{ color: "#D3674A" }}
          >
            | Refunds Policy&nbsp;
          </p>
          <p
            onClick={() =>
              window.open("https://www.utopicplanet.org/offers", "_blank")
            }
            className="cursor-pointer"
            style={{ color: "#D3674A" }}
          >
            | Offers Policy{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
