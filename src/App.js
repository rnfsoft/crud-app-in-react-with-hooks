import React, { useState } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {
  const userData = [
    {id:1, name:'ABC', username:'abc'},
    {id:2, name:'123', username:'123'},
    {id:3, name:'A12', username:'a12'}
  ]

  const [users, setUsers] = useState(userData)

  const [editing, setEditing] = useState(false)

  const initialFormState = {id:null, name: '', username: ''}

  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)

    setUsers(users.filter(user => user.id !== id))


  }

  const editRow = user => {
    setEditing(true)

    setCurrentUser({id: user.id, name: user.name, username: user.username})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }


  return(
    <div className="container">
      <h1>CRUD with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2> Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />

            </div>
          ) :
          <div>

            <h2>Add user</h2>
            <AddUserForm addUser={addUser}/>
          </div>

          }


        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )


}

export default App