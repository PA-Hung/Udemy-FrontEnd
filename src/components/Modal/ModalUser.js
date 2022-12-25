import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import { fetchGroup, createNewUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash'

const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([])
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        gender: '',
        group: ''
    }
    const [userData, setUserData] = useState(defaultUserData)

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        group: true
    }

    const [validInputs, setValidInput] = useState(validInputsDefault)

    const checkValidInputs = () => {
        setValidInput(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false
                setValidInput(_validInputs)
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check
    }

    useEffect(() => {
        getGroup()
    }, [])

    const getGroup = async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
            let dataGroup = res.data.DT
            if (dataGroup && dataGroup.length > 0) {
                setUserData({ ...userData, group: dataGroup[0].id })
                console.log('>>>>>> check group ID', defaultUserData.group)
            }
        } else {
            toast.error(res.data.EM)
        }
    }

    const handleonChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }

    const handleSaveUser = async () => {
        let check = checkValidInputs()
        if (check === true) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] })
            // copy key của group và chuyển thành groupId cho giống trường trong database
            console.log('>>>>>>>> check res create new user', res)
            if (res.data && res.data.EC === 0) {
                props.onHide()
                setUserData({ ...defaultUserData, group: userGroups[0].id })
            } else {
                toast.error('Error create user ..!')
            }
        }
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show}
                className='modal-user'
                onHide={props.onHide}
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                placeholder='Email'
                                value={userData.email}
                                onChange={(event) => handleonChangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                placeholder='Phone'
                                value={userData.phone}
                                onChange={(event) => handleonChangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Username'
                                value={userData.username}
                                onChange={(event) => handleonChangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <select className="form-select" aria-label="Gender"
                                onChange={(event) => handleonChangeInput(event.target.value, 'gender')}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                type='password'
                                placeholder='Password'
                                value={userData.password}
                                onChange={(event) => handleonChangeInput(event.target.value, 'password')}
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                aria-label="Group"
                                onChange={(event) => handleonChangeInput(event.target.value, 'group')}
                            >
                                {
                                    userGroups.length > 0 && userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-12 col-sm-12 form-group mt-3'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Address'
                                value={userData.address}
                                onChange={(event) => handleonChangeInput(event.target.value, 'address')}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
export default ModalUser
