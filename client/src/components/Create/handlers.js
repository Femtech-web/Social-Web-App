import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../configs/firebase";

import { savePost, updatePost } from "../../Redux/apiCalls";
import { removeCurrentId, fetchStart, fetchEnd } from "../../Redux/postRedux";

const initialText = {
  title: "",
  context: "",
};

const handleFileUpload = (e, setSelectedFiles) => {
  setSelectedFiles(e.target.files);
};

const handleChange = (e, setInputText) => {
  const { name, value } = e.target;
  setInputText((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (
  e,
  selectedFiles,
  cat,
  editId,
  fullname,
  inputText,
  dispatch,
  setInputText,
  setSelectedFiles,
  navigate,
) => {
  e.preventDefault();
  dispatch(fetchStart());

  const filesUrl = [];
  let post;
  console.log(selectedFiles);
  if (inputText?.title === "" || inputText?.context === "") {
    return;
  }

  if (!editId) {
    if (selectedFiles?.length !== 0) {
      for (let i = 0; i < selectedFiles?.length; i++) {
        const file = selectedFiles[i];
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const url = await getDownloadURL(uploadTask.ref);
        filesUrl.push(url);
      }
    }

    post = { ...inputText, tags: cat, img: filesUrl, name: fullname };

    savePost(dispatch, post, navigate);
    dispatch(fetchEnd());

    setSelectedFiles(null);
    console.log(filesUrl);
  } else {
    post = inputText;
    updatePost(dispatch, post, navigate, editId);
    dispatch(removeCurrentId());
  }

  setInputText(initialText);
};

const handleClick = (itemName, selectedCat) => {
  const foundItem = selectedCat.find((item) => item === itemName);

  if (foundItem) {
    selectedCat = selectedCat.filter((item) => item !== foundItem);
  } else {
    selectedCat.push(itemName);
  }
};

const handleDone = (
  dispatch,
  selectedCat,
  setCategoryActive,
  populateCategory,
) => {
  dispatch(populateCategory(selectedCat));
  setCategoryActive(false);
};

const handleSearch = (e, categories, setSearchedCat) => {
  const searchedTerm = e.target.value;
  const searchedWords = categories.filter((item) =>
    item.includes(searchedTerm),
  );

  setSearchedCat(searchedWords);
};

export {
  initialText,
  handleChange,
  handleFileUpload,
  handleSubmit,
  handleClick,
  handleDone,
  handleSearch,
};
