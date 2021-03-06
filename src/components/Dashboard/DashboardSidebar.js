import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Drawer, List, Button } from '@material-ui/core';
import NavItem from 'src/components/NavItem';
import Api from 'src/Api/Api';

const logout = async () => {
  const target = '/app/dashboard';
  let logout_response = await Api.getLogout();
  if (logout_response.data.sucess) {
    sessionStorage.clear();
    window.location.href = target;
  }
};

const isLogin = () => {
  if (sessionStorage.getItem('user_token')) {
    return {
      href: '/mypage/page',
      title: '마이페이지'
    };
  } else {
    return {
      href: '/login/login',
      title: '로그인 및 회원가입'
    };
  }
};

const items = [
  isLogin(),
  {
    href: '/app/dashboard',
    title: '인터넷디스크'
  },
  {
    href: '/se/team',
    title: '팀원 모집'
  }
];

const logoutbutton = () => {
  if (sessionStorage.getItem('user_token')) {
    return (
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          logout();
        }}
      >
        <h3
          style={{
            color: '#ffffff'
          }}
        >
          로그아웃
        </h3>
      </Button>
    );
  }
};

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const logout = async () => {
    let logout_response = await Api.getLogout();
    if (logout_response.data.sucess) {
      sessionStorage.clear();
      window.location.href = '';
    }
  };
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              onClick={function () {
                if (item.title === '로그아웃') {
                  logout();
                }
              }}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        PaperProps={{
          sx: {
            width: 256
          }
        }}
      >
        {content}
        {logoutbutton()}
      </Drawer>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
