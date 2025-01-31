"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function Painel() {
  const user = useCurrentUser();

  return <div>{JSON.stringify(user)}</div>;
}
