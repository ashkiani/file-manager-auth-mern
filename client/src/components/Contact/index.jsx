import React from 'react'

export default function index() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Contact</h1>
                    <hr />
                </div>
                <form className="w-100">
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="your name" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>

                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="button" className="btn btn-primary" id="btnSubmit">Submit</button>
                </form>

            </div>
        </div>
    )
}
