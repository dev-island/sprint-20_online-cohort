import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { Button } from "@chakra-ui/react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { token, userId: currentUserId } = useAuthContext();
  const { userId } = useParams();
  const isCurrentUser = currentUserId === userId;

  useEffect(() => {
    const getUser = async () => {
      if (!token || !userId) {
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();
        console.log(data);
        setUser(data.user);
      } catch (error) {
        console.error("Failed to get user", error);
      }
      setLoading(false);
    };
    getUser();
  }, [userId, token]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        {isCurrentUser ? <Button>Edit Profile</Button> : null}
        <h1>{user.username}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>User not found</h1>
    </div>
  );
};

export default Profile;
