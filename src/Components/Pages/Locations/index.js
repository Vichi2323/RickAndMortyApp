import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../Constants/Routes';
import { getData } from '../../Servises/RestAPI'
import './locations.css'

const Locations = () => {

    const [locations, setLocations] = useState();
    const [info, setInfo] = useState({})
    const [number, setNumber] = useState(1)
    const [incrementDisabledButton, setIncrementDisabledButton] = useState(false)
    const [decrementDisabledButton, setDecrementDisabledButton] = useState(false)

    const history = useHistory()

    const cat = 'location'

    const increment = () => {
        if (info && info.pages && number === info.pages) {
            Swal.fire({
                title: 'Error!',
                text: 'No previous pages',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            setNumber(number + 1)
        }
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
        }
    }

    const incrementErrorButton = () => {
        if (incrementDisabledButton === true) {
            return (<div className="error-btn" disabled={incrementDisabledButton} onClick={increment}>next page</div>)
        } else {
            return (<div className="btn" disabled={incrementDisabledButton} onClick={increment}>next page</div>)

        }
    }

    const decrementErrorButton = () => {
        if (decrementDisabledButton === true) {
            return (<div className="error-btn" disabled={decrementDisabledButton} onClick={decrement}>previous page</div>)
        } else {
            return (<div className="btn" disabled={decrementDisabledButton} onClick={decrement}>previous page</div>)

        }
    }


    useEffect(() => {
        getData(cat, number)
            .then(data => {
                setLocations(data.results)
                setInfo(data.info)
            })
        if (number <= 1) {
            setDecrementDisabledButton(true)
        } else {
            setDecrementDisabledButton(false)
        }
        if (number === info.pages) {
            setIncrementDisabledButton(true)
        } else {
            setIncrementDisabledButton(false)
        }

    }, [number]);
    console.log(locations)
    console.log(info)

    const goToLocation = (location) => {
        history.push(`${ROUTES.LOCATION}/${location.id}`)
    }

    return (
        <div className="page-container">
            <h1 className="page-header">Locations</h1>
            <div className="whole-map-container">
                {locations ? locations.map((location) => {
                    return (
                        <ul className="location-container" onClick={() => goToLocation(location)} key={location.id}>

                            <li className="static-value"> Name: {location.name}</li>
                            <li className="static-value">Type: {location.type}</li>
                            <li className="static-value">Dimension: {location.dimension}</li>
                            <li className="dynamic-value">Residents</li>
                        </ul>
                    )

                }) : null}
            </div>
            <div className className="btn-container">
                {decrementErrorButton()}
                {incrementErrorButton()}
            </div>
        </div>
    );
};

export default Locations;
