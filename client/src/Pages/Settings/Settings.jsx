import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./settings.css";

export default function Settings() {
  const { user } = useContext(Context);
  const [file, setFile] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      updatedUser.profilePicture = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}

      try {
        const res = await axios.put("/users/" + user._id, updatedUser);
        console.log(res);
      } catch (err) {}
    }
  };
  return (
    <div className="settings">
      <div className="settings__wrapper">
        <div className="settings__title">
          <div className="settings__update-title">Edit profile</div>
          <span className="settings__delete-title"></span>
        </div>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            borderColor: "#000000",
          }}
        />

        <form className="settings__form" onSubmit={handleSubmit}>
          <label className="settings__subtitle">Profile details</label>

          <div className="settings__profile-picture">
            <img src={PF + user.profilePicture} alt="" />
            <label htmlFor="file__input">
              <i class="settings__profile-picture-icon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="file__input"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <label onChange={(e) => setUsername(e.target.value)}>Username</label>
          <input type="text" placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}}/>

          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}}/>

          <label>Password</label>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>

          <button className="settings__submit">Update</button>
        </form>
      </div>
    </div>
  );
}
