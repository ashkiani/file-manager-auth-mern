import React from 'react'
import OpenFile from "../OpenFile"

export default function Index(props) {
    const { ids } = props
    return (
        <div>
            {ids.map(id=> {return <OpenFile key={id} id={id} closeFileFunction={props.closeFileFunction} />})}
        </div>
    )
}
