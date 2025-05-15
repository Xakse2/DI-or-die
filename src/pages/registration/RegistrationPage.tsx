import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useNavigate } from 'react-router-dom';
import './registration.css';

const COUNTRIES = new Set([
  'USA',
  'Canada',
  'Germany',
  'Russia',
  'Belarus',
  'Ukraine',
  'Kazakhstan',
  'Uzbekistan',
  'France',
  'Italy',
]);

const POSTAL_CODE_REGEX: Record<string, RegExp> = {
  USA: /^\d{5}(-\d{4})?$/,
  Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
  Germany: /^\d{5}$/,
  Russia: /^\d{6}$/,
  Belarus: /^\d{6}$/,
  Ukraine: /^\d{5}$/,
  Kazakhstan: /^\d{6}$/,
  Uzbekistan: /^\d{6}$/,
  France: /^\d{5}$/,
  Italy: /^\d{5}$/,
};

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

const validateField = (
  name: keyof FormFields,
  value: string,
  country?: string,
) => {
  switch (name) {
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : 'Invalid email format';
    }
    case 'password': {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(value)
        ? ''
        : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
    }
    case 'firstName':
    case 'lastName': {
      const nameRegex = /^[a-zA-Z\s]+$/;
      return nameRegex.test(value) && value.trim()
        ? ''
        : 'Must contain only letters and spaces';
    }
    case 'dateOfBirth': {
      if (!value) return 'Please select your date of birth';

      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 13 ? '' : 'You must be at least 13 years old';
    }
    case 'country': {
      return COUNTRIES.has(value) ? '' : 'Invalid country';
    }
    case 'street': {
      return value.trim() ? '' : 'Street is required';
    }
    case 'city': {
      const cityRegex = /^[a-zA-Z\s]+$/;
      return cityRegex.test(value) && value.trim()
        ? ''
        : 'City must contain only letters and spaces';
    }
    case 'postalCode': {
      if (!country) return 'Please select country first';
      const regex = POSTAL_CODE_REGEX[country] || /.*/;
      return regex.test(value)
        ? ''
        : `Invalid postal code format for ${country}`;
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
      const error = validateField(key, formData[key], formData.country);
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
        {!errors.password && (
          <p className="text-xs text-gray-500">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number
          </p>
        )}
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
