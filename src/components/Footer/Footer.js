import React from 'react'
import Social from '@/components/Social/Social'

const year = new Date().getFullYear()
const Footer = () => (
	<div className="bg-dark p-6 md:flex justify-between items-center flex-row-reverse w-full">
		<div className="mb-7 md:mb-0">
			<Social facebook="#0" twitter="#0" instagram="#0" />
		</div>

		<p className="m-0 text-white-40 text-sm text-center md:text-left">
			&copy; the {year} or there abouts
		</p>
	</div>
)

export default Footer
