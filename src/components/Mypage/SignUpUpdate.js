import { Helmet } from 'react-helmet';
import { useState, React } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Api from 'src/Api/Api';

const data = JSON.parse(sessionStorage.getItem('user_data'));
const server_path = 'http://202.31.202.28:443/file/';
const empty_profile =
  'http://202.31.202.28:443/file/image\\file__1638711656842.png';
const SignUpUpdate = () => {
  const [postBody, setpostBody] = useState({
    id: data.user_id,
    login_id: data.user_login_id,
    email: data.user_email,
    name: data.user_name,
    number: data.user_school_num,
    image: data.user_image,
    type: data.user_type,
    github: data.user_github,
    blog: data.user_blog,
    content: data.user_introduction,
    position: data.user_position
  });

  const [image, setimage] = useState();
  const [fileUrl, setFileUrl] = useState(data.user_image);

  // 유저 정보 없데이트, 수정하기 버튼 OnClick 함수
  const update_user = async () => {
    if (postBody.image == null) {
      setpostBody({
        id: postBody.id,
        login_id: postBody.login_id,
        email: postBody.email,
        name: postBody.name,
        number: postBody.number,
        image: empty_profile,
        type: postBody.type,
        github: postBody.github,
        blog: postBody.blog,
        content: postBody.content,
        position: postBody.position
      });
    }
    let response = await Api.postUpdateUser(
      postBody.id,
      postBody.image,
      postBody.content,
      postBody.github,
      postBody.blog,
      postBody.position
    );
    if (response.sucess === true) {
      const target = 'page';
      var user_data = JSON.parse(sessionStorage.getItem('user_data'));
      user_data.user_image = postBody.image;
      user_data.user_introduction = postBody.content;
      user_data.user_github = postBody.github;
      user_data.user_blog = postBody.blog;
      user_data.user_position = postBody.position;
      sessionStorage.removeItem('user_data');
      sessionStorage.setItem('user_data', JSON.stringify(user_data));
      alert('수정 성공');
      window.location.href = target;
    } else {
      alert('수정 실패');
    }
  };

  // 유저 정보 삭제, 삭제하기 버튼 OnClick 함수
  const delete_user = async () => {
    let response = await Api.deleteUser(postBody.id);
  };

  const processImage = async (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setimage(imageFile);
    setFileUrl(imageUrl);
    const formData = new FormData();
    formData.append('attachments', imageFile);
    let response = await Api.getReadFile(formData);
    if (response.sucess) {
      let image_path = response.files[0].file_path.replace('file\\', '');
      let image = server_path + image_path;
      setpostBody({
        id: postBody.id,
        login_id: postBody.login_id,
        email: postBody.email,
        name: postBody.name,
        number: postBody.number,
        image: image,
        type: postBody.type,
        github: postBody.github,
        blog: postBody.blog,
        content: postBody.content,
        position: postBody.position
      });
    } else {
      console.log('이미지 업로드 실패');
    }
  };

  const deleteImage = () => {
    setFileUrl(empty_profile);
    setpostBody({
      id: postBody.id,
      login_id: postBody.login_id,
      email: postBody.email,
      name: postBody.name,
      number: postBody.number,
      image: empty_profile,
      type: postBody.type,
      github: postBody.github,
      blog: postBody.blog,
      content: postBody.content,
      position: postBody.position
    });
  };

  // React Handle Function
  const handlecontentChange = (event) => {
    setpostBody((prev) => ({
      ...prev,
      content: event.target.value
    }));
  };
  const handlegithubChange = (event) => {
    setpostBody((prev) => ({
      ...prev,
      github: event.target.value
    }));
  };
  const handleblogChange = (event) => {
    setpostBody((prev) => ({
      ...prev,
      blog: event.target.value
    }));
  };
  const handlepositionChange = (event) => {
    setpostBody((prev) => ({
      ...prev,
      position: event.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Mypage</title>
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
              <h2 style={{ color: '#006400' }}>회원 정보 수정</h2>
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
                    py: 2
                  }}
                />
                <h3>아이디</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <h4>{postBody.login_id}</h4>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>회원타입</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <h4>{postBody.type}</h4>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>학번</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <h4>{postBody.number}</h4>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>이름</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <h4>{postBody.name}</h4>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>프로필 사진</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <div className="img__box">
                  <img
                    src={fileUrl}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%'
                    }}
                  />
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="info"
                    sx={{
                      marginTop: 1,
                      width: 180
                    }}
                  >
                    <label
                      htmlFor="file"
                      style={{
                        width: 100
                      }}
                    >
                      <h3
                        style={{
                          color: '#ffffff'
                        }}
                      >
                        사진 선택
                      </h3>
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      style={{
                        color: '#ffffff',
                        display: 'none'
                      }}
                      onChange={processImage}
                    ></input>
                  </Button>
                  <Box
                    sx={{
                      minHeight: '100%',
                      py: 0.5
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{
                      marginTop: 1,
                      width: 180
                    }}
                    onClick={deleteImage}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      기본 이미지로 변경
                    </h3>
                  </Button>
                </div>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>비밀번호 수정</h3>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 0.5
                  }}
                />
                <Link to="/login/password">
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    sx={{
                      marginTop: 1
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      비밀번호 수정
                    </h3>
                  </Button>
                </Link>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>github주소</h3>
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
                  placeholder="www.github.com"
                  value={postBody.github}
                  variant="outlined"
                  onChange={handlegithubChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>blog주소</h3>
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
                  placeholder="www.blog.com"
                  value={postBody.blog}
                  variant="outlined"
                  onChange={handleblogChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>포지션</h3>
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
                  placeholder="포지션을 입력해주세요"
                  value={postBody.position}
                  variant="outlined"
                  onChange={handlepositionChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                <h3>자기소개</h3>
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
                  multiline
                  rows={4}
                  placeholder="자기소개를 입력해주세요"
                  value={postBody.content}
                  variant="outlined"
                  onChange={handlecontentChange}
                />
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
                {/* <Link to="/app/dashboard"> */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={update_user}
                >
                  <h3
                    style={{
                      color: '#ffffff'
                    }}
                  >
                    수정
                  </h3>
                </Button>
                {/* </Link> */}
                <Link to="/app/dashboard">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      float: 'right'
                    }}
                    onClick={delete_user}
                  >
                    <h3
                      style={{
                        color: '#ffffff'
                      }}
                    >
                      탈퇴
                    </h3>
                  </Button>
                </Link>
                <Box
                  sx={{
                    minHeight: '100%',
                    py: 2
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpUpdate;
