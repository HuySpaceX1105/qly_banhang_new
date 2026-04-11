import { useEffect, useState } from "react";
import { getRoleListService } from "../../services/roleService";
import { addUserService } from "../../services/userService";

import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import MultiSelectField from "../../components/addComponent/MultiSelectField";
import FormButtons from "../../components/addComponent/FormButtons";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddUserPage() {

    const status = [
        { value: 1, label: "Hoạt động" },
        { value: 0, label: "Bị khóa" }
    ];

    const [roles, setRoles] = useState([]);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {
            await addUserService(username, email, fullName, selectedRoles, selectedStatus);
            alert("Thêm người dùng thành công!");
        } catch (err) {
            const data = err.response?.data;
            alert(data?.message || "Thêm người dùng thất bại!");
        }
    };

    useEffect(() => {
        getRoleListService().then((result) => {
            const roleOptions = result.map(role => ({
                value: role.roleId,
                label: role.name
            }));
            console.log(roleOptions);
            setRoles(roleOptions);
        });
    }, []);

    return (

        <HomeLayout>

            <FormCard title="Thêm người dùng">

                <form onSubmit={handleAddUser}>

                    <div className="row">

                        <InputField
                            label="Username *"
                            placeholder="Nhập username"
                            required
                            col="col-md-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <InputField
                            label="Email *"
                            placeholder="Nhập email"
                            required
                            col="col-md-6"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputField
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            col="col-md-6"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <SelectField
                            label="Trạng thái"
                            options={status}
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            col="col-md-6"
                        />

                        <MultiSelectField
                            label="Vai trò"
                            options={roles}
                            value={selectedRoles}
                            onChange={setSelectedRoles}
                            isMulti={true}
                        />
                    </div>

                    <FormButtons submitText="Thêm người dùng" />

                </form>

            </FormCard>

        </HomeLayout>

    );
}