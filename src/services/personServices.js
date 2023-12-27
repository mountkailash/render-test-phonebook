import axios from 'axios'

const baseUrl = 'localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = nameObject => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}

const update = (id, nameObject) => {
    return axios.put(`${baseUrl}/${id}`, nameObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}