#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import Schema from './schema.es6';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery)
  .then(result => {
    fs.writeFileSync(path.join(__dirname, './schema.json'), JSON.stringify(result, null, 2));
    fs.writeFileSync(path.join(__dirname, './schema.graphql'), printSchema(Schema));
  });