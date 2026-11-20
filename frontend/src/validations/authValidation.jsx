import * as Yup from "yup";

const loginValidation = Yup.object({
  email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(8, "Mật khẩu tối thiểu 8 ký tự").max(50, "Mật khẩu tối đa 50 ký tự"),
});

const registerValidation = Yup.object({
  userName: Yup.string().required("Vui lòng nhập họ tên").min(3, "Họ tên tối thiểu 3 ký tự").max(50, "Họ tên tối đa 50 ký tự"),
  email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(8, "Mật khẩu tối thiểu 8 ký tự").max(50, "Mật khẩu tối đa 50 ký tự"),
  confirmPassword: Yup.string().required("Vui lòng xác nhận mật khẩu").oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
});

export { 
  loginValidation, 
  registerValidation 
};