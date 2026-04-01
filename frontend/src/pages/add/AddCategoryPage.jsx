
import { useState } from "react";
import { addCategoryService } from "../../services/categoryService";

import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddCategoryPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addCategoryService({
                name,
                description
            });

            alert("Thêm danh mục thành công!");

            // reset form
            setName("");
            setDescription("");

        } catch (err) {
            const data = err.response?.data;

            console.log("FULL ERR:", err);
            console.log("RESPONSE:", err.response);
            console.log("DATA:", err.response?.data);
            alert(data?.message || "Thêm danh mục thất bại!");
        }
    }
    return (

        <HomeLayout>

            <FormCard title="Thêm danh mục">

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <InputField label="Tên danh mục *" placeholder="Nhập tên danh mục" required={true} value={name} onChange={(e) => setName(e.target.value)}/>

                        <TextAreaField label="Mô tả" placeholder="Nhập mô tả danh mục " value={description} onChange={(e) => setDescription(e.target.value)}/>

                    </div>

                    <FormButtons submitText="Thêm danh mục" />

                </form>

            </FormCard>

        </HomeLayout>

    );

}