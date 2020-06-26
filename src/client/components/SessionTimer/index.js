import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { setUserDataPropType } from "../../commonPropTypes";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import { logEvent } from "../../utils";

let timerId = null;
const TIMEOUT_KEY = "timeout";

function SessionTimer(props) {
  const TIMEOUT_MS = 30 * 60 * 1000;
  const history = useHistory();
  const { action, setUserData } = props;

  function timeOutUser() {
    clearAuthToken();
    logEvent("RetroCerts", "SessionTimeout", history.location.pathname);
    history.push(routes.retroCertsAuth);
    setUserData({
      status: AUTH_STRINGS.statusCode.sessionTimedOut,
    });
  }

  function startOrUpdate() {
    // If the user is restoring a session (reopening a tab) after
    // more than 30min, log them out.
    if (sessionStorage.getItem(TIMEOUT_KEY)) {
      const timeoutTime = sessionStorage.getItem(TIMEOUT_KEY);
      if (Date.now() > timeoutTime) {
        timeOutUser();
        return;
      }
    }

    clear();
    timerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        timeOutUser();
      }
    }, TIMEOUT_MS);
    sessionStorage.setItem(TIMEOUT_KEY, Date.now() + TIMEOUT_MS);
  }

  function clear() {
    clearTimeout(timerId);
    timerId = null;
    sessionStorage.removeItem(TIMEOUT_KEY);
  }

  if (action === "startOrUpdate") {
    startOrUpdate();
  } else if (action === "clear") {
    clear();
  }

  // No HTML to render.
  return false;
}

SessionTimer.propTypes = {
  action: PropTypes.string.isRequired,
  setUserData: setUserDataPropType.isRequired,
};

export function clearAuthToken() {
  sessionStorage.removeItem(AUTH_STRINGS.authToken);
  sessionStorage.removeItem(TIMEOUT_KEY);
}

SessionTimer.getTimerIdForTest = function () {
  return timerId;
};

export default SessionTimer;
