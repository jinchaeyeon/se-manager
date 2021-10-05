import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Badge,
	Box,
	Hidden,
	IconButton,
	Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logo from 'src/components/Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
	const [notifications] = useState([]);

	return (
		<AppBar
			elevation={0}
			{...rest}
		>
			<Toolbar>
				<Link to="/app/dashboard">
					<Logo height="50px" width="150px" />
				</Link>
				<Hidden lgDown>
					<h3>&nbsp;&gt;&nbsp; 팀원 모집</h3>
				</Hidden>
				<Box sx={{ flexGrow: 1 }} />
				<Hidden lgDown>
					<Link to="/app/teamRegister">
						<button type="button">팀원 모집글 등록</button>
					</Link>
					<IconButton color="inherit">
						<Badge
							badgeContent={notifications.length}
							color="primary"
							border-bottom="1px solid #d1d8e4"
							variant="dot"
						/>
					</IconButton>
				</Hidden>
				<Hidden lgUp>
					<IconButton
						color="inherit"
						onClick={onMobileNavOpen}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
			<Box
				sx={{
					backgroundColor: '#D3D3D3',
					height: 2,
					boxShadow: 5
				}}
			/>
		</AppBar>
	);
};

DashboardNavbar.propTypes = {
	onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;