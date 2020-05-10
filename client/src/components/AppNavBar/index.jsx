import React, { useState } from 'react'
import Files from "../Files";

function logout() {
  fetch("/logout")
    .then(res => {
      console.log(res);
      console.log(res.status);
      if (res.status === 200) {
        window.location.replace("/");
        // props.history.push("/");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.log(err);
      alert("Error logging in please try again");
    });
}

export default function Index(props) {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const showFiles = async () => {
    const res = await fetch("/api/files");
    const data = await res.json();
    console.log(data);
    setFiles([<button className="btn btn-success" key={0} data-toggle="modal" data-target="#dateModal"><i className="fa fa-plus-square" aria-hidden="true"></i> Add new</button>, <Files key={1} files={data} showFunction={showFiles} openFunction={props.openFunction} />]);
  };
    function handleInputChange(event) {
    console.log("fileName");
    console.log(event.target.value);
    setFileName(event.target.value)
  }
  function onSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
    fetch("/api/files/add", {
      method: "POST",
      body: JSON.stringify({ fileName }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => {
      if (res.status === 200) {
        showFiles();
      } else {
        res.text().then(text => { alert("Error please try again -" + text) });
      }
    })
      .catch(err => {
        console.log(err);
        alert("Error adding file in please try again");
      });
  }
  return (
    <div className="container">
      <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center  bg-info text-white my-2">
        <div className="p-2 w-90">
          <button type="button" className="btn btn-link text-light" onClick={showFiles}>Files</button>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse w-10" id="collapsingNavbar3">
          <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
            <button type="button" className="btn btn-link text-light" onClick={logout}>Logout</button>
          </ul>
        </div>
      </nav>
      <div>
        {files}
      </div>
      <div className="modal fade" id="dateModal" role="dialog" aria-labelledby="dateModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dateModalLabel">New File</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label >File Name:</label>
                    <input type="text" name="fileName" placeholder="Enter File Name" required className="form-control" value={fileName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label >Description:</label>
                    <input type="text" name="description" placeholder="Enter description" required className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={onSubmit} data-dismiss="modal">Save changes</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
