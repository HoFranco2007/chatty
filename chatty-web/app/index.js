import express from 'express';
import cors from 'cors';
import router from '../routes/selector.js'; // Importa el router

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'chrome-extension://modipejfkpbhijihafibdhnnkmnakebi'
  }));
const allowedOrigins = [
    'chrome-extension://modipejfkpbhijihafibdhnnkmnakebi', 
    'http://localhost:3000'
];

// Configura CORS para permitir múltiples orígenes
app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes con orígenes que están en la lista `allowedOrigins`
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

const PORT = process.env.PORT || 3001;

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
