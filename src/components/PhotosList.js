import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./BasicComponents/Button";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./BasicComponents/Skeleton";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let renderedElements;
  if (isFetching)
    renderedElements = <Skeleton times={4} className={"h-8 w8"}></Skeleton>;
  else if (error)
    renderedElements = <div>error fetching photos {error.message}</div>;
  else
    renderedElements = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button onClick={handleAddPhoto} isLoading={addPhotoResults.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">{renderedElements}</div>
    </div>
  );
}
export default PhotosList;
