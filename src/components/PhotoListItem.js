import { GoTrashcan } from "react-icons/go";
import { useDeletePhotoMutation } from "../store";

function PhotoListItem({ photo }) {
  const [deletePhoto]=useDeletePhotoMutation();
  const handleDelete=()=>{
    deletePhoto(photo);
  };
  return (
    <div className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random"></img>
      <div className="absolute inset-0 flex hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan onClick={handleDelete} />
      </div>
    </div>
  );
}
export default PhotoListItem;
