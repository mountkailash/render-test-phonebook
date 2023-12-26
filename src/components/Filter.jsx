import React from "react";



const Filter = ({ searchQuery, handleSearch, filteredPersons}) => {
    

    return (
        <>
            <div>
                filter shown with <input
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {searchQuery &&
                <>
                {filteredPersons.length > 0 ? (
                    filteredPersons.map((person, index) => (
                        <p key={index}>{person.name}</p>
                    ))
                ) : (
                    <p>No match found</p>
                
                )}
                </> 
                }
            </div>
        </>
    )
}

export default Filter