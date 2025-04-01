import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),

  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, passedAlbum) => {
          return [`updatePhotos/${passedAlbum.id}`];
        },
        query: (album) => {
          return {
            url: "/photos",
            params: { albumId: album.id },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, passedAlbum) => [
          `updatePhotos/${passedAlbum.id}`,
        ],
        query: (album) => {
          return {
            url: "/photos",
            body: {
              albumId: album.id,
              url: `https://picsum.photos/seed/${Math.random()}/150/150`,
            },
            method: "POST",
          };
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, passedPhoto) => {
          return [`updatePhotos/${passedPhoto.albumId}`];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
export { photosApi };
