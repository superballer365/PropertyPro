import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Initialize from "./Initialize";
import AuthorizationContextProvider from "./Contexts/AuthorizationContext";

Initialize();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className="mainContainer">
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
