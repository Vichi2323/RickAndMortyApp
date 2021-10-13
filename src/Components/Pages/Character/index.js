import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCharacter } from '../../Servises/RestAPI';

const Character = () => {

    const [character, setCharacter] = useState();
    const cat = "character";
    const location = useLocation();
    const id = location.state.id

    console.log(character)

    useEffect(() => {
        getCharacter(cat, id)
        .then(data => setCharacter(data))
    },[]);

    return (
        <div>
            
        </div>
    );
};

export default Character;
