import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  name: string;
  githubUsername: string;
  file: File | null;
}

interface FormErrors {
  email?: string;
  name?: string;
  githubUsername?: string;
  file?: string;
}

function Form() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate(); // React Router'un navigate fonksiyonu

  return (
    <>
    <h1 className="mt-5 fw-bold">Welcome to<br></br>Conferance Ticket Generator App</h1>
    <h5 className="fw-light mt-3 text-gray" >Secure your spot at next year's biggest coding conferance.</h5>   
    <div className="form-area">
      <Formik<FormValues>
      initialValues={{
        email: "",
        name: "",
        githubUsername: "",
        file: null,
      }}
      validate={(values) => {
        const errors: FormErrors = {};

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.name) {
          errors.name = "Name is required";
        }

        if (!values.githubUsername) {
          errors.githubUsername = "GitHub username is required";
        }

        if (!values.file) {
          errors.file = "File is required";
        } else {
          const allowedFormats = ["image/jpeg", "image/png"];
          const maxSizeInKB = 500;

          if (!allowedFormats.includes(values.file.type)) {
            errors.file = "Only JPG or PNG files are allowed";
          } else if (values.file.size > maxSizeInKB * 1024) {
            errors.file = "File size must not exceed 500KB";
          }
        }

        return errors;
      }}
      onSubmit={(values) => {
        // Verileri yönlendirme ile gönderiyoruz
        navigate("/home", { state: values });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <label className="mb-2">Upload Avatar</label>
          <label className="file-upload-area">
            {values.file ? (
              <div>
                <div className="upload-img mb-3">
                  <img
                    src={previewUrl || ""}
                    alt="Preview"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("file", null);
                    setPreviewUrl(null);
                  }}
                  className="change-img-button"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <input
                  id="file-input"
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("file", file);

                    if (file) {
                      const preview = URL.createObjectURL(file);
                      setPreviewUrl(preview);
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                  hidden
                />
                <div className="upload-icon mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      viewBox="0 0 30 30"
                    >
                      <path
                        fill="#F57463"
                        fillRule="evenodd"
                        d="M21.894 11.252a.264.264 0 0 1-.229-.225c-.368-2.634-2.51-5.924-6.663-5.924-4.465 0-6.3 3.636-6.657 5.928a.264.264 0 0 1-.228.22c-2.95.362-4.945 2.622-4.945 5.729a5.802 5.802 0 0 0 3.423 5.277 6.274 6.274 0 0 0 2.305.468h2.528a.45.45 0 0 0 .45-.45c0-.267-.233-.472-.5-.484a3.077 3.077 0 0 1-2.049-.9 3.123 3.123 0 0 1 0-4.418l3.461-3.462c.147-.146.307-.277.479-.392.076-.05.158-.085.236-.129.1-.054.196-.114.301-.158.1-.04.206-.065.308-.096.092-.027.181-.062.276-.081.191-.039.384-.056.578-.059.011 0 .022-.004.034-.004.01 0 .018.003.027.004.196.002.391.02.584.059.094.019.18.053.271.08.105.031.211.055.313.098.1.042.193.098.288.15.084.046.17.083.25.137.154.103.295.221.428.349.016.014.034.024.049.039l3.463 3.463a3.124 3.124 0 0 1 0 4.42c-.558.56-1.284.86-2.05.897-.266.013-.497.219-.497.486 0 .249.202.451.451.451h2.512c.435 0 1.314-.06 2.344-.473a5.794 5.794 0 0 0 3.394-5.272c0-3.104-1.991-5.363-4.935-5.728Z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="#F57463"
                        fillRule="evenodd"
                        d="M18.464 19.62a.936.936 0 0 0 .663-1.6l-3.464-3.464a.938.938 0 0 0-.664-.275l-.014.002a.932.932 0 0 0-.65.274l-3.462 3.462a.936.936 0 1 0 1.326 1.325l1.864-1.862v6.479a.937.937 0 1 0 1.875 0v-6.48l1.864 1.863a.93.93 0 0 0 .662.275Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                <p className="text-gray">Drag and drop or click to upload</p>
              </div>
            )}
          </label>
          {errors.file && touched.file ? (
              <span className="text-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
                  />
                  <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.004 10.462V7.596M8 5.569v-.042"
                  />
                </svg>
                {errors.file}
              </span>
            ) : (
              <span className="info-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="#D1D0D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
                  />
                  <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                  <path
                    stroke="#D1D0D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.004 10.462V7.596M8 5.569v-.042"
                  />
                </svg>
                Upload your photo (JPG or PNG, max size:500KB).
              </span>
            )}

          <label className="mt-4 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Your Full Name"
          />
          {errors.name && touched.name && (
              <span className="text-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
                  />
                  <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.004 10.462V7.596M8 5.569v-.042"
                  />
                </svg>
                {errors.name}
              </span>
            )}

          <label className="mt-4 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="example@gmail.com"
          />
          {errors.email && touched.email && (
              <span className="text-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
                  />
                  <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.004 10.462V7.596M8 5.569v-.042"
                  />
                </svg>
                {errors.email}
              </span>
            )}

          <label className="mt-4 mb-2">GitHub Username</label>
          <input
            type="text"
            name="githubUsername"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.githubUsername}
            placeholder="@yourusername"
          />
          {errors.githubUsername && touched.githubUsername && (
              <span className="text-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
                  />
                  <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                  <path
                    stroke="#f57463"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.004 10.462V7.596M8 5.569v-.042"
                  />
                </svg>
                {errors.githubUsername}
              </span>
            )}

          <button
            className="submit-button mt-4"
            type="submit"
            disabled={isSubmitting}
          >
            Generate My Ticket
          </button>
        </form>
      )}
    </Formik>
      </div>
    
    </>
  );
}

export default Form;
