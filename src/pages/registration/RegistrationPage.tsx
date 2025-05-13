import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useNavigate } from 'react-router-dom';
import './registration.css';

type FormFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
};

const validateField = (name: keyof FormFields, value: string) => {
  switch (name) {
    case 'email': {
      return value.includes('@') ? '' : 'Invalid email format';
    }
    case 'password': {
      return value.length >= 8 ? '' : 'Password must be at least 8 characters';
    }
    case 'firstName':
    case 'lastName': {
      return value.trim() ? '' : 'This field is required';
    }
    case 'dateOfBirth': {
      return value ? '' : 'Please select your date of birth';
    }
    default: {
      return '';
    }
  }
};

export function RegistrationPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    city: '',
    street: '',
    postalCode: '',
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      //отправить данные на сервер
      //редирект
      await navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
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
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4">
      <form
        role="form"
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4"
      >
        <h2>Registration</h2>
        <p>
          Have an Account?{' '}
          <Link to="/login" className="text-green-500 underline">
            Log in
          </Link>
        </p>
        {renderInput('email', 'Email', 'email')}
        {renderInput('password', 'Password', 'password')}
        {renderInput('firstName', 'First Name')}
        {renderInput('lastName', 'Last Name')}
        {renderInput('dateOfBirth', 'Date of Birth', 'date')}
        {renderInput('country', 'Country')}
        {renderInput('city', 'City')}
        {renderInput('street', 'Street')}
        {renderInput('postalCode', 'Postal Code')}

        <Button type="submit" variant="secondary" size="sm" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
