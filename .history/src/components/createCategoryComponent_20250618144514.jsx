import { useState } from "react"

const CreateCategory = () => {

    const [formData, setFormData] = useState({
        name:"",
        type:"EXPENSE"
    });



    return (
        <div className="container mt-4">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Category Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>
    );



}