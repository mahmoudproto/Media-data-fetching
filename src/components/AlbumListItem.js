import ExpandablePanel from "./BasicComponents/ExpandablePanel";
import Button from "./BasicComponents/Button";
import { GoTrashcan } from "react-icons/go";
import { useDeleteAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumListItem({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleDelete = () => {
    deleteAlbum(album);
  };

  const header = (
    <>
      <Button className='mr-2' onClick={handleDelete} isLoading={results.isLoading}>
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );

  return (
    <div>
      <ExpandablePanel header={header}><PhotosList album={album}/></ExpandablePanel>
    </div>
  );
}

export default AlbumListItem;
