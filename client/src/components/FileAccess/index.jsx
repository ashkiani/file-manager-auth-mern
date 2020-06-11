import React from 'react'

export default function index(props) {
    function deleteClick(fileId, userEmail) {
        //alert("Delete Clicked!");
        
        console.log("Delete Clicked!");
        //console.log(e);
        
        fetch("/api/files/share/delete", {
          method: "DELETE",
          body: JSON.stringify({ fileId , userEmail }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(async res => {
          if (res.status === 200) {
            // props.data.showFunction();
          } else {
            res.text().then(text => { alert("Error please try again -" + text) });
          }
        })
          .catch(err => {
            console.log(err);
            alert("Error removing a share file. Please try again");
          });
      }
    let { id, shared } = props.file;
    let sharedUsers = [];
    for (let i = 0; i < shared.length; i++) {
        sharedUsers.push(<div>{shared[i]}<button onClick={() => deleteClick(id,shared[i])}><i className="fa fa-trash" aria-hidden="true"></i></button></div>);
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
