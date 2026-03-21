import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddSupplierPage() {

    return (

        <HomeLayout>

            <FormCard title="Thêm nhà cung cấp">

                <form>

                    <div className="row">

                        <InputField
                            label="Tên nhà cung cấp *"
                            placeholder="Nhập tên nhà cung cấp"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Số điện thoại *"
                            placeholder="Nhập số điện thoại"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Email *"
                            placeholder="Nhập email"
                            required
                            col="col-md-6"
                        />

                        <TextAreaField
                            label="Địa chỉ *"
                            placeholder="Nhập địa chỉ"
                        />

                    </div>

                    <FormButtons submitText="Thêm nhà cung cấp" />

                </form>

            </FormCard>

        </HomeLayout>

    );
}