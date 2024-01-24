
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import Home from "./_root/pages/Home";
import "./globals.css";

// TW no tiene HRM, o sea que ojo, ahí, cuando cambiena algo en el .config.js de tailwind, hay que TIRAR EL SERVER Y VOLVER A CORRERLO
export default function App() {
	return(
			<main className="flex h-screen">
				<Routes>
					{/**Public routes */}
					<Route element={<AuthLayout />}>
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
					</Route>

					<Route element={<RootLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</main>
	)
}