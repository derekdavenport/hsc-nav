import CopyWebpackPlugin from 'copy-webpack-plugin';
import preactCliTypeScript from 'preact-cli-plugin-typescript';

export default (config, env, helpers) => {
	preactCliTypeScript(config);

  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.libraryTarget = "umd";
		config.devtool = false; // disable sourcemaps
	}
	config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]));
};
