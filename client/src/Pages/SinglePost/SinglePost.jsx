import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import "./singlePost.css";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);

      console.log("SinglePost.jsx");
      console.log(res.data);
    };
    getPost();
  }, [path]);

  const handleDelete = async (e) => {
    try {
      console.log("Deleting...");
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async (e) => {
    try {
      await axios.put(`/posts/${post._id}`, {
       username: user.username, title, description ,
      });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="single-post">
      {post.photo !== "default.png" && (
        <img className="single-post__img" src={PF + post.photo} />
      )}

      {updateMode ? (
        <input
          className="single-post__title single-post__title--edit"
          value={title}
          type="text"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="single-post__title">{post.title}</h1>
      )}

      {/* <h2>{post.description}</h2> */}

      <div className="single-post__info">
        <span>
          Author:
          <Link className="link" to={`/?user=${post.username}`}>
            {" "}
            <b>{post.username}</b>
          </Link>
        </span>
        <span>1 hour ago</span>
      </div>

      {post.username === user?.username && (
        <div className="single-post__edit">
          <i
            className="single-post__icon fa-solid fa-pen-nib"
            onClick={() => setUpdateMode(true)}
          ></i>
          <i
            className="single-post__icon fa-solid fa-trash-can"
            onClick={handleDelete}
          ></i>
        </div>
      )}

      {updateMode ? (
        <div className="single-post__description--edit">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      ) : (
        <p className="single-post__description">{post.description}</p>
      )}

      {updateMode && <button className="single-post__submit" onClick={handleUpdate}>Update</button>}
    </div>
  );
}
