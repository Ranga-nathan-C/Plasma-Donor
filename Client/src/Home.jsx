import plasma from "./assets/plasma.jpg";
import blood from "./assets/blood-5053769_1280.jpg";
export default function Home() {
  return (
    <div className="container-fulid bg1">
      <nav
        className="navbar navbar-expand-md navbar-Light bg-Light"
        aria-label="Fourth navbar example"
      >
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item me-3">
                <a
                  className="nav-link nav1  link-light "
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link link-dark " href="#AboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-dark" href="#FAQ">
                  FAQ
                </a>
              </li>
            </ul>
            <form className="col-md-3   text-end">
              <a
                href="/Login"
                className="btn btn-primary btn-sm px-4 login  w-30 h-30 me-md-2   fw-bold"
              >
                Login
              </a>
              <a
                href="/Register"
                className="btn btn-primary btn-sm px-4  w-30 h-30 me-md-2  fw-bold"
              >
                Sign up
              </a>
            </form>
          </div>
        </div>
      </nav>
      <div className="container --bs-light my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 ">
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
              Donate plasma & Save Life
            </h1>
            <p className="lead">
              Donating plasma is a safe and easy process. Our team of
              experienced medical professionals will guide you through every
              step of the donation process, ensuring your safety and comfort.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button
                type="button"
                className="btn btn-primary btn-md px-4 me-md-2 fw-bold"
              >
                Donate
              </button>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img
              className="rounded"
              src={plasma}
              alt=""
              width="720"
              height="450"
            />
          </div>
        </div>
      </div>
      <div className="container px-4 py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom">Eligibility of Plasma Donor</h2>
        <h6>YOU CAN DONATE PLASMA IF</h6>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4.75em"
              height="1.75em"
              fill="currentColor"
              className="bi bi-universal-access-circle px-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z" />
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8" />
            </svg>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Age</h3>
              <p>Your Age is between 18-65 years.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4.75em"
              height="1.75em"
              className="bi bi-universal-access-circle px-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" />
            </svg>{" "}
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Weight</h3>
              <p>Your Weight is 50kgs(110lbs) or above.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4.75em"
              height="1.75em"
              className="bi bi-droplet-half px-2"
              viewBox="0 0 16 16"
            >
              <path d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
              <path d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z" />
            </svg>{" "}
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                Last Donation
              </h3>
              <p>
                28 days(4 weeks) from last platelet donation or whole blood
                donation
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4.75em"
              height="1.75em"
              fill="currentColor"
              className="bi bi-arrow-down-up px-2"
              viewBox="0 0 16 16"
            >
              <path d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
            </svg>{" "}
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                Iron level
              </h3>
              <p>
                Male Iron Level {">"} 13.0 g/dl and Female Iron Level {">"} 12.5
                g/dl{" "}
              </p>
            </div>
          </div>
        </div>
        <h6>YOU CANNOT DONATE PLASMA IF</h6>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4.75em"
              height="1.75em"
              fill="currentColor"
              className="bi bi-gender-female px-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5" />
            </svg>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Women</h3>
              <p>You have ever been pregnant</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6.75em"
              height="1.75em"
              fill="currentColor"
              className="bi bi-lungs px-2"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79 1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357z" />
            </svg>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Health</h3>
              <p>
                You have uncontrolled diabetes or hypertension with change in
                medication in last 28 days
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="40"
              fill="currentColor"
              className="bi bi-person-wheelchair px-2"
              viewBox="0 0 16 16"
            >
              <path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.663 2.146a1.5 1.5 0 0 0-.47-2.115l-2.5-1.508a1.5 1.5 0 0 0-1.676.086l-2.329 1.75a.866.866 0 0 0 1.051 1.375L7.361 3.37l.922.71-2.038 2.445A4.73 4.73 0 0 0 2.628 7.67l1.064 1.065a3.25 3.25 0 0 1 4.574 4.574l1.064 1.063a4.73 4.73 0 0 0 1.09-3.998l1.043-.292-.187 2.991a.872.872 0 1 0 1.741.098l.206-4.121A1 1 0 0 0 12.224 8h-2.79zM3.023 9.48a3.25 3.25 0 0 0 4.496 4.496l1.077 1.077a4.75 4.75 0 0 1-6.65-6.65z" />
            </svg>{" "}
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Cancer</h3>
              <p>You are a cancer survivor</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="40"
              fill="currentColor"
              className="bi bi-activity px-2"
              viewBox="0 0 16 16"
            >
              <path d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2" />
            </svg>
            <div>
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">Disease</h3>
              <p>You have Chronic kidney/heart/lung/liver disease. </p>
            </div>
          </div>

          <div className="accordion w-100 mt-5" id="accordionExample">
            <div>
              <div className="container my-5 pb-5">
                <h3 className="text-center fs-2 fw-semibold" id="AboutUs">
                  AboutUs
                </h3>
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3">
                  <div className="col-lg-4 rounded  offset-lg-1 p-0 overflow-hidden shadow-lg">
                    <img
                      className="rounded-lg-3 w-100 h-100"
                      src={blood}
                      alt=""
                      width="720"
                    />
                  </div>
                  <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h4 className="display-8 fw-normal ">Donate & Save Life</h4>
                    <p className="justify-content">
                      At PlasmaCare, we are dedicated to saving lives by
                      connecting generous donors with those in need of blood and
                      plasma. Our mission is to make the donation process
                      seamless and rewarding, ensuring that every contribution
                      makes a significant impact. Join us in our life-saving
                      journey and be a hero today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mt-5 mb-4" id="FAQ">
              Frequently Asked Questions{" "}
            </h3>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Q: How often can I donate plasma?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    A: Plasma donors can donate up to two times within a
                    seven-day period, with at least 48 hours between donations
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Q: What are the requirements to donate plasma?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    A: Donors must be at least 18 years old, weigh more than 110
                    pounds, and be in good health. They also need to pass a
                    health screening and provide proof of identity and address
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Q: Can I donate plasma if I have recovered from COVID-19?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    A: Yes, individuals who have fully recovered from COVID-19
                    can donate plasma again to help those who are ill. Donors
                    must be symptom-free for 28 days before donating{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Q: What are the side effects of plasma donation?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    A: Plasma donation can have minor side effects such as
                    feeling faint or dizzy, bleeding, bruising, or inflammation
                    around the donation site. In rare cases, an embolism can
                    occur. These side effects are usually mild and temporary{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Q: What happens during the plasma donation process?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    A: Plasma donation involves a process called plasmapheresis,
                    where blood is collected, plasma is separated from blood
                    cells, and the remaining blood components are returned to
                    the donors body. The first donation takes about two hours
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <footer className="pt-5">
                <div className="row">
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
                      <li className="nav-item  mb-2">
                        <a
                          href="#"
                          className="nav-link  p-0 text-body-secondary"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          About Us
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          Our Services
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          FAQs
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          Contact US
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-2 ">
                    <h5>Want to donate</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          Donor Login
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          About Blood Donation
                        </a>
                      </li>
                      <li className="nav-item mb-2">
                        <a
                          href="#"
                          className="nav-link p-0 text-body-secondary"
                        >
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-5 offset-md-1 ">
                    <form>
                      <h5>Contact Us: 123456789</h5>
                      <h6>E-mail : plasmadonor@gmail.com</h6>
                      <div className="d-flex flex-column flex-sm-row w-50 gap-2">
                        <label
                          htmlFor="newsletter1"
                          className="visually-hidden "
                        >
                          Message
                        </label>
                        <input
                          id="newsletter1"
                          type="text"
                          className="form-control"
                          placeholder="Message"
                        />
                        <button className="btn btn-primary " type="button">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
