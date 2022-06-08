const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

let mode = "development";
let target = "web";
let optimizations = {};
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

let EnvValues = {};

if (process.env.NODE_ENV === "production") {
  mode = "production";
  // Temporary workaround for 'browserslist' bug that is being patched in the near future
  target = "browserslist";

  EnvValues = {
    SKIP_PREFLIGHT_CHECK: true,
    REACT_APP_USER_AUTH: "https://apifarma.ump.pt/api/userAuth/",
    REACT_APP_ALL_USER: "https://apifarma.ump.pt/api/allusers/",
    REACT_APP_EDIT_USER: "https://apifarma.ump.pt/api/editusers/",
    REACT_APP_ADD_USER: "https://apifarma.ump.pt/api/addusers/",
    REACT_APP_ADD_USERUSERGRUPO: "https://apifarma.ump.pt/api/addusergroups/",
    REACT_APP_DELETE_USERUSERGRUPO:
      "https://apifarma.ump.pt/api/deleteusergroups/",
    REACT_APP_GET_TOKEN: "https://apifarma.ump.pt/api/getusertoken/",
    REACT_APP_GET_PERMISSIONGROUPS:
      "https://apifarma.ump.pt/api/getpermissiongroups/",
    REACT_APP_MANAGE_PERMISSIONS:
      "https://apifarma.ump.pt/api/managepermissiongroups/",
    REACT_APP_GET_GROUPPAGES: "https://apifarma.ump.pt/api/getgrouppages/",
    REACT_APP_GET_MANAGEPAGES: "https://apifarma.ump.pt/api/managepages/",
    REACT_APP_GET_ALLPAGES: "https://apifarma.ump.pt/api/allpages/",
    REACT_APP_DELETE_ALLPAGES: "https://apifarma.ump.pt/api/deletepagegroups/",
    REACT_APP_UPDATE_PAGES: "https://apifarma.ump.pt/api/updatepages/",
    REACT_APP_DELETE_GROUP: "https://apifarma.ump.pt/api/deleteGroup/",
    REACT_APP_USER_GROUPS: "https://apifarma.ump.pt/api/usergroups/",
    REACT_APP_UCC_MANAGEMENT: "https://apifarma.ump.pt/api/uccmanagment/",
    REACT_APP_PLACES_MANAGEMENT: "https://apifarma.ump.pt/api/placesmanagment/",
    REACT_APP_PHARMACIST_MANAGEMENT:
      "https://apifarma.ump.pt/api/pharmacistmanagment/",
    REACT_APP_ITEM_MANAGEMENT: "https://apifarma.ump.pt/api/itemsmanagment/",
    REACT_APP_ORDERACCESS_MANAGEMENT:
      "https://apifarma.ump.pt/api/orderaccessmanagment/",
    REACT_APP_LABORATORY_MANAGEMENT:
      "https://apifarma.ump.pt/api/laboratorymanagment/",
    REACT_APP_RETURN_MANAGEMENT:
      "https://apifarma.ump.pt/api/returnconditionsmanagment/",
    REACT_APP_ATTACHMENT_MANAGEMENT:
      "https://apifarma.ump.pt/api/attachmentmanagment/",
    REACT_APP_NUMBERING_MANAGEMENT:
      "https://apifarma.ump.pt/api/numeringmanagment/",
    REACT_APP_PERMISSION_MANAGEMENT:
      "https://apifarma.ump.pt/api/permissionmanagment/",
    REACT_APP_APIIMPORT_MANAGEMENT:
      "https://apifarma.ump.pt/api/importapimanagement/",
    REACT_APP_LABUCCACCESS_MANAGEMENT:
      "https://apifarma.ump.pt/api/labuccaccess/",
    REACT_APP_LABUCCFILTER_MANAGEMENT:
      "https://apifarma.ump.pt/api/getfilterlabuccaccess/",
    REACT_APP_ORDER_MANAGEMENT: "https://apifarma.ump.pt/api/ordermanagement/",
    REACT_APP_CREATEDORDER_MANAGEMENT:
      "https://apifarma.ump.pt/api/createdordermanagement/",
    REACT_APP_ORDERLINES_MANAGEMENT:
      "https://apifarma.ump.pt/api/orderlinesmanagement/",
    REACT_APP_DATA_IMPORT: "https://apifarma.ump.pt/api/dataimport/",
    REACT_APP_PASS_CHANGER: "https://apifarma.ump.pt/api/passwordchanger/",
    REACT_APP_POSTEDORDERS_MANAGEMENT:
      "https://apifarma.ump.pt/api/postedordersmanagement/",
    REACT_APP_POST_ORDERS: "https://apifarma.ump.pt/api/postorders/",
    REACT_APP_SOCKET_IO: "https://apifarma.ump.pt",
    REACT_APP_NOTIFICATION_MANAGEMENT:
      "https://apifarma.ump.pt/api/notificationmanagement/",
    REACT_APP_CANCEL_ORDER: "https://apifarma.ump.pt/api/cancelpostedorder",
    REACT_APP_UPDATE_PASSWORD: "https://apifarma.ump.pt/api/updateuserpassword",
    REACT_APP_POWER_BI:
      "https://app.powerbi.com/view?r=eyJrIjoiN2U3NjVmNWMtMjExMy00NzA3LWJkNDUtZTllMzI3ODE3MGJlIiwidCI6IjYxZjViNmZiLWVjYTYtNGRiNS05Y2JmLWM3ZjVmOGQxMGNkNSIsImMiOjl9",
    REACT_APP_APITOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDE0MjEzMDl9.gul4t_9A7CD67H5qTTjiea6baOcsAERa6gS_JX8e3d4",
    GENERATE_SOURCEMAP: false,
  };

  plugins.push(new EnvironmentPlugin(EnvValues));
  optimizations = { minimize: true, minimizer: [new TerserPlugin()] };
}

