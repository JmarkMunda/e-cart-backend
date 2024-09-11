import express from "express";
import helmet from "helmet";
import productsRouter from "./routers/products";

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.json());
app.use("/api/v1/products", productsRouter);

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "Success sdsd " });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
