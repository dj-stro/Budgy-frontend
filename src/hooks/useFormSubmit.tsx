import { useCallback, type FormEvent } from "react";

/**
 * TForm: The generic type representing the shape of the form data
 */
interface UseFormSubmitProps<TForm> {
  // submitFunction must accept TForm and return a Promise (like the one returned by axios)
  submitFunction: (data: TForm) => Promise<any>;
  onSuccess?: () => void;
  onError?: (message?: string) => void;
  resetForm?: () => void;
}

const useFormSubmit = <TForm extends object>({
  submitFunction,
  onSuccess,
  onError,
  resetForm,
}: UseFormSubmitProps<TForm>) => {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>, formData: TForm) => {
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
