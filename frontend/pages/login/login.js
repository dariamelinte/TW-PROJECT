import LoginForm from '../../components/forms/loginForm.js';
import { getCookie } from '../../utils/cookie.js';
import { COOKIE_NAME } from '../../utils/constants.js';
import { isJwtExpired } from '../../utils/jwt.js';
import Routes from '../../utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

// If the user is already logged in, it should not be able to access login
if (jwt && !isJwtExpired(jwt)) {
  window.location.href = Routes.home.path();
}

document.body.appendChild(LoginForm());