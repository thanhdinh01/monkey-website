import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

const useFirebaseImage = (setValue, getValues) => {
  const [progressUpload, setProgressUpload] = useState(0);
  const [imageURL, setImageURL] = useState("");

  console.log("imageURL", imageURL);

  const handleSelectImage = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setProgressUpload(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("image default");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("image default");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setValue("imageURL", downloadURL);
          setProgressUpload(0);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const fileName = getValues("file_name");
    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + fileName);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("delete image successfully");
        setImageURL("");
      })
      .catch((error) => {
        console.log(" Uh-oh, an error occurred! ", error);
        // Uh-oh, an error occurred!
      });
  };
  return { imageURL, progressUpload, handleSelectImage, handleDeleteImage };
};

export default useFirebaseImage;
