import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { getUsersList, deleteUserAction } from '../actions/userActions'

const UsersListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const usersList = useSelector((state) => state.usersList)
  const { loading, error, users } = usersList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success:successDelete } = userDelete

  
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(getUsersList())
    }else{
        navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])


  const deleteHandler = (id) => {
   if(window.confirm(`Are you sure you want to DELETE`)){
       dispatch(deleteUserAction(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive bordered className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>SURNAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UsersListScreen
