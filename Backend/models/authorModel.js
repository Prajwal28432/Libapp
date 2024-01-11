const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authorSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    phone_no: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
  }
);

authorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

authorSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
