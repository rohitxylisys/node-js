const User = require("../../../models").User;

export class UserUtils {
  public static insertUserDetails(data: any) {
    const result = User.create(data);
    return result;
  }

  public static findUser = async (condition: any) => {
    try {
      const result = await User.findOne({
        where: condition,
        raw: true,
        plain: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  public static getTokenFiled = async (data: any) => {
    delete data.password;
    delete data.token;
    return data;
  };
  

  public static updateDetails = async (data: any, condition: any) => {
    const result = await User.update(data, {
      where: condition,
      returning: true,
      plain: true,
      raw: true,
    });
    return result;
  };
}
