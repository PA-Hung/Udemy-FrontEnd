import './Role.scss'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

const Role = (props) => {

    const [listChilds, setListChilds] = useState({
        child1: { url: '', description: '' }
    })

    useEffect(() => {
        Object.entries(listChilds).map(([key, value]) => {
            console.log(key)
            console.log(value)
        })
    }, [])

    const handleOnChangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds)
        _listChilds[key][name] = value
        setListChilds(_listChilds)
    }

    const handleAddNewURL = () => {
        let _listChilds = _.cloneDeep(listChilds)
        _listChilds[`child-${uuidv4()}`] = {
            url: '', description: ''
        }
        setListChilds(_listChilds)
    }

    const handleRemoveURL = (key) => {
        let _listChilds = _.cloneDeep(listChilds)
        delete _listChilds[key]
        setListChilds(_listChilds)
    }

    return (
        <>
            <div className='role-container'>
                <div className='container'>
                    <div className='mt-3'>
                        <div className='title'><h4>Add new role</h4></div>
                        <div className='role-parent'>
                            {
                                Object.entries(listChilds).map(([key, child], index) => {
                                    return (
                                        <div className='role-child row' key={`child-${key}`}>
                                            <div className={`col-5 form-group ${key}`}>
                                                <label>URL :</label>
                                                <input type='type'
                                                    className='form-control'
                                                    value={child.url}
                                                    onChange={(event) => handleOnChangeInput('url', event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-5 form-group'>
                                                <label>Description:</label>
                                                <input type='type'
                                                    className='form-control'
                                                    value={child.description}
                                                    onChange={(event) => handleOnChangeInput('description', event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-2 mt-4 actions'>
                                                <i className="fa fa-plus-circle add"
                                                    onClick={() => handleAddNewURL()}
                                                />
                                                {index >= 1 &&
                                                    <i className="fa fa-minus-circle remove"
                                                        onClick={() => handleRemoveURL(key)}
                                                    />
                                                }
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            <div>
                                <button className='btn btn-primary mt-3'>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Role