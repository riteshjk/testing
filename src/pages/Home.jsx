import React from "react";
import bg_2 from "../../public/images/bg_2.png";

const Home = () => {
  return (
    <div className="py-24"> {/* Adjust the padding here */}
       <section className="flex flex-col justify-center items-center text-center w-full max-w-6xl mx-auto px-5">
        <div className="mt-20">
          <div
            style={{ color: "#D3674A", fontFamily: "Nunito" }}
            className="text-3xl md:text-6xl font-extrabold not-italic leading-normal"
          >
            <p>Join Our Free Group</p>
            <p className=" md:mt-8">Therapy Sessions Today!</p>
          </div>
          <div>
            <div className="mt-8 text-lg font-light md:text-xl">
              <p style={{ color: "#463426", fontFamily: "Nunito" }}>
                It may seem far, but there is light at the end of the tunnel.
              </p>
              <p
                style={{
                  color: "#463426",
                  fontFamily: "Nunito",
                  marginTop: "0.5rem",
                }}
              >
                Hold our hand and let's go through it together.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-16">
              <button
                className="text-white md:w-1/2 font-bold cursor-pointer py-3 px-10 rounded bg-[#D3674A] md:w-1/2"
                onClick={() =>
                  (window.location.href = "https://bit.ly/4bd4Mlx")
                }
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex-col gap-x-32 justify-evenly mt-20 md:flex justify-center items-center text-center mt-20 w-full max-w-6xl mx-auto px-5 md:flex-row ">
          <div className="p-5">
            <img src={bg_2} alt="" />
          </div>
          <div className="text-left">
            <h2
              className="text-3xl md:text-5xl font-extrabold mt-6"
              style={{ color: "#D3674A", fontFamily: "Nunito" }}
            >
              What is
            </h2>
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-8"
              style={{ color: "#D3674A", fontFamily: "Nunito" }}
            >
              Therapy Buddy?
            </h2>
            <p
              className="text-lg md:text-xl font-light mb-8"
              style={{ color: "#463426", fontFamily: "Nunito" }}
            >
              Therapy Buddy is an end-to-end tool for psychotherapists to get
              discovered by clients and manage their practice efficiently.
            </p>
            <p
              className="text-lg md:text-xl font-light mb-8"
              style={{ color: "#463426", fontFamily: "Nunito" }}
            >
              Here's what we have recognized for early-career therapists,
              specifically:
            </p>
            <ul
              className="list-disc pl-5 text-lg font-bold md:text-xl font-light mb-8"
              style={{ color: "#463426", fontFamily: "Nunito" }}
            >
              <li>Difficulty in finding supervisors</li>
              <li>Difficulty in finding clients</li>
              <li>High commission rates of 3rd party platforms</li>
            </ul>

            <p
              className="text-lg md:text-xl font-light mb-8"
              style={{ color: "#463426", fontFamily: "Nunito" }}
            >
              1st Phase Development will end by mid-July and we don't plan to
              charge commissions ever.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center text-center w-full max-w-6xl mx-auto px-5">
        <div className="mt-20"></div>
      </section>

    </div>
  );
};

export default Home;
