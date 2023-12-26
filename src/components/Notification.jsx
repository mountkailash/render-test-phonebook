import React from "react";



const Notification = ({message}) => {
    if(!message || typeof message !== 'string' || !message.trim()) {
        return null
    }

    const className = message.startsWith('Error') ? "error" : "notificationStyle"

    return(
        
        <div className= {className}>
            {message}
        </div>
    )
}

export default Notification