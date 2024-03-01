function serverStartupLog() {
  const port = process.env.PORT;
  switch (true) {
    case process.env.status400 == "true":
      console.log(`Server started with mock return error: status400`);
      break;
    case process.env.status401 == "true":
      console.log(`Server started with mock return error: status401`);
      break;
    case process.env.status503 == "true":
      console.log(`Server started with mock return error: status401`);
      break;
    case process.env.dberror == "true":
      console.log(`Server started with mock return error: dberror/500`);
      break;
    default:
      console.log(`Server started without mock return errors`);
  }
  console.log(`Server listening on ${port}`);
}
module.exports = serverStartupLog;
