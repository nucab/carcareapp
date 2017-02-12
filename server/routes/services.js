import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import validateInput from '../shared/validations/addService';

import User from '../models/user';
import Services from '../models/services';

let app = express();
let router = express.Router();

router
  .post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if(isValid) {
      const { serviceType, brandName, marking, remarks, replacementDate } = req.body;
      new Services(
        {
          serviceType,
          brandName,
          marking,
          remarks,
          replacementDate
        }).save()
        .then((service) => {
          res.send(service);
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      res.status(400).json(errors);
    }
  })
  .put('/:serviceId', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if(isValid) {

      const { serviceType, brand, serial, remarks, replacementDate } = req.body;
      // console.log(req.body);

      new Services(
        {
          id: req.params.serviceId
        })
        .save({
          ...req.body
        })
        .then(() => {
          res.send({ ...req.body });
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      res.status(400).json(errors);
    }
  })
  .get('/', (req, res) => {
    User.fetchAll()
      .then(function(users) {
        res.send(users.toJSON());
      }).catch(function(err) {
        let message = {
          success: false, message: "An error occurred"
        };
        if(process.env.NODE_ENV !== 'production') message.debug = err;
        res.status(400).send(message);
      });
  })
  .get('/:serviceType', (req, res) => {
    Services
      .where({ serviceType: req.params.serviceType })
      .fetchAll()
      .then(services => {
        res.send(services.toJSON());
      }).catch(err => {
        let message = {
          success: false, message: "An error occurred"
        };
        if(process.env.NODE_ENV !== 'production') message.debug = err;
        res.status(400).send(message);
      });
  })
  .get('/service/:serviceId', (req, res) => {
    Services
      .where({
        id: req.params.serviceId
      })
      .fetch()
      .then(service => {
        res.send(service.toJSON());
      }).catch(function(error) {
        res.send('An error occurred');
      });
  });

export default router;
