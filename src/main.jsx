import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "@/app/store";
import { Toaster } from "sonner";
import Loading from "./components/Loading";
import { ThemeProvide } from "./components/ThemeProvide";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <ThemeProvide>
        <Loading>
          <App />
          <Toaster></Toaster>
        </Loading>
      </ThemeProvide>
    </Provider>
  </StrictMode>
);
