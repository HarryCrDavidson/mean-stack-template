import * as mongoose from "mongoose";

export class Database {
  private db: mongoose.Connection;
  private url: string;
  private database: string;
  private password: string;
  private uri: string;

  constructor(url: string, database: string) {
    this.url = url;
    this.database = database;
    this.password = "64SVhAQsLv1b2rmo";
    this.uri = `mongodb+srv://admin:${this.password}@cluster0-zhz54.mongodb.net/mean-stack-template?retryWrites=true&w=majority`;
  }

  public initConnection() {
    // connect to MongoDB using password
    mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    this.db = mongoose.connection;

    this.db.on("error", () => {
      console.error.bind(console, "connection error...");
      process.exit(1);
    });

    this.db.once("open", () => {
      console.log("mean-stack-template DB Opened");
    });
  }
}
