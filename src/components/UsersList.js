import { useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from "./BasicComponents/Skeleton";
import Button from "./BasicComponents/Button";
import UserListItem from "./UserListItem";
import UseThunk from "../store/hooks/UseThunk";
import { addUser, fetchUsers } from "../store";

function UsersList() {
  const { data } = useSelector((state) => state.users);

  const [isLoadingUsers, errorLoadingUsers, runUserThunk] =
    UseThunk(fetchUsers);
  const [isCreatingUser, errorCreatingUser, runCreatingUserThunk] =
    UseThunk(addUser);

  useEffect(() => {
    runUserThunk();
  }, [runUserThunk]);

  const handleAddUser = () => {
    runCreatingUserThunk();
  };

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} >
        <UserListItem user={user} />
      </div>
    );
  });

  let renderedContent;
  if (isLoadingUsers)
    renderedContent = <Skeleton times={4} />;
  else if (errorLoadingUsers)
    renderedContent = (
      <div> errorLoadingUsers message is {errorLoadingUsers.message}</div>
    );
  else renderedContent = renderedUsers;

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button isLoading={isCreatingUser} onClick={handleAddUser}>
          add user
        </Button>
        {errorCreatingUser && errorCreatingUser.message}
      </div>
      {renderedContent}
    </div>
  );
}

export default UsersList;
