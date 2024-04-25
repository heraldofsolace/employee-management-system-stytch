"use server"

const axios = require('axios');

const STYTCH_SECRET = process.env.NEXT_PUBLIC_STYTCH_SECRET;
const STYTCH_PROJECT_ID =  process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID;

export const stytchFingerprintLookup = async ({ telemetry_id }) => {
  try {
    const response = await axios.get(`https://telemetry.stytch.com/v1/fingerprint/lookup`, {
      params: {
        'telemetry_id': telemetry_id
      },
      auth: {
        username: STYTCH_PROJECT_ID,
        password: STYTCH_SECRET
      }
    })
    return response.data;
  } catch (err) {
    console.error(err)
    throw new Error(err.message)
  }
}