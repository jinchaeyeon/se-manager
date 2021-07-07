import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

const Farms = [
	{
		pkey: '1',
		did: 'M0001',
		region: '인천',
		sname: '덕교농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '2',
		did: 'M0002',
		region: '인천',
		sname: '중산농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '3',
		did: 'M0003',
		region: '영암',
		sname: '만수농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '4',
		did: 'M0004',
		region: '영암',
		sname: '봉호농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '5',
		did: 'M0005',
		region: '안동',
		sname: '녹내농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '6',
		did: 'M0006',
		region: '안동',
		sname: '구송농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '7',
		did: 'M0007',
		region: '구미',
		sname: '시험농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '8',
		did: 'M0008',
		region: '구미',
		sname: '채연농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '9',
		did: 'M0009',
		region: '구미',
		sname: '성용농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '10',
		did: 'M0010',
		region: '구미',
		sname: '한석농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '11',
		did: 'M0011',
		region: '구미',
		sname: '병만농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '12',
		did: 'M0012',
		region: '구미',
		sname: '종열농장',
		fname: '',
		phone: ''
	},
	{
		pkey: '13',
		did: 'M0013',
		region: '구미',
		sname: '진권농장',
		fname: '',
		phone: ''
	}
];

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {
		count, page, rowsPerPage, onPageChange
	} = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

export default function FarmListResults() {
	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell>
							지역명
						</TableCell>
						<TableCell>
							장치식별자
						</TableCell>
						<TableCell>
							농장명
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? Farms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: Farms
					).map((row) => (
						<TableRow key={row.pkey}>
							<TableCell>
								{row.sname}
							</TableCell>
							<TableCell>
								{row.did}
							</TableCell>
							<TableCell>
								{row.region}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10]}
							colSpan={3}
							count={Farms.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
