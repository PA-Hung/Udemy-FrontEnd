import { useEffect, useState } from 'react'
import './Users.scss'
import { fetchAllUser, deleteUser } from '../../services/apiService'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalComfirm from '../ModalComfirm';


const Users = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLitmit, setCurrentLimit] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalComfirm, setIsShowModalComfirm] = useState(false)
    const [dataModal, setDataModal] = useState({})

    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLitmit)
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users)
        }
        console.log('check >>>>>>>>> list user :', response.data.DT)
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUsers()
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalComfirm(true)

    }

    const handleClose = () => {
        setIsShowModalComfirm(false)
        setDataModal({})
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        console.log('check user delete >>>>>>>', response)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers()
            setIsShowModalComfirm(false)
        } else {
            toast.success(response.data.EM)
        }
    }

    return (
        <>
            <div className='container'>
                <div className='user-info-container'>
                    <div className='user-header '>
                        <div className='title-table pt-5'><h3>Table User Info</h3></div>
                        <div className='action d-flex justify-content-end'>
                            <button className='btn btn-success mx-3'>Refesh</button>
                            <button className='btn btn-primary'>Add new user</button>
                        </div>
                    </div>
                    <div><hr /></div>
                    <div className='user-body'>
                        <table className='table table-striped table-hover table-bordered'>
                            <thead>
                                <tr className='table-primary'>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>

                                                    <td>
                                                        <div>
                                                            <button className='btn btn-warning mx-3'>Edit</button>
                                                            <button
                                                                className='btn btn-danger'
                                                                onClick={() => handleDeleteUser(item)}
                                                            >Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td colSpan={6}>Not found users</td>
                                        </tr>
                                    </>
                                }

                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer d-flex justify-content-center'>
                            <ReactPaginate
                                nextLabel="Tiếp >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={3}
                                pageCount={totalPages}
                                previousLabel="< Trước"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>
            <div>
                <ModalComfirm
                    show={isShowModalComfirm}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDeleteUser}
                    dataModal={dataModal}
                />
            </div>
        </>
    )
}

export default Users