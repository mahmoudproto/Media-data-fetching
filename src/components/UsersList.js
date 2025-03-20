import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import UseThunk from "../store/hooks/UseThunk";

function UsersList() {
  const { data } = useSelector((state) => state.users);

  const [isLoadingUsers,errorLoadingUsers,runUserThunk]=UseThunk(fetchUsers);
  const [isCreatingUser,errorCreatingUser,runCreatingUserThunk]=UseThunk(addUser);

  useEffect(()=>{
    runUserThunk();
  },[runUserThunk]);

  const handleAddUser = () => {
    runCreatingUserThunk();
  };

  if (isLoadingUsers) return <Skeleton times={4} className={"h-10 w-full"} />;
  if (errorLoadingUsers) return <div> errorLoadingUsers message is {errorLoadingUsers.message}</div>;

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>{
          isCreatingUser? 'creating user...'
        :<Button onClick={handleAddUser}>add user</Button>}
        {errorCreatingUser&&errorCreatingUser.message}
      </div>{" "}
      {renderedUsers}
    </div>
  );
}

export default UsersList;
