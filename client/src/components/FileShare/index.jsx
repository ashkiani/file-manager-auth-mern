import React, { useState } from 'react'
import FileAccess from "../FileAccess"

export default function Index(props) {
    const [inputText, setInputText] = useState("");
    const [fileAcc, setFileAcc] = useState([<FileAccess key={props.file} file={props.file} />]);

    function handleInputChange(event) {
        const { value } = event.target;
        setInputText(value);
    }
    function openClick(e) {
        console.log("Add/Share Clicked!");
        console.log(e);
        console.log(props.file);
        fetch("/api/files/share/add", {
            method: "POST",
            body: JSON.stringify({ fileId: e, shareWith: inputText, access: 0 }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            console.log(res.status)
            if (res.status === 200) {
                //   showFiles();
                const data = await res.json();
                setFileAcc([<FileAccess file={data} />]);
            } else {
                res.text().then(text => { alert("Error please try again -" + text) });
            }
        })
            .catch(err => {
                console.log(err);
                alert("Error adding file in please try again");
            });
    }
    if (props.file.sharable) {
        return (
            <div>
                <input type="text" name="description" placeholder="Enter Username" value={inputText} onChange={handleInputChange} required />
                <button onClick={() => openClick(props.file.id)}>Add</button>
                {fileAcc}
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}