import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
	const isAuthenticated = false;
	
	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<section className="flex flex-1 flex-col items-center justify-center py-10">
						<Outlet />
					</section>
					<img src="/images/side-img.svg" alt="logo" />
				</>
			)}
		</>
	)
}