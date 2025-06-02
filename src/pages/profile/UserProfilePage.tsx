import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
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

const validateDateOfBirth = (date: string): boolean => {
  const dob = new Date(date);
  const now = new Date();
  return dob <= now;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const UserProfilePage = () => {
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery({}); //???
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateUser, { error: updateError, isLoading: isUpdating, isSuccess }] =
    useUpdateUserProfileMutation();
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    addresses: [] as Address[],
  });

  if (isLoading)
    return <div className="text-center py-8">Loading profile...</div>;
  if (error)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        Error loading user profile
      </div>
    );

  const { firstName, lastName, dateOfBirth, email, addresses } =
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

  const validateForm = (): boolean => {
    let isValid = true;

    if (!editedData.firstName.trim() || !editedData.lastName.trim()) {
      alert('First name and last name are required.');
      isValid = false;
    }

    if (!validateEmail(editedData.email)) {
      alert('Please enter a valid email address.');
      isValid = false;
    }

    if (!validateDateOfBirth(editedData.dateOfBirth)) {
      alert('Date of birth must be a valid past date.');
      isValid = false;
    }

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex gap-2 mb-6">
        <Button
          onClick={toggleEditMode}
          variant={isEditMode ? 'outline' : 'green'}
          className="min-w-32"
        >
          {isEditMode ? 'Cancel' : 'Edit Profile'}
        </Button>
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
      </div>

      {isSuccess && !isEditMode && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          Profile updated successfully!
        </div>
      )}

      {updateError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          Failed to update profile. Please try again.
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Personal Information
        </h2>
        <div className="space-y-4">
          {isEditMode ? (
            <>
              <EditableField
                label="First Name"
                value={editedData.firstName}
                onChange={value =>
                  setEditedData({ ...editedData, firstName: value })
                }
              />
              <EditableField
                label="Last Name"
                value={editedData.lastName}
                onChange={value =>
                  setEditedData({ ...editedData, lastName: value })
                }
              />
              <EditableField
                label="Date of Birth"
                value={editedData.dateOfBirth}
                onChange={value =>
                  setEditedData({ ...editedData, dateOfBirth: value })
                }
              />
              <EditableField
                label="Email"
                value={editedData.email}
                onChange={value =>
                  setEditedData({ ...editedData, email: value })
                }
              />
            </>
          ) : (
            <>
              <InfoField label="First Name: " value={firstName} />
              <InfoField label="Last Name: " value={lastName} />
              <InfoField label="Email: " value={email} />
              <InfoField label="Date of Birth: " value={dateOfBirth} />
            </>
          )}
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
    </div>
  );
};

export default UserProfilePage;
