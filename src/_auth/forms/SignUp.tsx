import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignupValidation } from "@/lib/validation";
import { Link } from "react-router-dom";

export default function SignUp() {
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		}
	});

	// Handler
	/*const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
		try {
			const newUser = true;
		} catch (error) {
			// Manejar todos los errores de la forma que más convenga
		}
	}*/
	/*onSubmit={form.handleSubmit(handleSignup)}*/
	return (
		<Form {...form}>
			<div className="flex-center flex-col sm:w-420">
				<img src="" alt="" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create account</h2>
				<p className="small-medium md:base-regular mt-2 text-light-3">To use snapgram, please enter your details</p>
			</div>
			<form className="mt-4 flex w-full flex-col gap-5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Name</FormLabel>
							<FormControl>
								<Input className="shad-input" placeholder="Enter your name" {...field} />
							</FormControl>
							<FormDescription>
								This is your public name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Username</FormLabel>
							<FormControl>
								<Input className="shad-input" placeholder="Enter your username" {...field} />
							</FormControl>
							<FormDescription>
								This will be your username.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Email</FormLabel>
							<FormControl>
								<Input type="email" className="shad-input" placeholder="Enter your email" {...field} />
							</FormControl>
							<FormDescription>
								This is your email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Password</FormLabel>
							<FormControl>
								<Input type="password" className="shad-input" placeholder="Enter your password" {...field} />
							</FormControl>
							<FormDescription>
								This will be your password.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="shad-button_primary">Submit</Button>

				<p>
					Already have an account?
					<Link to="/sign-in" className="text-small-semibold ml-1 text-primary-500">
						Log in
					</Link>
				</p>
			</form>
		</Form>
	)
}