import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import './registration.css';
import { registerUser } from '@/service/registrationService';

export interface FormFields {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const validators: Record<
  keyof FormFields,
  (value: string, country?: string) => string
> = {
  email: value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Invalid email format';
  },
  password: value => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Zа-яА-ЯёЁ])[a-zA-Zа-яА-ЯёЁ\d]{8,}$/;
    return regex.test(value)
      ? ''
      : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
  },
  firstName: value => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return nameRegex.test(value) && value.trim()
      ? ''
      : 'Must contain only letters and spaces';
  },
  lastName: value => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return nameRegex.test(value) && value.trim()
      ? ''
      : 'Must contain only letters and spaces';
  },
};

const validateField = (
  name: keyof FormFields,
  value: string,
  country?: string,
) => {
  return validators[name](value, country);
};

export function RegistrationPage() {
  const [formData, setFormData] = useState<FormFields>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors: Partial<FormFields> = {};
    let isValid = true;

    for (const key of Object.keys(formData) as Array<keyof FormFields>) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(formData, navigate, dispatch);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        ...errors,
        password: 'Registration error. Check your details',
      });
    }
  };

  const renderInput = (
    name: keyof FormFields,
    label: string,
    type: string = 'text',
    placeholder?: string,
  ) => (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder ?? `Enter your ${label.toLowerCase()}`}
      />
    </div>
  );

  const formFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <form
        role="form"
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4"
      >
        <h2 className="text-lg text-center">Registration</h2>
        <p>
          Have an Account?{' '}
          <Link to="/login" className="text-green-500 underline">
            Log in
          </Link>
        </p>

        {formFields.map(field => (
          <div key={field.name}>
            {renderInput(
              field.name as keyof FormFields,
              field.label,
              field.type,
            )}
            {errors[field.name as keyof FormFields] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name as keyof FormFields]}
              </p>
            )}
          </div>
        ))}

        {!errors.password && (
          <p className="text-xs text-gray-500">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number
          </p>
        )}

        <Button type="submit" variant="secondary" size="sm" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
