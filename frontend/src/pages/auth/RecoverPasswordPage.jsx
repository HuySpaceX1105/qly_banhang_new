import FloatingInput from "../../components/auth/AuthFloatingInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../layouts/auth/AuthLayout";
import AuthMessage from "../../components/auth/AuthMessage";
import AuthFooter from "../../components/auth/AuthFooter";

function PagesRecoverPassword() {
  return (
    <AuthLayout>
      
      <AuthMessage title="Khôi phục mật khẩu" note="Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu." titleClass="mb-2" noteClass=" "/>

      <form>
        <div className="row">
          <FloatingInput type="email" label="Email" />
        </div>

        <AuthButton text="Khôi phục mật khẩu" />
        <AuthFooter text="Đã có tài khoản?" linkText="Đăng nhập" href="/auth/" />
      </form>

    </AuthLayout>
  );
}

export default PagesRecoverPassword;
