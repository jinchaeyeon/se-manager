import 'date-fns';
import { Helmet } from 'react-helmet';
import { useState, React, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Api from 'src/Api/Api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const TeamRegister = () => {
  const [postBody, setPostBody] = useState({
    title: '',
    content: '',
    count: '',
    selectDate: getFormatDate(new Date())
  });

  const [subjects, setsubjects] = useState([]);

  const [subject, setsubject] = useState([]);
  const handlesubjectChange = (event) => {
    const {
      target: { value }
    } = event;
    setsubject(typeof value === 'string' ? value.split(',') : value);
  };
  function getFormatDate(date) {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }
  const handleDateChange = (date) => {
    setPostBody({
      selectDate: getFormatDate(date),
      title: postBody.title,
      content: postBody.content,
      count: postBody.count
    });
  };
  const handletitleChange = (event) => {
    setPostBody({
      title: event.currentTarget.value,
      selectDate: postBody.selectDate,
      content: postBody.content,
      count: postBody.count
    });
  };
  const handlecontentChange = (event) => {
    setPostBody({
      content: event.currentTarget.value,
      selectDate: postBody.selectDate,
      title: postBody.title,
      count: postBody.count
    });
  };
  const handlecountChange = (event) => {
    setPostBody({
      count: event.currentTarget.value,
      selectDate: postBody.selectDate,
      title: postBody.title,
      content: postBody.content
    });
  };
  const emptyCheck = () => {
    if (
      postBody.title === undefined ||
      subject[0] === undefined ||
      postBody.content === undefined ||
      postBody.count === undefined
    ) {
      return false;
    }
  };

  const createTeam = async () => {
    // ?????? ??????
    const isEmpty = emptyCheck();
    if (isEmpty === false) {
      alert('?????????????????? ???????????????(??????, ??????, ????????????, ??????)');
      return false;
    }

    const reqObject = {
      recruitment_title: postBody.title,
      recruitment_content: postBody.content,
      recruitment_recruited_limit: postBody.count,
      recruitment_deadline_date: postBody.selectDate,
      recruitment_subject: subject[0]
    };
    let response = await Api.postTeam(reqObject);
    if (response.sucess) {
      alert('?????????????????????.');
      const target = '/se/team';
      window.location.href = target;
    } else {
      alert('?????? ??????');
    }
  };
  useEffect(() => {
    getSubjects();
  }, []);
  const getSubjects = async () => {
    let response = await Api.getSubjects();
    const subject_list = await response.data.subjects;
    setsubjects(subject_list);
  };
  return (
    <>
      <Helmet>
        <title>TeamRegister</title>
      </Helmet>
      <Box>
        <Box
          sx={{
            minHeight: '100%',
            py: 3
          }}
        />
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <Card
            sx={{
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              boxShadow: 5
            }}
          >
            <CardContent>
              <h2 style={{ color: '#006400' }}>?????? ????????? ??????</h2>
              <h4>????????? ???????????????!</h4>
              <Box
                sx={{
                  minHeight: '100%',
                  py: 2,
                  borderBottom: '1px solid grey'
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  paddingLeft: 0.5
                }}
              >
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 1.5
                  }}
                />
                <h3>??? ??????&nbsp;(?????? 40???)</h3>
                {postBody.name}
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  halfwidth="true"
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
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="?????? 40???"
                  variant="outlined"
                  onChange={handletitleChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>??? ??????</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  fullWidth
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handlecontentChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>?????? ??????&nbsp;(????????? ??????)</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <TextField
                  halfwidth="true"
                  sx={{
                    flex: '1',
                    flexDirection: 'row',
                    boxShadow: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    backgroundColor: 'primary.smoothgreen',
                    display: 'inline-block'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="????????? ??????????????????"
                  variant="outlined"
                  onChange={handlecountChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>?????? ??????</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="????????????"
                    format="yyyy/MM/dd"
                    value={postBody.selectDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    autoOk="true"
                  />
                </MuiPickersUtilsProvider>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>???????????? ??????</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <FormControl
                  sx={{
                    width: 200,
                    backgroundColor: 'primary.smoothgreen'
                  }}
                >
                  <InputLabel id="?????????">&nbsp;?????????</InputLabel>
                  <Select
                    labelId="?????????"
                    id="?????????"
                    value={subject}
                    onChange={handlesubjectChange}
                    input={<OutlinedInput label="?????????" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {subjects.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          sx={{
                            color: 'primary.darkgreen',
                            '&.Mui-checked': {
                              color: 'primary.darkgreen'
                            }
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
                    py: 2
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={createTeam}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    ??????
                  </h3>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default TeamRegister;
