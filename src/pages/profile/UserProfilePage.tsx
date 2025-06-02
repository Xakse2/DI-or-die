import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/app/slices/api-profile';
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

export const UserProfilePage = () => {
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery({}); //???
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateUser, { error: updateError }] = useUpdateUserProfileMutation();
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [] as Address[],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  const { firstName, lastName, dateOfBirth, addresses } = userProfile ?? {};

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    if (!isEditMode) {
      setEditedData({
        firstName: firstName || '',
        lastName: lastName || '',
        dateOfBirth: dateOfBirth || '',
        addresses: addresses || [],
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser({
        version: userProfile?.version,
        actions: [
          { action: 'setFirstName', firstName: editedData.firstName },
          { action: 'setLastName', lastName: editedData.lastName },
        ],
      }).unwrap();

      setIsEditMode(false);
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Failed to save changes:', err);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Button onClick={toggleEditMode} variant="green" className="mb-4">
        {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
      </Button>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="space-y-2">
          {isEditMode ? (
            <>
              <EditableField label="First Name" value={editedData.firstName} onChange={value => setEditedData({ ...editedData, firstName: value })} />
              <EditableField label="Last Name" value={editedData.lastName} onChange={value => setEditedData({ ...editedData, lastName: value })} />
              <EditableField label="Date of Birth" value={editedData.dateOfBirth} onChange={value => setEditedData({ ...editedData, dateOfBirth: value })} />
            </>
          ) : (
            <>
              <InfoField label="First Name: " value={firstName} />
              <InfoField label="Last Name: " value={lastName} />
              <InfoField label="Date of Birth: " value={dateOfBirth} />
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Addresses</h2>
        {addresses.length > 0 ? (
          <ul className="space-y-4">
            {addresses.map((address: Address, index: number) => (
              <AddressCard key={index} address={address} />
            ))}
          </ul>
        ) : (
          <p>No addresses saved.</p>
        )}
      </section>
      {isEditMode && (
        <Button onClick={handleSaveChanges} variant="green" className="mt-4 w-full">
          Save Changes
        </Button>
      )}

      {updateError && <p className="text-red-500 mt-4">Failed to update profile. Please try again.</p>}
    </div>
  );
};

export default UserProfilePage;
