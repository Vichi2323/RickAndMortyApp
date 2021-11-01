import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { useHistory } from 'react-router-dom';
import { getData } from '../../Servises/RestAPI';
import './episodes.css'
import { ROUTES } from '../../Constants/Routes'

const Episodes = () => {

    const [episodes, setEpisodes] = useState();
    const [number, setNumber] = useState(1);
    const [info, setInfo] = useState({
        pages: 3
    })
    const [incrementButtonDisabled, setIncrementButtonDisabled] = useState(false)
    const [decrementButtonDisabled, setDecrementButtonDisabled] = useState(false)
    const cat = 'episode'
    const history = useHistory();



    const increment = () => {
        if (number === info.pages) {
            Swal.fire({
                title: 'Error!',
                text: 'No previous pages',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            setNumber(number + 1)
        };
    }



    const decrement = () => {
        if (number <= 1) {
            Swal.fire({
                title: 'Error!',
                text: 'No previous pages',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            setNumber(number - 1)
        };
    }


    const decrementErrorButton = () => {
        if (decrementButtonDisabled === true) {
            return (<div className="error-btn" disabled={decrementButtonDisabled} onClick={decrement}>previous page</div>)
        } else {
           return (<div className="btn" disabled={decrementButtonDisabled} onClick={decrement}>previous page</div>)
        }
    }

    const incrementErrorButton = () => {
        if (incrementButtonDisabled === true) {
            return (<div className="error-btn" disabled={incrementButtonDisabled} onClick={increment}>next page</div>)
        } else {
            return (<div className="btn" disabled={incrementButtonDisabled} onClick={increment}>next page</div>)
        }
    }


    useEffect(() => {
        getData(cat, number)
            .then(data => {
                setEpisodes(data.results)
                setInfo(data.info)
            })
        if (number <= 1) {
            setDecrementButtonDisabled(true)
        } else {
            setDecrementButtonDisabled(false)
        }
        if (number === info.pages) {
            setIncrementButtonDisabled(true)
        } else {
            setIncrementButtonDisabled(false)
        }

    }, [number]);


    console.log(episodes)

    const goToEpisode = (episode) => {
        history.push({
            pathname: `${ROUTES.EPISODE}/${episode.id}`,
            state: {
                count: info.count
            }
        })

    }

    return (
        <div className="page-container">
            <h1 className="page-header">Episodes</h1>
            {episodes ? episodes.map((episode) => {
                return (
                    <div onClick={() => goToEpisode(episode)} className="episode-container" key={episode.id}>
                        <p className="dynamic-value">{episode.id}) </p>
                        <p className="static-value"> Episode name: </p><p className="dynamic-value"> {episode.name}</p>
                        <p className="static-value"> Air date: </p><p className="dynamic-value"> {episode.air_date}</p>
                        <span className="info-span"> info </span>
                    </div>)
            }) : null}
            <div className="btn-container">
                {decrementErrorButton()}
                {incrementErrorButton()}
            </div>
        </div>

    );
};

export default Episodes;
