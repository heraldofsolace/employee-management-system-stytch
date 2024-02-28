"use server"

import { B2BClient } from 'stytch';
import { errorjsonParser } from '../lib/helpers';
import { 
  setIntermediateSession, 
  clearIntermediateSession, 
  getSession, 
  getIntermediateSession, 
  setSession, 
  clearSession 
} from '../lib/sessionService'

const client = new B2BClient({
  project_id: process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID,
  secret: process.env.NEXT_PUBLIC_STYTCH_SECRET,
});

export const handleOAuthDiscovery = async ({ token }) => {
  let response;
  try {
    response = await client.oauth.discovery.authenticate({ discovery_oauth_token: token });
    setIntermediateSession({
      value: response.intermediate_session_token
    })
  } catch (err) {
    let error_message = errorjsonParser(err.message)
    throw new Error(error_message)
  }
  return {
    token: response.intermediate_session_token,
  };
}

export const createNewOrganization = async ({ organization_name }) => {
  let response;

  try {

    let { name, value } = getIntermediateSession();
    response = await client.discovery.organizations.create(
      {
        intermediate_session_token: value,
        organization_name,
        organization_slug: organization_name
      }
    )
    if (response.session_jwt) {
      clearIntermediateSession();
      setSession({
        name: 'session',
        value: response.session_jwt
      })
    }

    return {
      completed: true,
    };

  } catch (err) {
    let error_message = errorjsonParser(err.message)
    throw new Error(error_message)

  }
}

export const getOrganizations = async () => {
  let response;

  try {

    let session_token = getIntermediateSession();
    let session_jwt = getSession();
    if (!session_token.value) {
      response = await client.discovery.organizations.list(
        {
          session_jwt: session_jwt.value
        }
      )
    } else {
      response = await client.discovery.organizations.list(
        {
          intermediate_session_token: session_token.value
        }
      )
    }

  } catch (err) {
    let error_message = errorjsonParser(err.message)
    throw new Error(error_message)
  }
  return {
    discovered_organizations: response.discovered_organizations
  };
}

export const exchangeIntermediateSession = async ({ organization_id }) => {
  let response;
  try {

    let session_token = getIntermediateSession();
    response = await client.discovery.intermediateSessions.exchange(
      {
        intermediate_session_token: session_token.value,
        organization_id
      }
    )
    setSession({ name: 'session', value: response.session_jwt });
    clearIntermediateSession();
    return response;

  } catch (err) {
    let error_message = errorjsonParser(err.message)
    throw new Error(error_message)

  }
}

export const authenticateJwtSession = async () => {

  let response, session_details, valid_session;

  try {
    let session = getSession();

    let session_jwt = session?.value;
    response = await client.sessions.authenticate({ session_jwt, session_duration_minutes: 60 });

    return response;

  } catch (err) {
    let error_message = errorjsonParser(err.message)
    throw new Error(error_message)
  }
}

export const revokeStytchSession = async ({ user_id }) => {

  let response;
  const params = { user_id };

  try {
    response = await client.sessions.revoke({ session_token })

  } catch (err) {
    throw new Error(err.message)
  }

  return response;
}
