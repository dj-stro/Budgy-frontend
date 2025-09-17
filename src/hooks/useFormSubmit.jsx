import { useCallback } from "react";

const useFormSubmit = ({ submitFunction, onSuccess, onError, resetForm }) => {
  const handleSubmit = useCallback(
    (e, formData) => {
      e.preventDefault();

      submitFunction(formData)
        .then(() => {
          onSuccess?.();
          resetForm?.();
        })
        .catch((err) => {
          let message = "Something went wrong!";

          if (err.response && err.response.data) {
            if (typeof err.response.data === "string") {
              message = err.response.data;
            } else if (err.response.data.message) {
              message = err.response.data.message;
            }
          } else if (err.message) {
            message = err.message;
          }

          console.error("Submit error:", message);
          onError?.(message);
        });
    },
    [submitFunction, onSuccess, onError, resetForm]
  );

  return { handleSubmit };
};

export default useFormSubmit;
