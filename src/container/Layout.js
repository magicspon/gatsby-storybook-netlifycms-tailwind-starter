import React from 'react'
import Helmet from 'react-helmet'
import { element } from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const useSiteMetadata = () => {
	const { site } = useStaticQuery(
		graphql`
			query SITE_METADATA_QUERY {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`
	)
	return site.siteMetadata
}

import '@/styles/style.css'

const TemplateWrapper = ({ children }) => {
	const { title, description } = useSiteMetadata()

	return (
		<div>
			<Helmet>
				<html lang="en" />
				<title>{title}</title>
				<meta name="description" content={description} />
			</Helmet>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="w-full flex-1">{children}</main>
				<Footer />
			</div>
		</div>
	)
}

TemplateWrapper.propTypes = {
	children: element.isRequired
}

export default TemplateWrapper
