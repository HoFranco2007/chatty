import express from 'express';
import cors from 'cors';
import router from '../routes/selector.js'; // Importa el router

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'chrome-extension://your-extension-id'
  }));
  

const PORT = process.env.PORT || 3000;

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
