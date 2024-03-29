const Profile = () => {
  const [cookies] = useCookies(["connect.sid"]);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
