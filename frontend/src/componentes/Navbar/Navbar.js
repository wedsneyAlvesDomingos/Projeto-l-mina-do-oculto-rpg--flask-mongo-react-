import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from "react-router-dom";
import MaterialUISwitch from '../themes/DarkModeToggleSwitch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from "../../assets/images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import UIcon from "../../assets/images/userIcon.png";
import "./navcss.css"

function ResponsiveAppBar() {
    const [offlineCount, setOfflineCount] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElPopover, setAnchorElPopover] = React.useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    React.useEffect(() => {
        const path = location.pathname;
        if (path.includes('/home')) {
            setValue(0);
        }
        else if (path.includes('/character')) {
            setValue(1);
        }
        else if (path.includes('/wiki')) {
            setValue(2);
        }
        else{
            setValue("none");
        }
      
    }, [location.pathname]);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleNavigate = (path) => {
        navigate(path, { replace: true });
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };
    const handlePopoverOpen = (event) => {
        setAnchorElPopover(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };
    const openPopover = Boolean(anchorElPopover);
    const idPopover = openPopover ? 'simple-popover' : undefined;

    return (
        <AppBar position="static" >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '100%', boxSizing: 'border-box', gap: '10px' }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '100%', boxSizing: 'border-box', px: 3 }} className="navbar">
                    <Box sx={{ display: 'flex', gap: 8 }} >
                        <svg width="248" height="63" viewBox="0 0 248 63" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
                            <path d="M0 -1H-1V0V61V62H0H182.25H182.665L182.959 61.7057L243.709 0.705653L245.407 -1H243H0Z" fill="#D9D9D9" stroke="#BB8130" stroke-width="2" />
                        </svg>

                        <img src={logo} style={{ width: '150px', zIndex: '2' }} alt="logo" />
                        <Tabs
                            value={value}
                            aria-label="secondary tabs example"
                        > 
                            <Tab
                                key={'home'}
                                value={0}
                                label={<Box sx={{ display: 'flex', alignItens: 'center' }}><HomeIcon ></HomeIcon><Typography variant="p" sx={{ ml: 1 }}> Início</Typography></Box>}
                                onClick={() => handleNavigate('/home')}
                                sx={{ fontWeight: value === 0 ? 'bold' : 'normal', color: '#fff' }}
                            />
                            <Tab
                                key={'Personagens'}
                                value={1}
                                label={<Box sx={{ display: 'flex', alignItens: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 19.2L3.8 21M4.7 13.8L5.6 17.4M5.6 17.4L9.2 18.3M5.6 17.4L2.9 20.1M16.4 3.9L7.4 12.9L7.85 15.15L10.1 15.6L19.1 6.6L20 3L16.4 3.9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 19.2L20.2 21M19.3 13.8L18.4 17.4M18.4 17.4L21.1 20.1M18.4 17.4L16.6 17.85L14.8 18.3M9.3 11L4.9 6.6L4 3L7.6 3.9L12 8.3M12.1 13.8L13.9 15.6L16.15 15.15L16.6 12.9L14.8 11.1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg><Typography variant="p" sx={{ ml: 1 }}> Personagens</Typography></Box>}
                                onClick={() => handleNavigate('/character')}
                                sx={{ fontWeight: value === 0 ? 'bold' : 'normal', color: '#fff' }}
                            />
                            <Tab
                                key={'Wiki'}
                                value={2}
                                label={<Box sx={{ display: 'flex', alignItens: 'center' }}><PublicIcon ></PublicIcon><Typography variant="p" sx={{ ml: 1 }}> Wiki</Typography></Box>}
                                onClick={() => handleNavigate('/wiki')}
                                sx={{ fontWeight: value === 0 ? 'bold' : 'normal', color: '#fff' }}
                            />
                        </Tabs>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.name} src={UIcon} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={1} onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
                {/* <MaterialUISwitch flow={'column'} /> */}
            </Box>
        </AppBar>
    );
}

export default ResponsiveAppBar;
