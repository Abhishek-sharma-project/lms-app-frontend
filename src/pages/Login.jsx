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
import { useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [registerUser, { isLoading: registerIsLoading }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: loginIsLoading }] = useLoginUserMutation();

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
    try {
      const inputData = type === "signup" ? signupInput : loginInput;
      const action = type === "signup" ? registerUser : loginUser;

      const res = await action(inputData).unwrap();

      if (type === "signup") {
        toast.success(res?.message);
        setSignupInput({ name: "", email: "", password: "" });
        setActiveTab("login");
      } else {
        toast.success(res?.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

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
                    <>
                      <Loader2 className="m-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
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
                      <Loader2 className="m-2 h-4 w-4 animate-spin" />
                      Please wait
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
