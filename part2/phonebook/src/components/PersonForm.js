import React from 'react'

const PersonForm = (props) => {
    return (
      <div>
        <form onSubmit={props.onSubmit}>
          <div>
            <div>name: <input value={props.values[0]} onChange={props.onChanges[0]} /></div>
            <div>number: <input value={props.values[1]} onChange={props.onChanges[1]} /></div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}

export default PersonForm