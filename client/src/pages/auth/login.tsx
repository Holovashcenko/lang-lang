import { useLoginMutation } from '@/api/auth-api'
import { Button, Input } from '@/components'
import { InputTypes } from '@/components/input/types'
import {
  ButtonColors,
  ButtonSizes,
  ButtonTypes,
} from '@/components/button/types'
import { SetStateAction, useState } from 'react'
import Router from 'next/router'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setEmail(e.target.value)
  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> }
  }) => setPassword(e.target.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = await login({ email, password });

    if (!('error' in payload)) {
      Router.push('/');
    }
  };

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
              id="password"
              label="Password"
              type={InputTypes.Password}
              value={password}
              onChange={handlePasswordChange}
              required
            />
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
