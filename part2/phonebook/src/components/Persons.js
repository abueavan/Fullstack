import React from "react"

const Person = ({person, onDelete}) => {
    return (
        <li>
            {person.name} {person.number} <button onClick={() => onDelete(person)} >delete</button>
        </li>
    )
}

const Persons = ({persons, onDelete}) => persons.map((person) => <Person person={person} key={person.id} onDelete={onDelete} />)

export default Persons