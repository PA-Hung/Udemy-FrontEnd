import axios from '../setup/axios'

const createRoles = (rolesData) => {
    console.log(rolesData)
    return axios.post('/api/v1/role/create', [...rolesData])
}

export {
    createRoles,
}