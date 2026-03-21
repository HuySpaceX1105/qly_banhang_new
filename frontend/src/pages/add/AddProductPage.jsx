import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import FileField from "../../components/addComponent/FileField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddProductPage() {

    const categories = [
        "Beauty",
        "Grocery",
        "Food",
        "Furniture",
        "Shoes",
        "Frames",
        "Jewellery"
    ];

    const units = [
        "Cái",
        "Hộp",
        "Kg",
        "Chai",
        "Gói"
    ];

    const status = [
        "Đang bán",
        "Ngừng bán"
    ];

    return (

        <HomeLayout>

            <FormCard title="Thêm sản phẩm">

                <form>

                    <div className="row">

                        <InputField
                            label="SKU *"
                            placeholder="Nhập mã sản phẩm"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Tên sản phẩm *"
                            placeholder="Nhập tên sản phẩm"
                            required
                            col="col-md-6"
                        />

                        <SelectField
                            label="Loại sản phẩm *"
                            options={categories}
                            col="col-md-6"
                        />

                        <SelectField
                            label="Đơn vị *"
                            options={units}
                            col="col-md-6"
                        />

                        <InputField
                            label="Giá bán"
                            placeholder="Nhập giá bán"
                            col="col-md-6"
                        />

                        <SelectField
                            label="Trạng thái"
                            options={status}
                            col="col-md-6"
                        />

                        <FileField label="Ảnh sản phẩm" />

                        <TextAreaField
                            label="Mô tả sản phẩm"
                            placeholder="Nhập mô tả sản phẩm"
                        />

                    </div>

                    <FormButtons submitText="Thêm sản phẩm" />

                </form>

            </FormCard>

        </HomeLayout>

    );
}