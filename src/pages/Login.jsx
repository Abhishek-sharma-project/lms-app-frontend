import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message || "Signup Successful");

      // Reset signup fields
      setSignupInput({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }

    setActiveTab("login");

    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
  }, [registerIsSuccess, registerData, registerError]);

  useEffect(() => {
    if (loginIsSuccess) {
      toast.success(loginData?.message || "Login Successful");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [loginIsSuccess, loginData, loginError]);

  return (
    <div className="flex items-center w-full justify-center mt-18">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="cursor-pointer" value="signup">
              Signup
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="login">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input
                    name="name"
                    value={signupInput.name}
                    type="text"
                    placeholder="Enter Your Name"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input
                    name="email"
                    value={signupInput.email}
                    type="email"
                    placeholder="Enter Your Email"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "signup")}
                  />
                </div>
                <div className="grid gap-3 relative">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    value={signupInput.password}
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                  >
                    {showSignupPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="cursor-pointer"
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <Loader2 className="m-2 h-4 w-4 animate-spin">
                      Please wait
                    </Loader2>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login your account here. After Signin, you'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Email</Label>
                  <Input
                    name="email"
                    value={loginInput.email}
                    type="email"
                    placeholder="Enter Your Email"
                    required={true}
                    onChange={(e) => changeInputHandler(e, "login")}
                  />
                </div>
                <div className="grid gap-3 relative">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    value={loginInput.password}
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    required
                    onChange={(e) => changeInputHandler(e, "login")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                  >
                    {showLoginPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="cursor-pointer"
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="m-2 h-4 w-4 animate-spin">
                        Please wait
                      </Loader2>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Login;
