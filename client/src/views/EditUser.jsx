import React from 'react'
import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { useParams, Redirect } from 'react-router-dom'

import EditUserForm from '../components/EditUserForm'

const fetchUser = async ({ queryKey }) => {
  const [_key, { id }] = queryKey
  const response = await fetch(`http://localhost:5000/users/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

function EditUser() {
  const { id } = useParams()
  const { data, error, isLoading, isError } = useQuery(
    ['user', { id }],
    fetchUser
  )


  const mutation = useMutation((updatedUser) =>
    axios.post(`http://localhost:5000/users/${id}`, updatedUser)
  )

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data)
  }

  if (isSuccess) {
    return <Redirect to="/" />
  }

  // console.log(data)
  return (
    <div>
      <h2>Edit User</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {data && (
          <EditUserForm user={data[0]} submitText="Update" submitAction={onSubmit} />
        )}
      </div>
    </div>
  )
}

export default EditUser
