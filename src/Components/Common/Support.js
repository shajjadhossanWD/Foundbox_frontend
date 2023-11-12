import React from "react";

function Support({ paddingClass = null }) {
  return (
    <section className={"support-area " + paddingClass}>
      <div className="container">
        <div className="support-inner-box">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                  <i className="flaticon-free-shipping"></i>
                </div>

                <div className="support-content">
                  <h3>Free Shipping Worldwide</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                  <i className="flaticon-return"></i>
                </div>

                <div className="support-content">
                  <h3>30 Days Guarantee</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                  <i className="flaticon-security"></i>
                </div>

                <div className="support-content">
                  <h3>100% Blockchain Payment</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                  <i className="flaticon-support"></i>
                </div>

                <div className="support-content">
                  <h3>24/7 Customer Support</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;