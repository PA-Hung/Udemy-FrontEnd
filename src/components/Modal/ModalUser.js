import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import { fetchGroup } from '../../services/apiService';
import { toast } from 'react-toastify';

const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([])

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [groupID, setGroupID] = useState('');

    useEffect(() => {
        getGroup()
    }, [])

    const getGroup = async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }

    const onChangeEmail = (event) => {
        setEmail(event)
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={true}
                className='modal-user'
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
                                className='form-control'
                                type='text'
                                placeholder='Email'
                                value={email}
                                onChange={(event) => onChangeEmail(event.target.value)}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Phone'
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Username'
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <select className="form-select" aria-label="Gender">
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <input
                                className='form-control'
                                type='password'
                                placeholder='Password'
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <select className="form-select" aria-label="Group">
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
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={props.confirmCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
export default ModalUser
