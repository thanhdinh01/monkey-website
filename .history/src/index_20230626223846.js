import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/configStore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Swiper>
      <React.StrictMode>
        <GlobalStyles></GlobalStyles>
        <BrowserRouter>
          <App />
          <ToastContainer limit={5}></ToastContainer>
        </BrowserRouter>
      </React.StrictMode>
    </Swiper>
  </Provider>
);

reportWebVitals();
