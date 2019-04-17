import React from 'react'
import Logo from '@/components/Logo/Logo'
import Nav from '@/components/Nav/Nav'
import MenuButton from '@/components/MenuButton/MenuButton'

const Header = () => (
	<header className="p-4 lg:p-6 flex items-center justify-start w-full">
		<Logo />
		<Nav />
		<MenuButton className="md:hidden" isOpen={false} />
	</header>
)

Header.defaultProps = {}
Header.propTypes = {}

export default Header
