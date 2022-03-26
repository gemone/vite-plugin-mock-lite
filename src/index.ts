import { delay as DELAY } from 'lodash';

import Mock from 'mockjs-lite';

import { readFileSync } from 'fs';

import type { Plugin } from 'vite';

interface Options {
  dir: string;
  path: string;
  delay: string | number;
}

export const pluginMockjsLite: (options: Options) => Plugin = (options: Options) => {
  const { dir = 'mock', path = '/api', delay = 0 } = options;

  return {
    name: '@vitejs/mockjs-lite',
    configureServer(server) {
      const mockPath = `${path}/`;
      server.middlewares.use((req, res, next) => {
        const url = req.originalUrl as string;
        if (url.startsWith(mockPath)) {
          res.setHeader('Content-Type', 'application/json');
          let queryPath = url.split('?')[0];
          queryPath = `${dir}/${queryPath.substring(mockPath.length)}.json`;

          try {
            const data = readFileSync(queryPath, { encoding: 'utf8' });

            DELAY(() => {
              res.statusCode = 200;
              res.end(JSON.stringify(Mock.mock(JSON.parse(data))));
            }, 0);
          } catch {
            res.statusCode = 500;
          }
        } else {
          next();
        }
      });
    },
  } as Plugin;
};

export default pluginMockjsLite;
