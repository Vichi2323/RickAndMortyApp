import React,  { useEffect, useState } from 'react';
import { getData } from '../../Servises/RestAPI';

import './characters.css'

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [info, setInfo] = useState({
        pages: 5
    });
    const cat = "character";
    const [number, setNumber] = useState(1)
    const [decrementDisabled, setDecrementDisabled] = useState(false)
    const [incrementDisabled, setIncrementDisabled] = useState(false)


    const increment = () => {
        if(number === info.pages){
        alert("no more pages")
    }else {
        setNumber(number + 1)
    }
    };


    const decrement = () => {
        if(number <= 1){
           alert("gggg")
        }else {
            setNumber(number - 1)
        }
    }

    useEffect(() => {
        getData(cat, number)
        .then(data => {
            setCharacters(data.results)
            setInfo(data.info)
        })
        if(number <= 1){
           setDecrementDisabled(true)

            }else{
                setDecrementDisabled(false)
            }
            if(number === info.pages){
                setIncrementDisabled(true)
            }else{
                setIncrementDisabled(false)
            }

    },[number]);

    console.log(number)



    return (
        <div className="paige-container">
            <h1 className="page-header">Characters</h1>
            <div className="cards-container">
            {characters ? characters.map((character) => {
                return (
                    <div className="card-container" key={character.id}>
                        <h1 className="card-name">{character.name}</h1>
                        <img className="card-img" src={character.image} />
                        <div className="status-species-container">
                        <span className="card-status">{character.status}</span>
                        <span className="card-species">{character.species}</span>
                        </div>
                    </div>
                )
            }): null}
            </div>
            <button disabled={decrementDisabled} onClick={decrement}>previous page with characters</button>
            <button disabled={incrementDisabled} onClick={increment}>next page with characters</button>
        </div>
    );
};

export default Characters;