if (process.env.SERVE) {
  // React Hot Reloading in dev mode
  plugins.push(new ReactRefreshWebpackPlugin());

  EnvValues = {
    SKIP_PREFLIGHT_CHECK: true,
    REACT_APP_USER_AUTH: "http://192.168.0.117:50000/api/userAuth/",
    REACT_APP_ALL_USER: "http://192.168.0.117:50000/api/allusers/",
    REACT_APP_EDIT_USER: "http://192.168.0.117:50000/api/editusers/",
    REACT_APP_ADD_USER: "http://192.168.0.117:50000/api/addusers/",
    REACT_APP_ADD_USERUSERGRUPO:
      "http://192.168.0.117:50000/api/addusergroups/",
    REACT_APP_DELETE_USERUSERGRUPO:
      "http://192.168.0.117:50000/api/deleteusergroups/",
    REACT_APP_GET_TOKEN: "http://192.168.0.117:50000/api/getusertoken/",
    REACT_APP_GET_PERMISSIONGROUPS:
      "http://192.168.0.117:50000/api/getpermissiongroups/",
    REACT_APP_MANAGE_PERMISSIONS:
      "http://192.168.0.117:50000/api/managepermissiongroups/",
    REACT_APP_GET_GROUPPAGES: "http://192.168.0.117:50000/api/getgrouppages/",
    REACT_APP_GET_MANAGEPAGES: "http://192.168.0.117:50000/api/managepages/",
    REACT_APP_GET_ALLPAGES: "http://192.168.0.117:50000/api/allpages/",
    REACT_APP_DELETE_ALLPAGES:
      "http://192.168.0.117:50000/api/deletepagegroups/",
    REACT_APP_UPDATE_PAGES: "http://192.168.0.117:50000/api/updatepages/",
    REACT_APP_DELETE_GROUP: "http://192.168.0.117:50000/api/deleteGroup/",
    REACT_APP_USER_GROUPS: "http://192.168.0.117:50000/api/usergroups/",
    REACT_APP_UCC_MANAGEMENT: "http://192.168.0.117:50000/api/uccmanagment/",
    REACT_APP_PLACES_MANAGEMENT:
      "http://192.168.0.117:50000/api/placesmanagment/",
    REACT_APP_PHARMACIST_MANAGEMENT:
      "http://192.168.0.117:50000/api/pharmacistmanagment/",
    REACT_APP_ITEM_MANAGEMENT: "http://192.168.0.117:50000/api/itemsmanagment/",
    REACT_APP_ORDERACCESS_MANAGEMENT:
      "http://192.168.0.117:50000/api/orderaccessmanagment/",
    REACT_APP_LABORATORY_MANAGEMENT:
      "http://192.168.0.117:50000/api/laboratorymanagment/",
    REACT_APP_RETURN_MANAGEMENT:
      "http://192.168.0.117:50000/api/returnconditionsmanagment/",
    REACT_APP_ATTACHMENT_MANAGEMENT:
      "http://192.168.0.117:50000/api/attachmentmanagment/",
    REACT_APP_NUMBERING_MANAGEMENT:
      "http://192.168.0.117:50000/api/numeringmanagment/",
    REACT_APP_PERMISSION_MANAGEMENT:
      "http://192.168.0.117:50000/api/permissionmanagment/",
    REACT_APP_APIIMPORT_MANAGEMENT:
      "http://192.168.0.117:50000/api/importapimanagement/",
    REACT_APP_LABUCCACCESS_MANAGEMENT:
      "http://192.168.0.117:50000/api/labuccaccess/",
    REACT_APP_LABUCCFILTER_MANAGEMENT:
      "http://192.168.0.117:50000/api/getfilterlabuccaccess/",
    REACT_APP_ORDER_MANAGEMENT:
      "http://192.168.0.117:50000/api/ordermanagement/",
    REACT_APP_CREATEDORDER_MANAGEMENT:
      "http://192.168.0.117:50000/api/createdordermanagement/",
    REACT_APP_ORDERLINES_MANAGEMENT:
      "http://192.168.0.117:50000/api/orderlinesmanagement/",
    REACT_APP_DATA_IMPORT: "http://192.168.0.117:50000/api/dataimport/",
    REACT_APP_PASS_CHANGER: "http://192.168.0.117:50000/api/passwordchanger/",
    REACT_APP_POSTEDORDERS_MANAGEMENT:
      "http://192.168.0.117:50000/api/postedordersmanagement/",
    REACT_APP_POST_ORDERS: "http://192.168.0.117:50000/api/postorders/",
    REACT_APP_SOCKET_IO: "http://192.168.0.117:50000",
    REACT_APP_NOTIFICATION_MANAGEMENT:
      "http://192.168.0.117:50000/api/notificationmanagement/",
    REACT_APP_CANCEL_ORDER: "http://192.168.0.117:50000/api/cancelpostedorder",
    REACT_APP_UPDATE_PASSWORD:
      "http://192.168.0.117:50000/api/updateuserpassword",
    REACT_APP_POWER_BI:
      "https://app.powerbi.com/view?r=eyJrIjoiN2U3NjVmNWMtMjExMy00NzA3LWJkNDUtZTllMzI3ODE3MGJlIiwidCI6IjYxZjViNmZiLWVjYTYtNGRiNS05Y2JmLWM3ZjVmOGQxMGNkNSIsImMiOjl9",
    REACT_APP_APITOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDE0MjEzMDl9.gul4t_9A7CD67H5qTTjiea6baOcsAERa6gS_JX8e3d4",
  };
  plugins.push(new EnvironmentPlugin(EnvValues));
}

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,
  optimization: optimizations,
  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: ["@babel/polyfill", "./src/index.js"],

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, "dist"),
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|jfif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  //devtool: "source-map",
  devtool: "nosources-source-map",
  resolve: {
    extensions: [".js", ".jsx"],

    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
      "@mui/material": "@mui/material/legacy",
    },
  },

  // required if using webpack-dev-server
  devServer: {
    host: "192.168.0.117",
    historyApiFallback: true,
    contentBase: "./dist",
    hot: true,
    open: true,
    port: 50050,
  },
};
