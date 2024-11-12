import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/utils/thunks";
import { showToast } from "../utils/tools";

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "", firstname: "", lastname: "", message: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      message: Yup.string().required("Required").max(500, "Max 500 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
        .unwrap()
        .then((response) => {
          if (response) {
            showToast("SUCCESS", "Message sent successfully");
            resetForm();
          }
        })
        .catch(() => {
          showToast("ERROR", "An error occurred while sending the message");
        });
    },
  });

  return (
    <>
      <h1>Contact Us</h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email@example.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            placeholder="Enter your first name"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <Alert variant="danger">{formik.errors.firstname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            placeholder="Enter your last name"
            {...formik.getFieldProps("lastname")}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <Alert variant="danger">{formik.errors.lastname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            name="message"
            rows={3}
            {...formik.getFieldProps("message")}
          />
          {formik.touched.message && formik.errors.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Send Message
        </button>
      </form>
    </>
  );
};

export default Contact;
