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
    <div
      className="min-h-screen w-full flex items-center justify-center 
                  bg-gradient-to-br from-gray-100 via-white to-gray-200 
                  dark:from-[#0d0d0d] dark:via-[#0f0f0f] dark:to-[#0a0a0a] pb-10 md:pb-0 mt-4"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* LEFT SECTION */}
        <div
          className="
    flex flex-col justify-center
    min-h-[310px]
    sm:min-h-[320px]
    md:min-h-[340px]
    lg:min-h-[360px]
  "
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-black dark:text-white">Code</span>
            <span className="text-blue-600">Stack</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Build skills with interactive courses, real projects, and guided
            learning. Sign in to continue your journey.
          </p>

          <img
            src="loginpage.png"
            alt="Learning illustration"
            className="mt-8 w-[450px] opacity-90 hidden md:block -translate-y-2"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center items-center -mt-20 md:-mt-0">
          <div className="w-full max-w-sm">
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
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
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
                      Login your account here. After Signin, you'll be logged
                      in.
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
      </div>
    </div>
  );
};
export default Login;
