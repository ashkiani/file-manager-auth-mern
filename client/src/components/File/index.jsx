import React from 'react'
import FileShare from "../FileShare"

export default function index(props) {
  function openClick(e) {
    console.log("Open Clicked!");
    console.log(e);
    console.log(props.data);
    props.data.openFunction(e);
  }
  function deleteClick(e) {
    console.log("Delete Clicked!");
    console.log(e);
    fetch("/api/files/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId: e }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => {
      if (res.status === 200) {
        props.data.showFunction();
      } else {
        res.text().then(text => { alert("Error please try again -" + text) });
      }
    })
      .catch(err => {
        console.log(err);
        alert("Error deleting file please try again");
      });
  }
  let index = props.data.index;
  let { id, name, owner, sharable } = props.data.file;
  if (sharable){
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{name}</td>
        <td>{owner}</td>
        <td><button onClick={() => openClick(id)}><i className="fa fa-folder-open" aria-hidden="true"></i></button></td>
        <td><FileShare file={props.data.file} /></td>
        <td><button onClick={() => deleteClick(id)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
      </tr>
    )
  }
  else{
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{name}</td>
        <td>{owner}</td>
        <td><button onClick={() => openClick(id)}><i className="fa fa-folder-open" aria-hidden="true"></i></button></td>
        <td>Only the owner <br/>can share the file.</td>
        <td>Only the owner <br/>can delete the file.</td>
      </tr>
    )
  }
  
}
