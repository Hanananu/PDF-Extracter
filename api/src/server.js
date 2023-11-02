import app from './app';

const port = process.env.PORT || 3001;

mongoose.connection.once("open", () => {
    console.log("Connected to the database.");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  });