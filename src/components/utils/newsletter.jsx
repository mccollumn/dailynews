import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToNewsletter } from "../../store/utils/thunks";
import { showToast } from "./tools";
import { clearNewsletter } from "../../store/reducers/users";

const Newsletter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = textInput.current.value;
    dispatch(addToNewsletter({ email }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === "added") {
          showToast("SUCCESS", "You have been added to the newsletter");
        }
        if (response.newsletter === "failed") {
          showToast("ERROR", "You are already in the newsletter");
        }
        textInput.current.value = "";
        dispatch(clearNewsletter());
      });
  };

  return (
    <div className="newsletter_container">
      <h1>Join Our Newsletter</h1>
      <div className="form">
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your email"
              name="email"
              ref={textInput}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Add me to the list
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Newsletter;
