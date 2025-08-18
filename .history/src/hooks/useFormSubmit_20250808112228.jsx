import { useCallback  } from "react";

const useFormSubmit = ({ submitFunction, onSuccess, onError, resetForm}) => {
    const handleSubmit = useCallback(
        (e, formData) => {
            e.preventDefault();

            submitFunction(formData)
            .then(() => {
                onSuccess?.();
                resetForm?.();
            })
            .catch((err) => {
                console.error("Submit error: ", err.response?.data || err.message);
                onError?.(err);
            });
        },
        [submitFunction, onSuccess, onError, resetForm]
    );

    return { handleSubmit };
};

export default useFormSubmit;