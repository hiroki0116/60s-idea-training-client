import { handleLogout } from "utils/auth_functions";

const Logout = () => {
  return (
    <div className="flex text-base">
      <a
        className="nav-link mr-8 cursor-pointer font-bold"
        onClick={handleLogout}
      >
        Logout
      </a>
    </div>
  );
};

export default Logout;
