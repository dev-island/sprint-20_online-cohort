import useGetUser from "../hooks/useGetUser";

const Profile = () => {
  const { user, loading, error } = useGetUser();
  console.log("USER", user);
  console.log("ERROR", error);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
