import express from 'express';
import knex from 'knex';
import bookshelf from 'bookshelf';

import knexConfig from '../knexfile';

let mode = express().get('env');

export default bookshelf(knex(knexConfig[mode]));
