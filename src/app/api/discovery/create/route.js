"use server"

import { redirect } from 'next/navigation';
import { createNewOrganization } from "../../../../lib/authActions";
import { NextResponse } from "next/server";

export async function POST(request) {
    let path, new_organization;
    const  resp = await request.json();

  try {
    new_organization = await createNewOrganization({ organization_name: resp.organization_name });
    return NextResponse.json({ 
        message: '-SUCCESS',
        data: {
            ...new_organization
        }
    }, { status: 200 })
    
  } catch (error) {
    path = '/login';
  }
    redirect(path);
}
