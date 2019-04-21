import * as Sentry from "@sentry/browser";
import config from "./../config.json";

const init = () => {
  Sentry.init({
    dsn: config.sentryDsn
  });
};

export default {
  log: Sentry.captureException,
  init: init
};
