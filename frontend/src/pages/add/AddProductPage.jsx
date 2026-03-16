import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import FileField from "../../components/addComponent/FileField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddProductPage() {

    const productTypes = ["Standard", "Combo", "Digital", "Service"];

    const categories = ["Beauty", "Grocery", "Food", "Furniture", "Shoes", "Frames", "Jewellery"];

    return (
        <HomeLayout>
            <FormCard title="Add Product">

            <form>

                <div className="row">

                <SelectField label="Product Type *" options={productTypes} />
                <InputField label="Name *" placeholder="Enter Name" required col="col-md-6"/>
                <InputField label="Code *"  placeholder="Enter Code" required col="col-md-6"/>

                <SelectField label="Category *" options={categories} col="col-md-6"/>

                <InputField label="Cost *" placeholder="Enter Cost" col="col-md-6"/>
                <InputField label="Price *" placeholder="Enter Price" col="col-md-6"/>
                <InputField label="Quantity *" placeholder="Enter Quantity"/>

                <FileField label="Image" />

                <TextAreaField label="Description / Product Details" />

                </div>

                <FormButtons submitText="Add Product" />

            </form>

            </FormCard>
        </HomeLayout>
    );
}
