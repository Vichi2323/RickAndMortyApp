import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
import { getData, getCharactersByName } from '../../Servises/RestAPI';
import { ROUTES } from '../../Constants/Routes';
import { RadioGroup } from '../../UI/Radio';
import Input from '../../UI/Input';

import './characters.css'

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [info, setInfo] = useState({
        pages: 5
    });
    const [name, setName] = useState(undefined)
    const cat = "character";
    const [number, setNumber] = useState(1);
    const [decrementDisabled, setDecrementDisabled] = useState(false);
    const [incrementDisabled, setIncrementDisabled] = useState(false);
    const history = useHistory();
    const [radio, setRadio] = useState("alive");
    const [charactersByName, setCharactersByName] = useState()
    const [charactersByNameInfo, setCharactersByNameInfo] = useState({
        pages: 2
    })


    const status = [
        { value: 'alive', label: 'Alive' },
        { value: "dead", label: 'Dead' },
        { value: "unknown", label: 'Unknown' }
    ];

    console.log(characters)

    const increment = () => {
        if (number === info.pages) {
            Swal.fire({
                title: "<h5 style='color:#f9bf1e', >" + "Error" + "</h5>",
                text: 'No previous pages',
                icon: 'error',
                confirmButtonText: 'Cool',
                confirmButtonText: "Got it",
                iconColor: "#f675da",
                customClass: {
                    text: "swal-text-color",
                    confirmButton: "error-btn-swal"
                },
                buttonsStyling: false,
                confirmButtonAriaLabel: "aria-label"
            })
        } else {
            setNumber(number + 1);
        };
    };


    const decrement = () => {
        if (number <= 1) {
            Swal.fire({
                title: "<h5 style='color:#f9bf1e', >" + "Error" + "</h5>",
                text: 'No previous pages',
                icon: 'error',
                confirmButtonText: 'Cool',
                confirmButtonText: "Got it",
                iconColor: "#f675da",
                customClass: {
                    text: "swal-text-color",
                    confirmButton: "error-btn-swal"
                },
                buttonsStyling: false,
                confirmButtonAriaLabel: "aria-label"
            })
        } else {
            setNumber(number - 1);
        };
    };

    const decrementErrorBtn = () => {
        if (decrementDisabled === true) {
            return (<div className="error-btn" disabled={decrementDisabled} onClick={decrement}>previous page with characters</div>
            )
        } else {
            return (
                <div className="btn" disabled={decrementDisabled} onClick={decrement}>previous page with characters</div>
            )
        }
    }

    const incrementErrorBtn = () => {
        if (incrementDisabled === true) {
            return (<div className="error-btn" disabled={incrementDisabled} onClick={increment}>next page with characters</div>
            )
        } else {
            return (
                <div className="btn" disabled={incrementDisabled} onClick={increment}>next page with characters</div>

            )
        }
    }

    useEffect(() => {
        if (name === undefined) {
            getData(cat, number)
                .then(data => {
                    setCharacters(data.results)
                    setInfo(data.info)
                })
        } else {

        }
        if (number <= 1) {
            setDecrementDisabled(true)
        } else {
            setDecrementDisabled(false)
        }
        if (number === info.pages) {
            setIncrementDisabled(true)
        } else {
            setIncrementDisabled(false)
        }
        if (name === "" || name === undefined) {
            setName(undefined)
        }
        getCharactersByName(cat, number, name, radio)
            .then(data => {
                setCharactersByName(data.results)
                // setCharactersByNameInfo(data.info)
                if (data.info != undefined) {
                    setInfo(data.info)
                } else {
                    console.log("this is from else")
                }
            })
    }, [number, name, radio]);




    const goToCharacter = (character) => {
        history.push(`${ROUTES.CHARACTER}/${character.id}`)
    }

    const handleChange = (e) => {
        setName(e.target.value)
    };

    const resetNameValue = () => {
        setName("")
        setNumber(1)
    };


    return (
        <div className="page-container">
            <div className="input-radio-container">
            <Input
                className="characters-input"
                type="text"
                name={name}
                value={name}
                onChange={handleChange}
                onFocus={resetNameValue}
                children="Search characters"
                placeholder={"Enter a name"}
                labelClassname="label"
                inputContainerClassname="input-container"
            />
            <RadioGroup
                options={status}
                name='status'
                disabled={false}
                value={radio}
                onChange={setRadio}
            />
            </div>
            <h1 className="page-header">Characters</h1>
            <div className="cards-container">
                {charactersByName ? charactersByName.map((character) => {
                    return (
                        <div onClick={() => {
                            goToCharacter(character)
                        }} className="card-container" key={character.id}>
                            <h1 className="card-title" >{character.name}</h1>
                            <img className="card-img" src={character.image} />
                            <div className="status-species-container">
                                <span className="card-status">{character.status}</span>
                                <span className="card-species">{character.species}</span>
                            </div>
                        </div>
                    )
                }) :
                    characters ? characters.map((character) => {
                        return (
                            <div onClick={() => {
                                goToCharacter(character)
                            }} className="card-container" key={character.id}>
                                <h1 className="card-title" >{character.name}</h1>
                                <img className="card-img" src={character.image} />
                                <div className="status-species-container">
                                    <span className="card-status">{character.status}</span>
                                    <span className="card-species">{character.species}</span>
                                </div>
                            </div>
                        );
                    }) : null}
            </div>
            <div className="btn-container">
                {decrementErrorBtn()}
                {incrementErrorBtn()}
            </div>
        </div>
    );
};

export default Characters;
