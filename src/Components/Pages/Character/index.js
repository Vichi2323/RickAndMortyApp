import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { ROUTES } from '../../Constants/Routes';
import { getCharacter, getAllInfo } from '../../Servises/RestAPI';
import './character.css'

const Character = () => {

    const [character, setCharacter] = useState();
    const cat = "character";
    const location = useLocation();
    const [count, setCount] = useState("");
    // const id = location.state.id
    const id = useParams().id;
    const history = useHistory();

    console.log(id)


    useEffect(() => {
        getAllInfo(cat)
            .then(data => setCount(data.info.count))
        if (id < count) {
            getCharacter(cat, id)
                .then(data => setCharacter(data))
                .catch(err => console.log(err))

        } else {
            // history.push(ROUTES[404]);
        }

    }, [id, history, count]);

    return (
        <div className="character-paige-container">
            {character ?
                <div className="character-container">
                    <div className="img-div">
                        <img className="character-img" src={character.image} alt="character image" />
                    </div>
                    <div className="character-info">
                        <span>{character.name}</span>
                        <span>{character.gender}</span>
                        <span>{character.location.name}</span>
                        <span>{character.origin.name}</span>
                        <span>{character.species}</span>
                        <span>{character.status}</span>
                        <span>{character.type}</span>

                    </div>
                </div>
                : null}
        </div>
    );
};

export default Character;
