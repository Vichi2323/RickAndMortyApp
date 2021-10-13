import { BASE_URL } from '../../Constants/API';

export const getData = (cat, number) => {   
    return fetch(`${BASE_URL}/${cat}?page=${number}`,{
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
};

export const getCharacter = (cat, id) => {
    return fetch(`${BASE_URL}/${cat}/${id}`,{
        method: "GET"
    })
    .then(res => {
        return res.json()
    });
}

