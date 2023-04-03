const mongoose = require("mongoose");

export const dbConnect = async () => {
  return mongoose
    .connect(
      "mongodb+srv://kevingrand:grand254@grnd.ajlox.mongodb.net/sop_db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
      }
    )
    .then(() => console.log("DB connection successful!"));
};
