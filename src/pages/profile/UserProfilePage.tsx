import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} from '@/app/slices/api-profile';
import InfoField from '@/components/profile/InfoField';
import AddressCard from '@/components/profile/AddressCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { EditableField } from './EditableField';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}

const parseDate = (dateString: string): Date | undefined => {
  const parts = dateString.split('.');
  if (parts.length !== 3) return undefined;

  const day = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10) - 1;
  const year = Number.parseInt(parts[2], 10);

  return new Date(year, month, day);
};

const validateDateOfBirth = (dateOfBirth: string): boolean => {
  const parsedDate = parseDate(dateOfBirth);
  if (!parsedDate) return false;

  const today = new Date();
  return parsedDate <= today;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): string => {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password))
    return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password))
    return 'Password must contain at least one lowercase letter';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  return '';
};

export const UserProfilePage = () => {
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery({}); //???
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [updateUser, { error: updateError, isLoading: isUpdating, isSuccess }] =
    useUpdateUserProfileMutation();
  const [
    changePassword,
    {
      error: passwordError,
      isLoading: isPasswordUpdating,
      isSuccess: isPasswordSuccess,
    },
  ] = useChangePasswordMutation();
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    addresses: [] as Address[],
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  });

  if (isLoading)
    return <div className="text-center py-8">Loading profile...</div>;
  if (error)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        Error loading user profile
      </div>
    );

  const { firstName, lastName, dateOfBirth, email, addresses, version } =
    userProfile ?? {};

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    if (isEditMode) {
      return;
    }
    setEditedData({
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      dateOfBirth: dateOfBirth ?? '',
      email: email ?? '',
      addresses: addresses ?? [],
    });
  };

  const togglePasswordChangeMode = () => {
    setIsPasswordChangeMode(prev => !prev);
    setIsEditMode(false);
    if (!isPasswordChangeMode) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!editedData.firstName.trim() || !editedData.lastName.trim()) {
      setErrors(prev => ({
        ...prev,
        firstName: 'First name and last name are required.',
      }));
      isValid = false;
    } else {
      setErrors(prev => ({ ...prev, firstName: '' }));
    }

    if (validateEmail(editedData.email) === false) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      isValid = false;
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }

    if (validateDateOfBirth(editedData.dateOfBirth) === false) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: 'Date of birth must be a valid past date.',
      }));
      isValid = false;
    } else {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: '',
      }));
    }

    return isValid;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    const passwordValidation = validatePassword(passwordData.newPassword);
    if (passwordValidation) {
      newErrors.newPassword = passwordValidation;
      isValid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = async () => {
    if (validateForm()) {
      try {
        await updateUser({
          version: userProfile?.version,
          actions: [
            { action: 'setFirstName', firstName: editedData.firstName },
            { action: 'setLastName', lastName: editedData.lastName },
            ...(editedData.dateOfBirth === dateOfBirth
              ? []
              : [
                  {
                    action: 'setDateOfBirth',
                    dateOfBirth: editedData.dateOfBirth,
                  },
                ]),
          ],
        }).unwrap();

        setIsEditMode(false);
      } catch (error_) {
        console.error('Failed to save changes:', error_);
      }
    }
  };

  const handlePasswordChange = async () => {
    if (validatePasswordForm()) {
      try {
        await changePassword({
          version: version,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }).unwrap();

        setIsPasswordChangeMode(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (error_) {
        console.error('Failed to change password:', error_);
        setPasswordErrors(prev => ({
          ...prev,
          currentPassword: 'Incorrect current password',
        }));
      }
    }
  };

  const PasswordChangeSection = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Change Password</h2>
      <div className="space-y-4 max-w-md">
        <EditableField
          label="New Password"
          value={passwordData.newPassword}
          onChange={value =>
            setPasswordData({ ...passwordData, newPassword: value })
          }
          type="password"
          error={passwordErrors.newPassword}
        />
        <EditableField
          label="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={value =>
            setPasswordData({ ...passwordData, confirmPassword: value })
          }
          type="password"
          error={passwordErrors.confirmPassword}
        />
      </div>
    </section>
  );

  const EditProfileSection = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Personal Information
      </h2>
      {(errors.firstName || errors.lastName) && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {errors.firstName || errors.lastName}
        </div>
      )}
      {errors.email && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {errors.email}
        </div>
      )}
      {errors.dateOfBirth && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {errors.dateOfBirth}
        </div>
      )}
      <div className="space-y-4">
        <EditableField
          label="First Name"
          value={editedData.firstName}
          onChange={value => setEditedData({ ...editedData, firstName: value })}
        />
        <EditableField
          label="Last Name"
          value={editedData.lastName}
          onChange={value => setEditedData({ ...editedData, lastName: value })}
        />
        <EditableField
          label="Email"
          value={editedData.email}
          onChange={value => setEditedData({ ...editedData, email: value })}
          type="email"
          error={errors.email}
        />
        <EditableField
          label="Date of Birth"
          value={editedData.dateOfBirth}
          onChange={value =>
            setEditedData({ ...editedData, dateOfBirth: value })
          }
          error={errors.dateOfBirth}
        />
      </div>
    </section>
  );

  const ProfileViewSection = () => (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Personal Information
        </h2>
        <div className="space-y-4">
          <InfoField label="First Name" value={firstName} />
          <InfoField label="Last Name" value={lastName} />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Addresses</h2>
        {addresses?.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {addresses.map((address: Address, index: number) => (
              <AddressCard key={index} address={address} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No addresses saved.</p>
        )}
      </section>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex gap-2 mb-6">
        {!isPasswordChangeMode && (
          <Button
            onClick={toggleEditMode}
            variant={isEditMode ? 'outline' : 'green'}
            className="min-w-32"
          >
            {isEditMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        )}
        {isEditMode && (
          <Button
            onClick={handleSaveChanges}
            variant="green"
            disabled={isUpdating}
            className="min-w-32"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </Button>
        )}
        {!isEditMode && !isPasswordChangeMode && (
          <Button
            onClick={togglePasswordChangeMode}
            variant="outline"
            className="min-w-32"
          >
            Change Password
          </Button>
        )}
        {isPasswordChangeMode && (
          <>
            <Button
              onClick={handlePasswordChange}
              variant="green"
              disabled={isPasswordUpdating}
              className="min-w-32"
            >
              {isPasswordUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Changing...
                </span>
              ) : (
                'Save Password'
              )}
            </Button>
            <Button
              onClick={togglePasswordChangeMode}
              variant="outline"
              className="min-w-32"
            >
              Cancel
            </Button>
          </>
        )}
      </div>

      {isSuccess && !isEditMode && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          Profile updated successfully!
        </div>
      )}

      {isPasswordSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          Password changed successfully!
        </div>
      )}

      {updateError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          Failed to update profile. Please try again.
        </div>
      )}

      {passwordError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          Failed to change password. Please try again.
        </div>
      )}

      {(() => {
        if (isPasswordChangeMode) return <PasswordChangeSection />;
        if (isEditMode) return <EditProfileSection />;
        return <ProfileViewSection />;
      })()}
    </div>
  );
};

export default UserProfilePage;
