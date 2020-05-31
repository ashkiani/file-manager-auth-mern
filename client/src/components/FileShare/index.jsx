import React, { useState } from 'react'
import FileAccess from "../FileAccess"

export default function Index(props) {
    const [shared, setShared] = useState([props.file.shared]);
    const [inputText, setInputText] = useState("");
    function handleInputChange(event) {
        const { value } = event.target;
        setInputText(value);
    }
    function openClick(e) {
        console.log("Add/Share Clicked!");
        console.log(e);
        console.log(props.file);
        fetch("/api/files/share", {
            method: "POST",
            body: JSON.stringify({ fileId: e, shareWith: inputText }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status === 200) {
                //   showFiles();
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
        <div>
            <input type="text" name="description" placeholder="Enter Username" value={inputText} onChange={handleInputChange} required />
            <button onClick={() => openClick(props.file.id)}>Add</button>
            {shared}
            <FileAccess file={props.file} />
        </div>
    )
}
