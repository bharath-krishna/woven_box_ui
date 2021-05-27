import firebase from "../../utils/firebaseClient";
import { Base64 } from "js-base64";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  let basic_token = req.headers.authorization;
  basic_token = basic_token.replace("Basic ", "");
  const [email, password] = Base64.decode(basic_token).split(":");
  let userCreds;
  if (email && password) {
    try {
      userCreds = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
  } else {
    return res.status(200).json({
      error: "Please provide valid email and password",
    });
  }
  if (!userCreds) {
    return res.status(200).json({
      error: "error",
    });
  }
  return res.status(200).json({
    accessToken: userCreds.user.za,
    refreshToken: userCreds.user.refreshToken,
  });
};
