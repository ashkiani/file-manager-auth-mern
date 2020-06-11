import React from 'react'

export default function index(props) {
    let { shared } = props.file;
    let sharedUsers = [];
    for (let i = 0; i < shared.length; i++) {
        sharedUsers.push(<div>{shared[i]}</div>);
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
