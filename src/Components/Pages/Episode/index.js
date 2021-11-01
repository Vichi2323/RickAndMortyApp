import { ROUTES } from '../../Constants/Routes';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getCharacter, getAllInfo } from '../../Servises/RestAPI';




const Episode = () => {

    const [episode, setEpisode] = useState();
    const [count, setCount] = useState("");
    const cat = "episode";

    const id = useParams().id;
    const history = useHistory();


    console.log(episode)


    useEffect(() => {
        getAllInfo(cat)
            .then(data => setCount(data.info.count))
        if (id < count) {
            console.log("this is from if statement")
            getCharacter(cat, id)
                .then(data => setEpisode(data))
                .catch(err => console.log(err))

        } else {
            // history.push(ROUTES[404]);
            console.log("this is from else statement")
        }

    }, [id, history, count]);


  
    return (
        <>
        {episode &&
        <div>
            <h1>{episode.name}</h1>
            <h3>{ episode.air_date}</h3>
        </div>
        }
        </>
    )
}

export default Episode
