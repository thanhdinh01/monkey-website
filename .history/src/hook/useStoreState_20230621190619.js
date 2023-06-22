import { useState } from "react";

const useStoreState = (initialState) => {
  const [listContent, setListContent] = useState();
  return {
    listContent,
    setListContent,
  };
};

export default useStoreState;
