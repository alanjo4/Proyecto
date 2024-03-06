import { Outlet } from "react-router-dom";

import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";

export default function RootLayout() {
	return(
		<div className="w-full md:flex">
			<Topbar />
			<LeftSidebar />

			<section className="flex h-full flex-1">
				<Outlet />
			</section>

			<Bottombar />
		</div>
	)
}