import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategorys = async () => {
      const res = await axios.get("/category/");
      setCategories(res.data);

      console.log("Sidebar.jsx");
      console.log(res.data);
    };
    getCategorys();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__item">
          <span className="sidebar__title">About me</span>
          <img
            className="sidebar__img"
            src="https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nam
            harum minima consequatur. Eos nihil, nostrum omnis minus quasi dolor
            sequi! Id, aperiam doloremque esse aspernatur ab labore quidem?
            Reprehenderit!
          </p>
        </div>

        <div className="sidebar__item">
          <span className="sidebar__title sidebar__title--bottom">
            Categories
          </span>
          <ul className="sidebar__list">
            {categories.map((category) => (
              <Link className="link" to={`/?category=${category.name}`}>
                <li className="sidebar__list__item">{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="sidebar__item">
          <span className="sidebar__title sidebar__title--bottom">Links</span>

          <div className="sidebar__list">
            <i className="sidebar__icon fa-brands fa-linkedin" />
            <i className="sidebar__icon fa-brands fa-github-square" />
            <i className="sidebar__icon fa-solid fa-square-envelope" />
            <i class="sidebar__icon fa-brands fa-itch-io" />
          </div>
        </div>
      </div>
    </>
  );
}
