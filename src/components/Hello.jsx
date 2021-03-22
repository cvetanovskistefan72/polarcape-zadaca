import React from 'react'

export default function Hello(props) {
    return (
        <div className="hello-text">
            <p>Hello, {props.name}</p>
        </div>
    )
}
