import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import ShowPasswordIcon from '@/assets/icons/eye.svg'
import HidePasswordIcon from '@/assets/icons/hide-eye.svg'
import { InputTypes } from './types'



type Properties = {
  id: string
  label: string
  type?: InputTypes
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  icon?: 'string | StaticImport'
}

export const Input: React.FC<Properties> = ({
  id,
  label,
  type = InputTypes.Text,
  value,
  onChange,
  className,
  required,
  icon,
}) => {
  const isPassword = type === InputTypes.Password
  const [showPassword, setShowPassword] = React.useState(false)

  const inputClasses = classNames(
    'w-full border border-gray-400 p-2 rounded',
    className
  )

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={inputClasses}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        />
        {icon && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1">
            <Image src={icon} alt="Email" />
          </div>
        )}
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Image src={HidePasswordIcon} alt="Hide password" />
            ) : (
              <Image src={ShowPasswordIcon} alt="Show password" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

