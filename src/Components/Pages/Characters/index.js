import React,  { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from '../../Servises/RestAPI';
import { ROUTES } from '../../Constants/Routes' 

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
    const history = useHistory(); 


    const increment = () => {
        if(number === info.pages){
            alert("No more pages");
        }else {
            setNumber(number + 1);
        };
    };


    const decrement = () => {
        if(number <= 1){
           alert('No previous');
        }else {
            setNumber(number - 1);
        };
    };

    const decrementErrorBtn = () => {
        if(decrementDisabled === true){
            return(<div className="error-btn" disabled={decrementDisabled} onClick={decrement}>previous page with characters</div>
            )
        }else{
            return (
                <div className="btn" disabled={decrementDisabled} onClick={decrement}>previous page with characters</div>
            )
        }
    }

    const incrementErrorBtn = () => {
        if(incrementDisabled === true) {
            return(<div className="error-btn" disabled={incrementDisabled} onClick={increment}>next page with characters</div>
            )
        } else {
            return(
                <div className="btn" disabled={incrementDisabled} onClick={increment}>next page with characters</div>

            )
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

   

    const goToCharacter = (character) => {
        history.push({
            pathname: ROUTES.CHARACTER,
            state: {
                id:  character.id
            }
        })
    };
    return (
        <div className="page-container">
            <h1 className="page-header">Characters</h1>
            <div className="cards-container">
            {characters ? characters.map((character) => {
                return (
                    <div onClick={() => goToCharacter(character)} className="card-container" key={character.id}>
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
            <div className="btn-container">   
                {decrementErrorBtn()}
                {incrementErrorBtn()}      
            </div>
        </div>
    );
};

export default Characters;
