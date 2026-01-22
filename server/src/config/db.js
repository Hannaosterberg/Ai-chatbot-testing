import mongoose from "mongoose";

export async function connectDb(uri) {
  if (!uri) {
    throw new Error("MONGO_URI saknas");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    autoIndex: true,
<<<<<<< HEAD
    dbName: "ai-chatbot",
=======
    dbName: "ai-chatbot"
>>>>>>> 61eef57edd80cff1fae0211fea50935e47a652c9
  });

  return mongoose.connection;
}
