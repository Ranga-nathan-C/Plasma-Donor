import "./App.css";

const Signup = () => {
    return(
        <div className="modal modal-sheet back position-static d-block  p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                
                <div className="modal-content rounded-4 shadow">
                    
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    
                    <h1 className="fw-bold mb-0 fs-2">Sign up </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>

                <div className="modal-body p-5 pt-0">
                    <form className="">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Confirm Password" />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <div className="form-check text-start my-3 ">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                        </label>
                </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" >Sign up</button>
                    </form>
                </div>
                </div>
            </div>
</div>

    )
};
export default Signup;