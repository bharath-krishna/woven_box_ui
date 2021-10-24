import initAuth from "../../utils/initAuth";
import { setAuthCookies } from "../../utils/NextFirebaseAuth";

initAuth();

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {}
  return res.status(200).json({ success: true });
};

export default handler;
