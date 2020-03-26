export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(authid){
  return {
    type: SET_AUTHED_USER,
    authid,
  }
}
