const User = require("../../../models").User;

export class UserUtils {
  public static createUser(data: any) {
    const result = User.create(data);
    return result;
  }
  public static findUser(condition: any) {
    const result = User.findOne({ where: condition });
    return result;
  }
}
