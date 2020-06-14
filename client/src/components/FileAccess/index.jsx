import React, { useState } from 'react'

export default function Index(props) {
  let { id, shared } = props.file;
  let arr = [];
  for (let i = 0; i < shared.length; i++) {
    arr.push(<div>{shared[i]}<button onClick={() => deleteClick(id, shared[i])}><i className="fa fa-trash" aria-hidden="true"></i></button></div>);
  }
  const [sharedUsers, setSharedUsers] = useState(arr);
  function deleteClick(fileId, userEmail) {
    //alert("Delete Clicked!");

    console.log("Delete Clicked!");
    //console.log(e);

    fetch("/api/files/share/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileId, userEmail }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async res => {
      if (res.status === 200) {
        // props.data.showFunction();
        const data = await res.json();
        // console.log(data.shared);
        let arr = [];
        for (let i = 0; i < data.shared.length; i++) {
          arr.push(<div>{data.shared[i]}<button onClick={() => deleteClick(id, data.shared[i])}><i className="fa fa-trash" aria-hidden="true"></i></button></div>);
        }
        setSharedUsers(arr);
      } else {
        res.text().then(text => { alert("Error please try again -" + text) });
      }
    })
      .catch(err => {
        console.log(err);
        alert("Error removing a share file. Please try again");
      });
  }
  return (
    <div className="border mt-1 pl-1">
      <div>usernames:
                <div>
          {sharedUsers}
        </div>
      </div>
    </div>
  )
}
