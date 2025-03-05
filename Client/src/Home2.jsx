import CountUp from 'react-countup';
import medicine from './assets/medicine-3493701_1280.jpg';
import donor from './assets/earth-4861456_1280.jpg';
const Home2 = () => {
    return (
        <div className="bg1">
            <nav className="navbar navbar-expand-md navbar-Light " aria-label="Fourth navbar example">
                <div className="container-fluid">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a
                        href="/"
                        className="d-inline-flex link-body-emphasis text-decoration-none"
                    >
                        <svg
                        className="bi mx-3 me-2 "
                        width="40"
                        height="32"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                        <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                        </svg>
                        <span className="  fs-4">PlasmaCare</span>
                    </a>
                    </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item me-3">
                        <a className="nav-link link-dark " aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item me-3">
                        <a className="nav-link link-dark " href="#Donate">Donate</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-dark" href="#">Donation Center</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-dark" href="#">Events</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link-dark" href="/ContactUs">ContactUs</a>
                    </li>
                    </ul>
                    <form className="col-md-3  text-end">
                        <a  href="/Login" className="btn btn-primary btn-sm px-4 login  w-30 h-30 me-md-2   fw-bold" >Account</a>
                    </form>
                </div>
                </div>
            </nav>
            <div className=" text-center  pt-5  pb-5" >
              <div className="container">
                <h1 className="display-4 fw-normal">Save Lives, Donate Blood</h1>
                <p className="lead ">Your donation can save up to three lives. Be a hero, donate today!</p>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <img src={medicine} alt="Blood Donation" className="img-fluid rounded" />
                  </div>
                  <div className="col-md-6 mt-3">
                    <img src={donor} alt="Plasma Donation" className="img-fluid rounded" />
                  </div>
                </div>
              </div>
            </div>
            <section className="pt-5 pb-5" id="count-stats">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10 border-radius-xl mt-n10 mx-auto py-5 blur shadow-blur bg-light">
                    <div className="row text-center g-4">
                      <div className="col-md-4">
                        <div className="p-4 border rounded bg-white h-100 d-flex flex-column align-items-center justify-content-center">
                          <h1 className="text-gradient text-primary mb-3">
                            <CountUp end={500} duration={4} />+
                          </h1>
                          <h5 className="mt-2">Blood Donations</h5>
                          <p className="text-sm">Helping patients in critical need</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-4 border rounded bg-white h-100 d-flex flex-column align-items-center justify-content-center">
                          <h1 className="text-gradient text-primary mb-3">
                            <CountUp end={300} duration={4} />+
                          </h1>
                          <h5 className="mt-2">Plasma Donations</h5>
                          <p className="text-sm">Supporting treatment for various conditions</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-4 border rounded bg-white h-100 d-flex flex-column align-items-center justify-content-center">
                          <h1 className="text-gradient text-primary mb-3">
                            <CountUp end={100} duration={5} />+
                          </h1>
                          <h5 className="mt-2">Donors</h5>
                          <p className="text-sm">Join our community of life-savers and donate blood</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section >
            <div className="container pb-5  mt-5">
            <h1 className="text-center mb-4" id="Donate">Donate Blood & Plasma</h1>

            <div className="card mb-4">
                <div className="card-header bg-danger text-white">
                Eligibility Criteria
                </div>
                <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">Age: 18-65 years old</li>
                    <li className="list-group-item">Weight: At least 50 kg (110 lbs)</li>
                    <li className="list-group-item">In good health and feeling well</li>
                    <li className="list-group-item">No recent tattoos or piercings</li>
                    <li className="list-group-item">No recent travel to malaria-endemic areas</li>
                    <li className="list-group-item">Not pregnant or breastfeeding</li>
                </ul>
                </div>
            </div>

            <div className="card mb-4 ">
                <div className="card-header bg-warning text-dark">
                Donation Process
                </div>
                <div className="card-body">
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item">Registration and health history questionnaire</li>
                    <li className="list-group-item">Mini-physical check-up</li>
                    <li className="list-group-item">Blood or plasma donation (10-15 minutes for blood, up to 2 hours for plasma)</li>
                    <li className="list-group-item">Rest and refreshment</li>
                    <li className="list-group-item">Receive your donor card</li>
                </ol>
                </div>
            </div>

            <div className="card ">
                <div className="card-header bg-info text-white">
                What to Expect
                </div>
                <div className="card-body">
                <p className="card-text">
                    Donating blood or plasma is a safe and simple process. You may feel a slight pinch when the needle is inserted, but the discomfort is minimal and brief. After donating, its important to rest for a few minutes and enjoy some refreshments. Drink plenty of fluids and avoid strenuous activities for the rest of the day.
                </p>
                <p className="card-text">
                    Your donation can save lives. Thank you for your generosity!
                </p>
                </div>
            </div>
            </div>
            <div className="container pb-5">
              <footer className="pt-5">
                <div className="row" >
                  <div className="col-6 col-md-2 ">
                  <div className="col-md-3 mb-2 pl-3  mb-md-0">
                      <a
                        href="/"
                        className="d-inline-flex link-body-emphasis text-decoration-none"
                      >
                        <svg
                          className="bi mx-3 me-2 "
                          width="40"
                          height="32"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5" />
                          <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z" />
                        </svg>
                        <span className="  fs-4">PC</span>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 col-md-2  ">
                    <h5>Company</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item  mb-2"><a href="#" className="nav-link  p-0 text-body-secondary">Home</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About Us</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Our Services</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Contact US</a></li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-2 ">
                    <h5>Want to donate</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Donor Login</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About Blood Donation</a></li>
                      <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                    </ul>
                  </div>

                  <div className="col-md-5 offset-md-1 ">
                    <form>
                      <h6>E-mail : plasmadonor@gmail.com</h6>
                      <div className="d-flex flex-column flex-sm-row w-50 gap-2">
                        <label htmlFor="newsletter1" className="visually-hidden ">Message</label>
                        <input id="newsletter1" type="text" className="form-control" placeholder="Message" />
                        <button className="btn btn-primary " type="button" >Send</button>
                      </div>
                    </form>
                  </div>
                </div>
              </footer>
            </div>
        </div>
    )
}

export default Home2