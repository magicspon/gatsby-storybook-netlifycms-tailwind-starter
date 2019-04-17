import React from 'react'
import { bool, string } from 'prop-types'
import classNames from 'classnames'
import styles from './MenuButton.module.css'
import VisuallyHidden from '@/helpers/VisuallyHidden'

const MenuButton = ({ isOpen = true, className }) => (
	<button
		type="button"
		className={classNames(
			styles.container,
			'absolute flex flex-col items-center justify-center right-0 mr-4',
			className
		)}
	>
		<span
			className={classNames(
				styles.line,
				{ [styles['top-closed']]: !isOpen },
				{ [styles['top-open']]: isOpen },
				'bg-blue-300 absolute inset-y-0 my-auto'
			)}
		/>
		<span
			className={classNames(
				styles.line,
				{ [styles['middle-closed']]: !isOpen },
				{ [styles['middle-open']]: isOpen },
				'bg-blue-300 absolute inset-y-0 my-auto'
			)}
		/>
		<span
			className={classNames(
				styles.line,
				{ [styles['bottom-closed']]: !isOpen },
				{ [styles['bottom-open']]: isOpen },
				'bg-blue-300 absolute inset-y-0 my-auto'
			)}
		/>
		<VisuallyHidden>MclassNames(enu button</VisuallyHidden>
	</button>
)

MenuButton.defaultProps = {
	className: undefined
}

MenuButton.propTypes = {
	isOpen: bool.isRequired,
	className: string
}

export default MenuButton
