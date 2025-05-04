import UserProfile from '../components/UserProfile';

export default function Home() {
  return (
    <div>
      <div className="flex justify-end p-4">
        <UserProfile />
      </div>
      {/* Rest of your home page */}
    </div>
  );
}