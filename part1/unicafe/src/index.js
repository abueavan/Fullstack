import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Statistic = (props) => {
    return <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad;
    if (all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    const average = (props.good * 1.0 - props.bad * 1.0) / all;
    const positive = props.good * 100.0 / all;
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <Statistic text='good' value={props.good} />
                    <Statistic text='neutral' value={props.neutral} />
                    <Statistic text='bad' value={props.bad} />
                    <Statistic text='all' value={all} />
                    <Statistic text='average' value={average} />
                    <Statistic text='positive' value={positive + '%'} />
                </tbody>
            </table>
        </div>
     
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handNeutral = () => setNeutral(neutral + 1);
  const handBad = () => setBad(bad + 1);


  return (
    <div>
      <h1>good feedback</h1>
      <Button handleClick={handleGood} text='good'  />
      <Button handleClick={handNeutral} text='neutral' />
      <Button handleClick={handBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)