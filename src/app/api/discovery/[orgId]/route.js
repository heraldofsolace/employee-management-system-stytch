"use server"

import { redirect } from 'next/navigation';
import { exchangeIntermediateSession } from "../../../../lib/authActions";

export async function GET(req, { params }) {
  let path;
  const { orgId: organization_id } = params;
  try {
     let resp = await exchangeIntermediateSession({ organization_id });
     if (resp.status_code === 200) {
      const { organization_name, organization_slug } = resp.organization
      path = `/${organization_slug}/profile`;
     }
  } catch (error) {
    path = '/login';
  }
  
  redirect(path);

}
