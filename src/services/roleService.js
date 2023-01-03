import axios from '../setup/axios'

const createRoles = (rolesData) => {
    console.log(rolesData)
    return axios.post('/api/v1/role/create', [...rolesData])
}

const fetchRoles = () => {
    return axios.get('/api/v1/role/read')
}

const deleteRole = (role) => {
    console.log('>>>>>>>>>>>>>>>xxxxxxxxxxx', role)
    let check = axios.delete('/api/v1/role/delete', { data: { id: role.id } })
    console.log('>>>>>>>>>>>>>>>xxxxxxxxxxx', role)
    return check
}

export {
    createRoles, fetchRoles, deleteRole
}