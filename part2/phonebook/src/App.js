import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setErorr] = useState(null)
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.every((item) => item.name!==newName)) {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setInfo(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setInfo(null)
        }, 3000)
      })
    }
    else {
      if(window.confirm(`${newName} has already added to phonebook,replace the old number with a new one?`)){
        const id = persons.find(p => p.name === newName).id
        personService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setInfo(`Changed ${returnedPerson.name}`)
          setTimeout(() => {
          setInfo(null)
        }, 3000)
        })
        .catch(errro => {
          setErorr(`Information of ${newName} has already removed from server`)
          setTimeout(() => {
            setErorr(null)
          }, 3000)
          setPersons(persons.filter(p => p.id !== id))
        })
        
      }
    }
    
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}?`)){
      console.log(person.id)
      personService
     .deleteOne(person.id)
     .then(() => {
       setPersons(persons.filter(p => p.id !== person.id))
       setInfo(`Removed ${person.name}`)
       setTimeout(() => {
        setInfo(null)
      }, 3000)
     })
     .catch(error => {      
      setErorr(`Information of ${newName} has already removed from server`)
      setTimeout(() => {
        setErorr(null)
      }, 3000)    
       setPersons(persons.filter(p => p.id !== person.id))    
      })   
    }
    

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personToShow =  persons.filter((person) => person.name.match(RegExp(filter,'i')))

  const values = [newName, newNumber]
  const onChanges = [handleNameChange,handleNumberChange]

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={info}  />
      <Notification message={error} err />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm values={values} onChanges={onChanges} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App