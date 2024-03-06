import AuthLayout from "@/app/auth/authLayout";
import Login from "@/app/auth/login/Login";

function Home() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export default Home;
