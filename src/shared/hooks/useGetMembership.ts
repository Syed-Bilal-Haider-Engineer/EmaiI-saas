"use client";
import { getMembership } from "@/app/actions/get.membership";
import { useEffect, useState, useCallback } from "react";

const useGetMembership = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetMembership = useCallback(async () => {
    try {
      const res = await getMembership();
    setData(res);
    } catch (error) {
      console.error("Error fetching membership:", error);
      setError("Failed to fetch membership.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetMembership();
  }, [handleGetMembership]);

  return { data, loading, error };
};

export default useGetMembership;
