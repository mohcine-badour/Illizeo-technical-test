import * as Yup from 'yup'

// Validation schemas
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const getRegisterValidationSchema = (useSubdomain: boolean) =>
  Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    subdomain: useSubdomain
      ? Yup.string()
          .min(3, 'Subdomain must be at least 3 characters')
          .matches(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
          .required('Subdomain is required')
      : Yup.string(),
  })

// Initial values
export const loginInitialValues = {
  email: '',
  password: '',
}

export const registerInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  subdomain: '',
}

// Helper function to get input class based on validation state
export const getInputClassName = (
  touched: boolean | undefined,
  error: string | undefined,
  baseClasses: string = ''
) => {
  const hasError = touched && error
  const validationClasses = hasError
    ? 'outline-red-500 focus:outline-red-500'
    : 'outline-gray-300 focus:outline-amber-600'
  
  return `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${validationClasses} ${baseClasses}`
}

// Companies list (shared between login and register)
export const companies = [
  { id: 1, name: 'TechNova Solutions' },
  { id: 2, name: 'BlueSky Industries' },
  { id: 3, name: 'Quantum Dynamics' },
  { id: 4, name: 'GreenLeaf Corp' },
  { id: 5, name: 'Stellar Innovations' },
  { id: 6, name: 'NexGen Systems' },
  { id: 7, name: 'CloudPeak Technologies' },
  { id: 8, name: 'Horizon Enterprises' },
]

export type Company = typeof companies[number]

