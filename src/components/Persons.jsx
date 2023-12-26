import React from "react";
import { useState } from "react";



const Persons = ({ persons, deletePerson }) => {


    return(
        <>
        {persons.map((person, index) => (
          <p key={index}>{person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>
        ))}
        </>
    )
}

export default Persons