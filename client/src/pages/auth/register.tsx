import { useRegisterMutation } from '@/api/auth-api'
import { Button, Input } from '@/components'
import { InputTypes } from '@/components/input/types'
import {
  ButtonColors,
  ButtonSizes,
  ButtonTypes,
} from '@/components/button/types'
import { SetStateAction, useState } from 'react'
import Router from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [username, setUsername] = useState('')

  const [register] = useRegisterMutation()

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setEmail(e.target.value)

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setPassword(e.target.value)

  const handleUserTypeChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setRole(e.target.value)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const payload = await register({ email, password, role, username })

    if (!('error' in payload)) {
      Router.push('/');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white text-black p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Log in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id="email"
              label="Email address"
              type={InputTypes.Email}
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Input
              id="username"
              label="Username"
              type={InputTypes.Text}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              id="password"
              label="Password"
              type={InputTypes.Password}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="userType" className="block font-bold mb-2">
              I want to
            </label>
            <select
              id="userType"
              name="userType"
              className="block w-full px-4 py-2 rounded shadow-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={role}
              onChange={handleUserTypeChange}
            >
              <option value="student">Learn</option>
              <option value="teacher">Teach</option>
            </select>
          </div>
          <Button
            color={ButtonColors.Blue}
            size={ButtonSizes.Large}
            type={ButtonTypes.Submit}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  )
}
