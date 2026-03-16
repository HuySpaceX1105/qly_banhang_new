import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import FileField from "../../components/addComponent/FileField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddCategoryPage() {

    const categories = [
        "Beauty",
        "Grocery",
        "Food",
        "Furniture",
        "Shoes",
        "Frames",
        "Jewellery"
    ];

    return (
        <HomeLayout>   
            <FormCard title="Add Category">
                <form action="page-list-category.html" data-toggle="validator">

                    <div className="row">

                    <FileField label="Image" />

                    <InputField label="Product Name *" placeholder="Enter Product Name" required={true}/>

                    <SelectField label="Category *" options={categories} />

                    <InputField label="Code *" placeholder="Enter Code" required={true}/>

                    </div>

                    <FormButtons submitText="Add Category" />

                </form>
            </FormCard>
        </HomeLayout>
    );
}