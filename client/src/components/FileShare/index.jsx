import React, { useState }  from 'react'
import FileAccess from "../FileAccess"

export default function Index(props) {
    const [shared, setShared] = useState([props.file.shared]);
    function openClick(e) {
        console.log("Add/Share Clicked!");
        console.log(e);
        console.log(props.file);
        //props.data.openFunction(e);
      }
    return (
        <div>
            <input type="text" name="description" placeholder="Enter Username" required />
            <button onClick={() => openClick(props.file.id)}>Add</button>
            {shared}
            <FileAccess file={props.file}/>
        </div>
    )
}
