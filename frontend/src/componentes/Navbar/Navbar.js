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

function ResponsiveAppBar() {
    const [offlineCount, setOfflineCount] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElPopover, setAnchorElPopover] = React.useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;


    // Update the tab value based on the current URL
    React.useEffect(() => {
        const path = location.pathname;
        if (path.includes('/home')) {
            setValue(0);
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
        <AppBar position="static">
            <Container sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '100%', boxSizing: 'border-box', gap: '10px' }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '100%', boxSizing: 'border-box' }}>
                    <Tabs
                        value={value}
                        aria-label="secondary tabs example"
                    >
                        <Tab
                            key={'home'}
                            value={0}
                            label={'Home'}
                            onClick={() => handleNavigate('/home')}
                            sx={{ fontWeight: value === 0 ? 'bold' : 'normal' ,color:'#fff'}}
                        />
                        
                    </Tabs>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                   

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: '#cccccc' }} alt={user.name.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
