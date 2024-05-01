import { Button } from "@mui/material";
import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
function AboutRestol() {
  const [countOn, setCountOn] = useState(false);
  return (
    <div className="About-Restol">
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 content-section">
            <div className="text-start-md heading">
              <h2> &nbsp;About Restoral</h2>
              <p>
                Restoral, one of today’s most renowned fast food restaurants,
                was established in 2013, as a quiet place where anyone could eat
                a burger or have a pizza that they loved. Our dedication to
                customers and quality food helps us to reach more today.
              </p>
            </div>
            <ScrollTrigger
              onEnter={() => setCountOn(true)}
              onExit={() => setCountOn(false)}
            >
              <div className="number-count">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="counter">
                      {countOn && (
                        <CountUp start={0} end={25} duration={3} delay={0} />
                      )}
                      <p>BURGER SOLD</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="counter">
                      {countOn && (
                        <CountUp start={0} end={100} duration={2} delay={0} />
                      )}
                      <p>PIZZAS MADE</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="counter">
                      {countOn && (
                        <CountUp start={0} end={60} duration={2} delay={0} />
                      )}
                      <p>CLIENTS EVERYDAY</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollTrigger>

            <div className="about-button">
              <Button
                variant="contained"
                color="success"
                className="see-our-menu"
              >
                SEE OUR MENU
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutRestol;
