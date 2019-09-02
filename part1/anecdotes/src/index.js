import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[props.selected]}<br />
        </div>
    )
}

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistic = (props) => {

    const mostVote = props.votes.indexOf(Math.max.apply(null, props.votes));

    
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[mostVote]}
            <p>has {props.votes[mostVote]} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0));

  const handleClickNext = () =>{
      const newSelected = Math.floor(Math.random() * 6);
      setSelected(newSelected);
     
  }

  const handleClickVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
  
  

  return (
    <div>
        
        <Anecdote anecdotes={props.anecdotes} selected={selected} />
        <Button handleClick={handleClickVote} text='vote' />
        <Button handleClick={handleClickNext} text='next anecdote' /> 
        <Statistic votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)