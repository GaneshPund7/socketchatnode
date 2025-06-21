const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role",
          
        },
        deletedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true
    }
)

userSchema.index(
    { email: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
  );
  userSchema.index(
    { mobile: 1 },
    { unique: true, partialFilterExpression: { deletedAt: null } }
  );
  
  userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  userSchema.pre("findOneAndUpdate", async function (next) {
    const user = this;
    if (user._update.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        user._update.password = await bcrypt.hash(user._update.password, salt);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
  
  userSchema.pre(/^find|^count/i, function (next) {
    this.where({ deletedAt: null });
    next();
  });
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };


module.exports = mongoose.model("user", userSchema)