const Header = () => {
  const user = "tickle122";
  const userIMG = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  return (
    <div>
      <a className="home_page_link" href="/">
        home
      </a>
      <section className="user_info">
        <p className="user_logged">
          <img className="user_img" src={userIMG} alt="user_icon"></img>
          logged in as : {user}
        </p>
      </section>

      <h1>SOME NEWS</h1>
    </div>
  );
};

export default Header;
