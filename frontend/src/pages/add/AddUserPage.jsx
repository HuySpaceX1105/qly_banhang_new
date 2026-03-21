import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddUserPage() {

    const status = [
        "Hoạt động",
        "Bị khóa"
    ];

    const roles = [
        "Admin",
        "Nhân viên",
        "Quản lý"
    ];

    return (

        <HomeLayout>

            <FormCard title="Thêm người dùng">

                <form>

                    <div className="row">

                        <InputField
                            label="Username *"
                            placeholder="Nhập username"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Email *"
                            placeholder="Nhập email"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Mật khẩu *"
                            placeholder="Nhập mật khẩu"
                            type="password"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Xác nhận mật khẩu *"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            required
                            col="col-md-6"
                        />

                        <InputField
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            col="col-md-6"
                        />

                        <SelectField
                            label="Vai trò"
                            options={roles}
                            col="col-md-6"
                        />

                        <SelectField
                            label="Trạng thái"
                            options={status}
                            col="col-md-6"
                        />

                    </div>

                    <FormButtons submitText="Thêm người dùng" />

                </form>

            </FormCard>

        </HomeLayout>

    );
}