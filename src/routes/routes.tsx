import About from "@/product/cruise/about/About";
import Index from "@/product/cruise/index/Index";
import { PaySuccess } from "rd-component";
import "rd-component/dist/style.css";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/product/pay/success",
        element: <PaySuccess />
    },
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/about",
        element: <About />
    }
]);

export default routes;