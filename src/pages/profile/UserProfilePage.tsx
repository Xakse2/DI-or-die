import { useGetUserProfileQuery } from '@/app/slices/api-profile';
import InfoField from '@/components/profile/InfoField';
import AddressCard from '@/components/profile/AddressCard';

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  const { firstName, lastName, dateOfBirth, addresses } = userProfile ?? {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="space-y-2">
          <InfoField label="First Name: " value={firstName} />
          <InfoField label="Last Name: " value={lastName} />
          <InfoField label="Date of Birth: " value={dateOfBirth} />
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
    </div>
  );
};

export default UserProfilePage;
