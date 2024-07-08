// Define a type for the ZeroBounce API response
interface ZeroBounceResponse {
  address: string;
  status: string;
  sub_status?: string;
  account?: string;
  domain?: string;
  disposable?: boolean;
  toxic?: boolean;
  source?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  age?: string;
  ip_address?: string;
  error?: string;
  error_message?: string;
}

const baseUrl = "https://api.zerobounce.net/v2";

export const validateEmail = async ({
    email,
  }: {
    email: string;
  }): Promise<ZeroBounceResponse> => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  if (!apiKey) {
    throw new Error("ZEROBOUNCE_API_KEY is not defined in environment variables.");
  }

  const uri = `${baseUrl}/validate?api_key=${apiKey}&email=${email}`;

  try {
    const response = await fetch(uri, { method: "GET" });

    if (!response.ok) {
      throw new Error(`ZeroBounce API returned HTTP status ${response.status}`);
    }

    const data: ZeroBounceResponse = await response.json();

    if (data.error) {
      throw new Error(`ZeroBounce API error: ${data.error_message || data.error}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching ZeroBounce API:", error);
    throw error;
  }
};
