import Skeleton from "./BasicComponents/Skeleton";
import Button from "./BasicComponents/Button";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) content = <Skeleton className="h-8" times={3} />;
  else if (error) content = <div>{error.message}</div>;
  else 
    content = data.map((album) => {
      return (
        <div key={album.id}>
          <AlbumListItem album={album}/>
        </div>
      );
    });
    
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">albums for {user.name}</h3>
        <Button isLoading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
export default AlbumList;
