import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const assetsLoaders = [
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
      generator: {
        filename: isDev ? "assets/[name].[ext]" : "assets/[hash][ext][query]",
      },
    },
    {
      test: /\.(eot|ttf|otf|woff(2)?)$/,
      type: "asset/resource",
      generator: {
        filename: isDev ? "fonts/[name].[ext]" : "fonts/[hash][ext][query]",
      },
    },
  ];

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  };

  return [...assetsLoaders, cssLoader, tsLoader, svgrLoader];
}
