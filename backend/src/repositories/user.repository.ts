import { user, IUser } from "../schemas/user.schema";

export class UserRepository {
  private usr = user;

  findAll() {
    return this.usr.find();
  }

  findByUserId(id) {
    return this.usr.findById(id);
  }

  findByUsername(username) {
    // if string is within username, return it
    return this.usr.find({ username: { $regex: username } });
  }

  findByExactUsername(username: string) {
    return this.usr.findOne({ username: username });
  }

  create(userToCreate: IUser) {
    return this.usr.create(userToCreate);
  }

  deleteByUserId(id: string) {
    // mongoose function to delete doc by id
    return this.usr.findByIdAndRemove(id);
  }

  //   editUserRole(user: IUser) {
  //     // find user by using id then update role field with value in user object passed from controller
  //     return this.usr.findByIdAndUpdate(
  //       { _id: user["_id"] },
  //       { role: user.role }
  //     );
  //   }
}
