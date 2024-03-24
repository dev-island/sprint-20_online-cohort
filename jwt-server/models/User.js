const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

/* 
Note that here in this schema we did not add any field for password unlike we do normally.
This is because passport-local-mongoose doesn’t need it.
Normally we would add methods to hash passwords or to compare passwords but we don't have to because passport-local-mongoose will do all that for us.
*/

UserSchema.plugin(passportLocalMongoose);

https: module.exports = mongoose.model("User", UserSchema);
