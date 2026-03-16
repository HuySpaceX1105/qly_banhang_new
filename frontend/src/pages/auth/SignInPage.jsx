import FloatingInput from "../../components/auth/AuthFloatingInput";
import AuthCheckBox from "../../components/auth/AuthCheckBox";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../layouts/auth/AuthLayout";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthLink from "../../components/auth/AuthLink";
import AuthMessage from "../../components/auth/AuthMessage";

function PagesLogin() {
  
  return (
    <AuthLayout>

      <AuthMessage title="Chào mừng trở lại!" note="Đăng nhập vào tài khoản của bạn" titleClass="mb-2" noteClass=" " />

      <form>
        <div className="row">

          <FloatingInput type="email" label="Email" />
          <FloatingInput type="password" label="Mật khẩu"/>

          <AuthCheckBox id="remember" label="Nhớ tài khoản" labelClass="custom-control-label control-label-1" />

          <AuthLink href="/auth/recover-password" text="Quên mật khẩu?" />

        </div>

        <AuthButton text="Đăng nhập" />
        <AuthFooter text="Tạo tài khoản mới" linkText="Đăng ký" href="/auth/sign-up" />

      </form>

    </AuthLayout>
  );
}

export default PagesLogin;