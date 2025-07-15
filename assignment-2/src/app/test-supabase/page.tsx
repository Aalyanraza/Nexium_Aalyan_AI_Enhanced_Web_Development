'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabasePage() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("summaries").select("*");
      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Supabase Connection Test</h1>

      {error && <p className="text-red-500">❌ Error: {error}</p>}
      {data ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
