import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddCategoryPage() {

    return (

        <HomeLayout>

            <FormCard title="Thêm danh mục">

                <form>

                    <div className="row">

                        <InputField
                            label="Tên danh mục *"
                            placeholder="Nhập tên danh mục"
                            required={true}
                        />

                        <TextAreaField
                            label="Mô tả"
                            placeholder="Nhập mô tả danh mục"
                        />

                    </div>

                    <FormButtons submitText="Thêm danh mục" />

                </form>

            </FormCard>

        </HomeLayout>

    );

}