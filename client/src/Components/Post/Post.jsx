import { Link } from "react-router-dom";

import "./post.css";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
      <Link className="post__link" to={`/post/${post._id}`}>
        <img className="post__img" src={PF + post.photo} alt="" />
      </Link>

      <div className="post__info">
        <Link className="link" to={`/post/${post._id}`}>
          <span className="post__title">{post.title}</span>
        </Link>
        <hr />
      </div>
      <p className="post__description">{post.description}</p>
      <div className="post__categorys">
        {post.categories.map((category) => (
          <Link className="post__category link" to={`/?category=${category}`}>
            <span className="post__category">{category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
