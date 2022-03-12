import "./header.css";

export default function Header() {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="header">
      <img
        className="header__element header__img"
        src={PF + "default.png"}
      />

      <div className="header__element header__block">
        <div className="header__title">Omo</div>
        <div className="header__description">
          Welcome to the smallest blogging app in the world...it's like, super small
        </div>
      </div>
    </div>
  );
}
