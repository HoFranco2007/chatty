import express from 'express';
import cors from 'cors';
import router from '../routes/selector.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json({ limit: '10mb' })); 

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
