export type ContentType = {
  title: string;
  qrText: string;
  steps: string[];
  url: string;
};

// export type Mode = keyof typeof CONTENT
export type Mode = "signIn" | "remote" | "forgotPassword" | "createAccount";

export const CONTENT: Record<string, ContentType> = {
  signIn: {
    title: "Choose how to sign in",
    url: "https://www.Redline.com/devices",
    qrText:
      "Scan the QR code with your phone or tablet to sign in or create " +
      " a new account Or go to Redstrim.com/ devices and enter code H33DBC",
    steps: [
      "Go to www.Redline.com/devices",
      "Enter your code H33DBC",
      "Then pair your device",
    ],
  },
  forgotPassword: {
    title: "Forgot Password",
    url: "https://www.Redline.com/reset",
    qrText: "Use your phone camera to reset your password.",
    steps: [
      "Go to www.Redline.com/reset",
      "Enter your reset code H33DBC",
      "Set a new password and confirm it",
    ],
  },
  createAccount: {
    title: "Create an account",
    url: "https://www.Redline.com/createaccount",
    qrText:
      "Scan the QR code with your phone or tablet to     sign in or create a new account Or go to Redstrim.com/Createaccount and follow the interactions",
    steps: [
      "Go to www.Redline.com/createaccount",
      "Enter your Email and password",
      "Then follow the instructions",
    ],
  },
};
