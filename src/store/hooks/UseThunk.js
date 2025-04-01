import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";

function UseThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback((params) => {
    setIsLoading(true);
    dispatch(thunk(params))
      .unwrap()
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  return [isLoading, error, runThunk];
}
export default UseThunk;
