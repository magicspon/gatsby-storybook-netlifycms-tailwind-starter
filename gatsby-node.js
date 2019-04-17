const path = require(`path`)
const glob = require('glob')
const merge = require('webpack-merge')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { createFilePath } = require(`gatsby-source-filesystem`)
const R = require('ramda')

const purgeConfig = {
	paths: glob.sync(path.join(__dirname, '/src/**/**/**/*.js'), {
		nodir: true
	}),
	extractors: [
		{
			extractor: class {
				static extract(content) {
					return content.match(/[A-Za-z0-9-_:/]+/g) || []
				}
			},
			extensions: ['js']
		}
	],
	whitelist: [''],
	whitelistPatterns: [/headroom/, /module--/]
}

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
	const prevConfig = getConfig()

	actions.replaceWebpackConfig(
		merge(prevConfig, {
			output: {
				globalObject: 'this' // required for webworkers
			},

			resolve: {
				alias: {
					'@': path.resolve(__dirname, '/src/')
				},
				mainFields: ['browser', 'module', 'main']
			},

			module: {
				rules: [
					{
						test: /\.(ttf|woff|woff2|eot|svg)$/,
						use: 'file-loader?name=[name].[ext]',
						exclude: /\.inline.svg$/
					},
					{
						test: /\.inline.svg$/,
						use: [
							{ loader: 'babel-loader' },
							{
								loader: 'react-svg-loader',
								options: {
									jsx: true
								}
							}
						]
					}
				]
			}
		})
	)

	// Add PurgeCSS in production
	// See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
	if (stage.includes('build')) {
		actions.setWebpackConfig({
			plugins: [
				new PurgeCssPlugin(purgeConfig),
				new OptimizeCSSAssetsPlugin({})
			]
		})
	}
}

exports.onCreateBabelConfig = ({ actions }) => {
	actions.setBabelPlugin({
		name: 'babel-plugin-inline-react-svg'
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value
		})
	}
}

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							templateKey
						}
					}
				}
			}
		}
	`).then(({ errors, data }) => {
		if (errors) {
			// eslint-disable-next-line no-console
			errors.forEach(e => console.error(e.toString()))
			return Promise.reject(errors)
		}

		const { edges } = data.allMarkdownRemark

		edges.forEach(({ node }) => {
			const { id, fields, frontmatter } = node

			createPage({
				path: fields.slug,
				tags: frontmatter.tags,
				component: path.resolve(
					`src/templates/${String(frontmatter.templateKey)}.js`
				),
				// additional data can be passed via context
				context: {
					id
				}
			})
		})
	})
}
