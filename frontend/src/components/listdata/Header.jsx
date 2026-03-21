const Header = ({ title, link, titleButton}) => {
  return (
    <div className="card-header d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">{title}</h4>
        </div>
        <a href={link} className="btn btn-primary add-list">
          <i className="las la-plus mr-3"></i>
          {titleButton}
        </a>
    </div>
  );
};

export default Header;