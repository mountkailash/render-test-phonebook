import React from "react";
import { useState } from "react";



const PersonForm = ({ addName, newName, handleNewName, phoneNumber , handlePhoneNumber }) => {



    return (
        <>
            <form onSubmit={addName}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleNewName}
                    />
                </div>
                <div>
                    number: <input
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                    />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm