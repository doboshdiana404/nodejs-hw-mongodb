// import express from 'express';
// import dotenv from 'dotenv';
// import pino from 'pino-http';
// import cors from 'cors';
// import Contact from './models/contact.js';
// dotenv.config();
// export function setupServer() {
//   const app = express();
//   const PORT = process.env.PORT || 3000;

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );
//   app.use(cors());
//   app.get('/contacts', async (req, res) => {
//     try {
//       const contacts = await Contact.find();
//       res.status(200).json({
//         status: 200,
//         message: 'Successfully found contacts!',
//         data: contacts,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: 500,
//         message: 'Server error',
//         error: error.message,
//       });
//     }
//   });
//   app.get('/contacts/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const contact = await Contact.findById(id);
//       if (!contact) {
//         return res.status(404).json({
//           status: 404,
//           message: 'Contact not found',
//           data: null,
//         });
//       }
//       res.status(200).json({
//         status: 200,
//         message: 'Successfully found contact!',
//         data: contact,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: 500,
//         message: 'Server error',
//         error: error.message,
//       });
//     }
//   });
//   app.use((req, res, next) => {
//     res.status(404).send("Sorry can't find that!");
//   });
//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {
  getAllContacts,
  getContactById,
} from './controllers/contactController.js';

export function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:id', getContactById);

  app.use((req, res) => {
    res
      .status(404)
      .json({ status: 404, message: "Sorry, can't find that!", data: null });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
