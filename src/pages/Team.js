import { Helmet } from 'react-helmet';
import TeamRead from 'src/components/Team/TeamRead';
import { useState } from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
const stacks = [
	'React',
	'Java',
	'C++',
	'C',
	'Mysql',
	'MongoDB',
	'Python',
	'자연어처리',
	'영상처리',
	'딥러닝',
];
const subjects = [
	'창의융합종합설계1',
	'창의융합종합설계2',
	'일반 프로젝트'
];
const Team = () => {
	const [postBody, setPostBody] = useState({
		name: ''
	});
	const [stack, setstack] = useState([]);
	const [subject, setsubject] = useState([]);
	const handleTextChange = (event) => {
		setPostBody({
			name: event.currentTarget.value,
		});
	};
	const handlestackChange = (event) => {
		const {
			target: { value },
		} = event;
		setstack(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const handlesubjectChange = (event) => {
		const {
			target: { value },
		} = event;
		setsubject(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	return (
		<>
			<Helmet>
				<title>Team</title>
			</Helmet>
			<Box
				sx={{
					minHeight: '100%',
					py: 5,
				}}
			>
				<Box
					sx={{
						bgcolor: 'primary.green',
						width: '100px',
						height: 8,
						marginLeft: 3
					}}
				/>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				<h2 style={{ marginLeft: 20 }}>팀원을 찾아보세요!</h2>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				<FormControl
					sx={{
						m: 1,
						width: 200,
						marginLeft: 2.5,
					}}
				>
					<InputLabel id="기술스택">&nbsp;기술스택</InputLabel>
					<Select
						labelId="기술스택"
						id="기술스택"
						multiple
						value={stack}
						onChange={handlestackChange}
						input={<OutlinedInput label="기술스택" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
					>
						{stacks.map((s) => (
							<MenuItem key={s} value={s}>
								<Checkbox
									sx={{
										color: 'primary.darkgreen',
										'&.Mui-checked': {
											color: 'primary.darkgreen',
										},
									}}
									checked={stack.indexOf(s) > -1}
								/>
								<ListItemText primary={s} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl
					sx={{
						m: 1,
						width: 200,
						marginLeft: 2.5,
						backgroundColor: 'primary.smoothgreen'
					}}
				>
					<InputLabel id="과목명">&nbsp;과목명</InputLabel>
					<Select
						labelId="과목명"
						id="과목명"
						value={subject}
						onChange={handlesubjectChange}
						input={<OutlinedInput label="과목명" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
					>
						{subjects.map((s) => (
							<MenuItem key={s} value={s}>
								<Checkbox
									sx={{
										color: 'primary.darkgreen',
										'&.Mui-checked': {
											color: 'primary.darkgreen',
										},
									}}
									checked={subject.indexOf(s) > -1}
								/>
								<ListItemText primary={s} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Box
					sx={{
						minHeight: '100%',
						py: 1,
					}}
				/>
				{postBody.name}
				<Container maxWidth={false}>
					<Grid
						item
						lg={10}
						md={10}
						sm={12}
						xs={12}
					>
						<TextField
							fullWidth
							sx={{
								flex: '1',
								flexDirection: 'row',
								boxShadow: 5,
								borderBottomRightRadius: 5,
								borderBottomLeftRadius: 5,
								borderTopRightRadius: 5,
								borderTopLeftRadius: 5,
								backgroundColor: 'primary.smoothgreen'
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SvgIcon
											fontSize="small"
											color="action"
										/>
									</InputAdornment>
								)
							}}
							placeholder="팀원 모집글을 검색 해보세요!"
							variant="outlined"
							onChange={handleTextChange}
						/>
					</Grid>
					<Box
						sx={{
							minHeight: '100%',
							py: 2,
						}}
					/>
					<Grid
						container
						spacing={5}
					>
						<Grid
							item
							lg={5}
							md={5}
							sm={6}
							xs={12}
						>
							<TeamRead />
						</Grid>
						<Grid
							item
							lg={5}
							md={5}
							sm={6}
							xs={12}
						>
							<TeamRead />
						</Grid>
						<Grid
							item
							lg={5}
							md={5}
							sm={6}
							xs={12}
						>
							<TeamRead />
						</Grid>
						<Grid
							item
							lg={5}
							md={5}
							sm={6}
							xs={12}
						>
							<TeamRead />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Team;
