export function signInRequest(email, password) {
  return { type: '@auth/SIGN_IN_REQUEST', payload: { email, password } };
}

export function signInSuccess(id, name, token) {
  return { type: '@auth/SIGN_IN_SUCCESS', payload: { id, name, token } };
}

export function signInFailure() {
  return { type: '@auth/SIGN_IN_FAILURE' };
}

export function signOut() {
  return { type: '@auth/SIGN_OUT' };
}
