
// pages/index.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // redirect / → /home
  }, [router]);

  return null;
}
