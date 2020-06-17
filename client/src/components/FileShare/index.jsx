import React, { useState } from 'react'
import FileAccess from "../FileAccess"

export default function Index(props) {
    const [fileShareState, setFileShareState] = useState({
        inputText: "",
        fileAcc: [<FileAccess key={0} file={props.file} />],
        key: 0
    })
   
    function handleInputChange(event) {
        const { value } = event.target;
        setFileShareState({ inputText: value, fileAcc: fileShareState.fileAcc, key: fileShareState.key });
    }
    function openClick(e) {
        console.log("Add/Share Clicked!");
        console.log(e);
        console.log(props.file);
        fetch("/api/files/share/add", {
            method: "POST",
            body: JSON.stringify({ fileId: e, shareWith: fileShareState.inputText, access: 0 }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            console.log(res.status)
            if (res.status === 200) {
                //   showFiles();
                const data = await res.json();
                setFileShareState({ inputText: "", fileAcc: [<FileAccess key={fileShareState.key + 1} file={data} />], key: fileShareState.key + 1 });
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
                <input type="text" name="description" placeholder="Enter Username" value={fileShareState.inputText} onChange={handleInputChange} required />
                <button onClick={() => openClick(props.file.id)}>Add</button>
                {fileShareState.fileAcc}
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