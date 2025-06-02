const path = require('path')

module.exports = [
  {
    mode: 'development',
    entry: {
      myindex: [path.resolve(__dirname, 'src/myindex.jsx')],
      hosp: [path.resolve(__dirname, 'src/hosp.jsx')],
      osmp: [path.resolve(__dirname, 'src/osmp.jsx')],
      osmpmob: [path.resolve(__dirname, 'src/osmpmob.jsx')],
      pndmob: [path.resolve(__dirname, 'src/pndmob.jsx')],
      admin: [path.resolve(__dirname, 'src/admin.jsx')],
      contract: [path.resolve(__dirname, 'src/contract.jsx')],
      store: [path.resolve(__dirname, 'src/store.jsx')]
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: '/',
      filename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'lib')
      ],
      alias: {
        root: path.resolve(__dirname, 'src'),
        styles: path.resolve(__dirname, 'src/styles/osmp'),
        component: path.resolve(__dirname, 'src/component'),
        hosp: path.resolve(__dirname, 'src/hosp'),
        osmp: path.resolve(__dirname, 'src/osmp'),
        admin: path.resolve(__dirname, 'src/admin'),
        contract: path.resolve(__dirname, 'src/contract'),
        store: path.resolve(__dirname, 'src/store'),
        online: path.resolve(__dirname, 'src/online'),
        lib: path.resolve(__dirname, 'src/lib'),
        schedule: path.resolve(__dirname, 'src/online/schedule'),
        tinput: path.resolve(__dirname, 'lib/tinput/src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          exclude: [/node_modules/]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'docs'),
      publicPath: '/',
      port: 9000,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      },
      proxy: [
        {
          context: ['/api', '/rest', '/policy'],
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          secure: false,
          bypass: function (req, res, proxyOptions) {
            for (let s of this.context) {
              if (req.url.indexOf(s) == 0) {
                console.log('Proxy ' + req.url + ' to ' + this.target)
              }
            }
          }
        }
      ]
    }
  },
  {
    mode: 'development',
    entry: {
      schedule: [path.resolve(__dirname, 'src/schedule.jsx')],
      office: [path.resolve(__dirname, 'src/office.jsx')],
      activate: [path.resolve(__dirname, 'src/activate.jsx')],
      changepassword: [path.resolve(__dirname, 'src/changepassword.jsx')]
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: '/',
      filename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'lib')
      ],
      alias: {
        root: path.resolve(__dirname, 'src'),
        styles: path.resolve(__dirname, 'src/styles/online'),
        component: path.resolve(__dirname, 'src/component'),
        osmp: path.resolve(__dirname, 'src/osmp'),
        admin: path.resolve(__dirname, 'src/admin'),
        contract: path.resolve(__dirname, 'src/contract'),
        store: path.resolve(__dirname, 'src/store'),
        online: path.resolve(__dirname, 'src/online'),
        schedule: path.resolve(__dirname, 'src/online/schedule'),
        lib: path.resolve(__dirname, 'src/lib'),
        tinput: path.resolve(__dirname, 'lib/tinput/src')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          exclude: [/node_modules/]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'docs'),
      publicPath: '/',
      port: 9000,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      },
      proxy: [
        {
          context: ['/api', '/rest', '/policy'],
          target: 'http://127.0.0.1:8080', // http://10.16.1.28:8080, http://127.0.0.1:8080
          changeOrigin: true,
          secure: false,
          bypass: function (req, res, proxyOptions) {
            for (let s of this.context) {
              if (req.url.indexOf(s) == 0) {
                console.log('Proxy ' + req.url + ' to ' + this.target)
              }
            }
          }
        }
      ]
    }
  }
]
