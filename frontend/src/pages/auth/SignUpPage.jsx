import { useState} from "react";

import FloatingInput from "../../components/auth/AuthFloatingInput";
import AuthCheckBox from "../../components/auth/AuthCheckBox";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../layouts/auth/AuthLayout";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthMessage from "../../components/auth/AuthMessage";

function PagesSignUp() {

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const agree = document.getElementById("agree")?.checked;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;

    if(!email || !name || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }
    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản sử dụng");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setError("");
    alert("Đăng ký thành công");
  }

  return (
    <AuthLayout>

      <AuthMessage title="Tạo tài khoản mới" note="Đăng ký để tiếp tục sử dụng hệ thống." titleClass="mb-2" noteClass=" " />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <FloatingInput id="name" type="text" label="Họ và tên" />
          <FloatingInput id="email" type="email" label="Email" />
          <FloatingInput id="password" type="password" label="Mật khẩu"/>
          <FloatingInput id="confirmPassword" type="password" label="Xác nhận mật khẩu" />

          <AuthCheckBox id="agree" label="Tôi đồng ý với điều khoản sử dụng" col="col-lg-12"/>
        </div>

        
        {error && <p style={{color:"red"}}>{error}</p>}
        <AuthButton text="Đăng ký" />
        <AuthFooter text="Đã có tài khoản?" linkText="Đăng nhập" href="/auth/sign-in" />

      </form>

    </AuthLayout>
  );
}
export default PagesSignUp;