import Button from "./BasicComponents/Button";
import { GoTrashcan } from "react-icons/go";
import UseThunk from "../store/hooks/UseThunk";
import { deleteUser } from "../store";
import ExpandablePanel from "./BasicComponents/ExpandablePanel";
import AlbumList from "./AlbumList";

function UserListItem({ user }) {
  const [isDeletingUser, error, runDeletUser] = UseThunk(deleteUser);

  const handDeleteUser = () => {
    runDeletUser(user);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        isLoading={isDeletingUser}
        onClick={handDeleteUser}
      >
        <GoTrashcan />
      </Button>
      {error&&<div>error deleting user</div>}
      {user.name}
    </>
  );
  return <ExpandablePanel header={header}><AlbumList user={user}/></ExpandablePanel>;
}
export default UserListItem;
