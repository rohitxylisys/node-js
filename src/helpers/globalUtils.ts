const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "R0t015451/encrypt";
export class GlobalUtils {
  public static encryptPassword = async (password: string) => {
    const encryptedPassword = await bcrypt.hash(
      myPlaintextPassword,
      saltRounds
    );
    return encryptedPassword;
  };
}
