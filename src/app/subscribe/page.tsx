// Ensure correct import if using TypeScript, or remove if JavaScript
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";// Assuming subscribe function is imported from your API
import { subscribe } from "../actions/add.subscribe";

export const Page = () => {
  const [value, setValue] = useState(""); // State for email input value
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Get username from query params using useSearchParams
  const searchParams = useSearchParams();
  const username: string = searchParams.get("username")!;

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true

    try {
      // Call subscribe function with email and username
      const res = await subscribe({ email: value, username });

      setLoading(false); // Set loading state back to false after API call

      if (res.error) {
        toast.error(res.error); // Show error toast if there's an error
      } else {
        toast.success("You are successfully subscribed!"); // Show success toast on successful subscription
      }

      setValue(""); // Clear email input value after submission
    } catch (error) {
      console.error("Error subscribing:", error); // Log any errors to console
      toast.error("Failed to subscribe. Please try again later."); // Show generic error toast on API call failure
      setLoading(false); // Set loading state back to false on error
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-7xl pb-8 capitalize">{username} Newsletter</h1>
      </div>
      <form
        className="flex w-full max-w-md border rounded overflow-hidden"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          name="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-4 w-full text-gray-700 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 bg-blue-500 text-white font-bold py-4 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Page;
