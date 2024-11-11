import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = (props) => {
  return (
    <Container className="mt-5 mb-5">
      {props.children}
      <ToastContainer />
    </Container>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
