import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { loggedIn, logOut, user } = useAuth();
  const { items } = useBasket();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut(() => {
      navigate("/");
    });
  };
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">Ecommerce App</Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Products</Link>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          {!loggedIn && (
            <>
              <Link to="/sign-up">
                <Button colorScheme="blue">Sign Up</Button>
              </Link>
              <Link to="/sign-in">
                <Button colorScheme="blue">Sign In</Button>
              </Link>
            </>
          )}
          {loggedIn && (
            <>
              <Link to="/basket">
                <Button colorScheme="blue">
                  Basket {items.length > 0 ? items.length : ""}
                </Button>
              </Link>

              {user?.role === "admin" && (
                <Link to="/admin">
                  <Button colorScheme="blue" variant="ghost">
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button colorScheme="blue">Profile</Button>
              </Link>
              <Button colorScheme="blue" onClick={handleLogOut} ml={2}>
                Log Out
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
