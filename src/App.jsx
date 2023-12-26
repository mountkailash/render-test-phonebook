import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personServices from './services/personServices'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: '1234567890'
    }
  ])
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const displayNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const fetchData = () => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })

  }


  const nameToShow = showAll
    ? persons
    : persons.filter(person => person.name !== '')

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name === newName)
    const phoneExists = persons.find(person => person.name === newName && person.number !== phoneNumber)
    console.log(phoneExists)
    if (nameExists) {
      fetchData(); // Refresh data from the server to remove deleted name from UI
      displayNotification(`Info The '${newName}' was already deleted from the server`);
      return;
      if (phoneExists) {

        const confirmed = window.confirm(`Info ${newName} is already added to the phonebook, replace the old number with a new one?`)
        if (confirmed) {
          const updatedPerson = persons.map((person) =>
            person.name === newName ? { ...person, number: phoneNumber } : person
          )

          personServices
            .update(nameExists.id, { ...nameExists, number: phoneNumber })
            .then(() => {
              setPersons(updatedPerson)
              setNewName('')
              setPhoneNumber('')
              displayNotification('Info The phone number has been updated')
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                displayNotification(`Error The '${newName}' was already deleted from the server`)
                fetchData();
              } else {
                setErrorMessage('An error occurred while updating the phone number')
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              }
            })

        }

      }
    } else {
      const nameObject = {
        name: newName,
        number: phoneNumber,
        // id: persons.length + 1,
      }
      personServices
        .create(nameObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setPhoneNumber('')
          displayNotification(`Added ${newName}`)
        })
        .catch(error => {
          setErrorMessage(
            `Error Failed to add ${newName} to the phonebook: ${error.message}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }



  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })

  }, [])
  

  const deletePerson = (id) => {
    const personToDelete = persons.find((person => person.id === id))
    const confirmed = window.confirm(`Delete ${personToDelete.name} ?`)
    if (confirmed) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          displayNotification(`Deleted ${personToDelete.name}`)
          
        })
        .catch(error => {
          const confirmed = alert(`Error The ${newname} was already deleted from sever`)
          if (confirmed) {
            const updatedPerson = persons.map((person) =>
              person.name === newName ? { ...person, number: phoneNumber } : person
            )
          }
          setErrorMessage('Error Failed to delete')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }
  }



  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filteredPersons={filteredPersons}
      />

      <Notification message={errorMessage} />

      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        phoneNumber={phoneNumber}
        handlePhoneNumber={handlePhoneNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App
