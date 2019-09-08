import React, { useState, useEffect} from 'react';
import axios from 'axios'

const Filter = ({value, onChange}) => <p>find countries<input value={value} onChange={onChange} /></p>
const ShowCountry = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='' width='100px' />
        </div>
    )
}


const Countries = ({countries, shows, onClick}) => {    
    if(countries.length >= 10) {
        return (
            <p>Too much matches,specify another filter</p>
        )
    } else if (countries.length > 1) {
//      
        return(
            <div>
                {
                    countries.map((country, i) => {
                        const label = shows[i] ? 'unshow' : 'show'
                        return (
                                <div key={i}>
                                    <p>{country.name}<button onClick={() => onClick(i)} >{label}</button></p>
                                    {
                                        shows[i] && <ShowCountry country={country} />
                                    }
                                </div>
                            )
                        })
                }
            </div>
        )   
    } else if (countries.length === 1) {
        return (
            <ShowCountry country={countries[0]} />
        )
    }
    else if (countries.length === 0) {
        return <p></p>
    }
}

const App = () => {
    console.log('state 更新了')
    const [filter, setFilter]=useState('')
    const [countries, setCountries]=useState([])
    const [shows, setShows]=useState([])

    const handleclick = (i) => {
    //    const newShows = shows 
        const newShows = [...shows]
        newShows[i] = !newShows[i]
        setShows(newShows)
    
    }

    useEffect(() => {
            filter &&
            axios
            .get(`https://restcountries.eu/rest/v2/name/${filter}`)
            .then(response => {
                setCountries(response.data)
                setShows(Array(10).fill(null).map(i => false))
                const length = response.data.length
                if(length < 10) {
                }
            }, (e) => {
                setCountries([])
            })
        
    }, [filter]) // 第二个参数：当 filter 发生变化时调用 effect

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }


    return (
        <div>
             <Filter value={filter} onChange={handleFilterChange} />
             <Countries countries={countries} shows={shows} onClick={handleclick} />
        </div>
       
    )
}


export default App;
