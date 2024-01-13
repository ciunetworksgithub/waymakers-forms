import FieldError from "./field-error";

const TextInput = ({ formik, name, title }) => {
  return (
    <label>
      {title}:
      <input
        type="text"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <FieldError formik={formik} name={name} />
    </label>
  );
};

export default TextInput;
