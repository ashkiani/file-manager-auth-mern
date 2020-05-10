import React from 'react'
import File from "../File";

export default function index(props) {
    return (
        <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Open</th>
                        <th scope="col">Share</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.files.map((file, index) => (
                        <File key={file.id.toString()} data={{ "index": index, "file": file, "showFunction": props.showFunction, "openFunction": props.openFunction }} />
                    ))}
                </tbody>
            </table>
    )
}
