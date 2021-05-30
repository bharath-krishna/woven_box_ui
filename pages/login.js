import React from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import {
  authAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "../components/FullPageLoader";

function Auth() {
  return <FirebaseAuth />;
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: authAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: authAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(Auth);
