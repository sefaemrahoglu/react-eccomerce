import { useAuth } from "../../contexts/AuthContext";
import { Heading } from "@chakra-ui/react";
function Profile(params) {
  const { user } = useAuth();
  return (
    <>
      <Heading>Profile</Heading>
      <code>{JSON.stringify(user)}</code>
    </>
  );
}
export default Profile;
