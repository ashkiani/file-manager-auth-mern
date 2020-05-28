import React from 'react'
import FileAccess from "../FileAccess"

export default function index(props) {
    return (
        <div>
            <input type="text" name="description" placeholder="Enter Username" required />
            <button>Add</button>
            <FileAccess file={props.file}/>
        </div>
    )
}
