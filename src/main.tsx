import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</QueryProvider>
		</BrowserRouter>
	</React.StrictMode>
);