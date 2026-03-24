import {fromRollup} from '@web/dev-server-rollup'
import rollupReplace from '@rollup/plugin-replace'
import {esbuildPlugin} from '@web/dev-server-esbuild'
import proxy from 'koa-proxies'

const replace = fromRollup(rollupReplace)

export default {
  plugins: [
    esbuildPlugin({ts: true}),
    replace({
      include: [
        'src/**/*.js',
        'src/**/*.ts',
        'node_modules/@popperjs/**/*.js',
        'node_modules/@popperjs/**/*.ts',
        'node_modules/tippy.js/**/*.ts',
        'node_modules/tippy.js/**/*.js',
      ],
      preventAssignment: true,
      'process.env.NODE_ENV': '"production"',
      'http://localhost:5555': '',
    }),
  ],
  middleware: [
    proxy('/api', {
      target: 'http://131.186.36.129:5001',
      changeOrigin: true,
    }),
    proxy('/socket.io', {
      target: 'http://131.186.36.129:5001',
      changeOrigin: true,
      ws: true,
    }),
  ],
}
