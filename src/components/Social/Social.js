import React from 'react'
import { string } from 'prop-types'
import Facebook from '@/icons/facebook.inline.svg'
import Twitter from '@/icons/twitter.inline.svg'
import Instagram from '@/icons/instagram.inline.svg'
import VisuallyHidden from '@/helpers/VisuallyHidden'

const Social = ({ facebook, twitter, instagram }) => (
	<ul className="list-none flex items-center justify-center">
		<li className="mx-3">
			<a href={facebook} className="text-black lg:text-black-40 block">
				<Facebook className="fill-current h-6" />
				<VisuallyHidden>Facebook</VisuallyHidden>
			</a>
		</li>
		<li className="mx-3">
			<a href={twitter} className="text-black lg:text-black-40 block">
				<Twitter className="fill-current h-6" />
				<VisuallyHidden>Twitter</VisuallyHidden>
			</a>
		</li>
		<li className="mx-3">
			<a href={instagram} className="text-black lg:text-black-40 block">
				<Instagram className="fill-current h-6" />
				<VisuallyHidden>Instagram</VisuallyHidden>
			</a>
		</li>
	</ul>
)

Social.defaultProps = {}
Social.propTypes = {
	facebook: string.isRequired,
	twitter: string.isRequired,
	instagram: string.isRequired
}

export default Social
