import UserModel from "../models/user";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function userRepositoryMongoDB() {
  const findByProperty = (params) =>
    UserModel.find(omit(params, "page", "perPage"))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) =>
    UserModel.countDocuments(omit(params, "page", "perPage"));

  const findById = (id) => UserModel.findById(id).select("-password");
  const findByEmail = (email) => UserModel.findOne({ email });

  const add = (userEntity) => {
    const newUser = new UserModel({
      fullname: userEntity.FullName,
      password: userEntity.Password,
      email: userEntity.Email,
      role: userEntity.Role,
      createdAt: userEntity.CreatedAt,
    });

    return newUser.save();
  };

  return {
    findByProperty,
    countAll,
    findById,
    findByEmail,
    add,
  };
}
