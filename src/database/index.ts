import mongoose from "mongoose";

const connectDatabase = async (mongoUrl: string) => {
  await mongoose.connect(mongoUrl, { dbName: "socialNetwork" });

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });
};

export default connectDatabase;
