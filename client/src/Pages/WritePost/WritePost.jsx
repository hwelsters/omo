import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../Context/Context";

import "./writePost.css";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
      content,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      newPost.photo = filename;

      console.log(newPost);

      try {
        await axios.post("/upload", data);
      } catch (err) {}

      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
        console.log(res);
      } catch (err) {}
    }
  };
  return (
    <div className="write-post">
      {file && (
        <img
          className="write-post__img"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="write-post__form" onSubmit={handleSubmit}>
        <div className="write-post__form__group">
          <label htmlFor="fileInput">
            <i className="write-post__icon fa-solid fa-folder-plus"></i>
          </label>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            className="write-post__input"
            type="text"
            placeholder="Your bonk"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="write-post__form__group">
          <textarea
            className="write-post__input write-post__text"
            placeholder="Write something!"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <button className="write-post__submit">Post</button>
      </form>
    </div>
  );
}
