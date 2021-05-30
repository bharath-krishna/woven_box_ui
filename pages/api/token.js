import firebase from "../../utils/firebaseClient";
import { Base64 } from "js-base64";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!req.headers.authorization) {
    errorMsg = { error: "Please provide valid credentials" };
    console.log(errorMsg);
    return res.status(400).json(errorMsg);
  }

  let basic_token = req.headers.authorization;
  basic_token = basic_token.replace("Basic ", "");
  const [email, password] = Base64.decode(basic_token).split(":");

  if (!email.match("[a-zA-Z0-9.]+@[a-zA-Z0-9.]+")) {
    return res
      .status(400)
      .json({ error: "The email address is badly formatted." });
  }

  let userCreds;
  if (email && password) {
    try {
      userCreds = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
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
