import { cookies } from 'next/headers';

const setSession = ({ name, value }) => {
    cookies().set({
        name,
        value,
        httpOnly: true,
        path: '/',
    })
}

const clearSession = () => {
    cookies().delete({ 
        name:'session' 
    })
}

const clearIntermediateSession = () => {
    cookies().delete({
        name: "intermediate_session_token"
    })
}

const setIntermediateSession = ({ value }) => {
    cookies().set({
        name: "intermediate_session_token",
        value,
        httpOnly: true,
        path: '/',
    })
}

const getIntermediateSession = () => {
    return cookies().get({
        name: "intermediate_session_token"
    })
}

const getSession = () => {
    return cookies().get({
        name: "session"
    })
}

export {
    setSession, 
    clearSession, 
    setIntermediateSession, 
    getIntermediateSession, 
    getSession, 
    clearIntermediateSession
};
