"use server"

import { redirect } from 'next/navigation';
import { handleOAuthDiscovery } from "../../../lib/authActions";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token");
  let path;

  try {
    await handleOAuthDiscovery({ token });
    path = `/discovery`;
  } catch (error) {
    path = `/login`;
  }
  redirect(path);
}