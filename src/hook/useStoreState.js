import { useState } from "react";

const useStoreState = (initialState) => {
  const [listContent, setListContent] = useState(initialState);
  return {
    listContent,
    setListContent,
  };
};

export default useStoreState;
