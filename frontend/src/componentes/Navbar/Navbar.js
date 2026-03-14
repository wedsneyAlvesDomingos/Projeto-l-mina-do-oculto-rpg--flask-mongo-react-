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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate, useLocation } from "react-router-dom";
import MaterialUISwitch from '../themes/DarkModeToggleSwitch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from "../../assets/images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UIcon from "../../assets/images/userIcon.png";
import "./navcss.css"

/* ── Ícone SVG de personagem reutilizável ── */
const PersonagemIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 19.2L3.8 21M4.7 13.8L5.6 17.4M5.6 17.4L9.2 18.3M5.6 17.4L2.9 20.1M16.4 3.9L7.4 12.9L7.85 15.15L10.1 15.6L19.1 6.6L20 3L16.4 3.9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 19.2L20.2 21M19.3 13.8L18.4 17.4M18.4 17.4L21.1 20.1M18.4 17.4L16.6 17.85L14.8 18.3M9.3 11L4.9 6.6L4 3L7.6 3.9L12 8.3M12.1 13.8L13.9 15.6L16.15 15.15L16.6 12.9L14.8 11.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const NAV_ITEMS = [
    { label: 'Início',       path: '/home',      icon: <HomeIcon />,         value: 0 },
    { label: 'Personagens',  path: '/character', icon: <PersonagemIcon />,   value: 1 },
    { label: 'Wiki',         path: '/wiki',      icon: <PublicIcon />,       value: 2 },
];

function ResponsiveAppBar() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [user, setUser] = React.useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;

    // Sincroniza user com localStorage (mesmo tab e outras abas)
    React.useEffect(() => {
        const syncFromStorage = () => setUser(JSON.parse(localStorage.getItem('user') || 'null'));
        window.addEventListener('storage', syncFromStorage);
        // Evento customizado disparado pelo ProfilePage ao salvar avatar/nome
        window.addEventListener('userProfileUpdated', syncFromStorage);
        const interval = setInterval(() => {
            const fresh = JSON.parse(localStorage.getItem('user') || 'null');
            setUser(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(fresh)) return fresh;
                return prev;
            });
        }, 1500);
        return () => {
            window.removeEventListener('storage', syncFromStorage);
            window.removeEventListener('userProfileUpdated', syncFromStorage);
            clearInterval(interval);
        };
    }, []);

    // Se o usuário está logado mas não tem avatar no localStorage, busca do backend
    React.useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('user') || 'null');
        if (!stored?.id || stored?.avatar) return;
        fetch(`${baseUrl}/users/${stored.id}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data?.avatar) {
                    const updated = { ...stored, avatar: data.avatar };
                    localStorage.setItem('user', JSON.stringify(updated));
                    setUser(updated);
                }
            })
            .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    React.useEffect(() => {
        const path = location.pathname;
        if (path.includes('/home'))           setValue(0);
        else if (path.includes('/character')) setValue(1);
        else if (path.includes('/wiki'))      setValue(2);
        else                                  setValue("none");
    }, [location.pathname]);

    const handleNavigate = (path) => {
        navigate(path, { replace: true });
        setDrawerOpen(false);
    };
    const handleOpenUserMenu  = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUserMenu = ()  => setAnchorElUser(null);
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '100%', boxSizing: 'border-box', gap: '10px' }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '100%', boxSizing: 'border-box', px: 3, minHeight: '48px !important' }} className="navbar">

                    {/* ── Logo + Tabs (desktop) ── */}
                    <Box sx={{ display: 'flex', gap: 8 }}>
                        <svg className="navbar-deco-svg" width="210" height="60" viewBox="0 0 248 63" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
                            <path d="M0 -1H-1V0V61V62H0H182.25H182.665L182.959 61.7057L243.709 0.705653L245.407 -1H243H0Z" fill="#D9D9D9" stroke="#BB8130" strokeWidth="2" />
                        </svg>

                        <img src={logo} style={{ width: '130px', zIndex: '2' }} alt="logo" />

                        {/* Tabs — visíveis só em md+ */}
                        <Tabs
                            value={value}
                            aria-label="navegação principal"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            {NAV_ITEMS.map(({ label, path, icon, value: v }) => (
                                <Tab
                                    key={label}
                                    value={v}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {icon}
                                            <Typography variant="p" sx={{ ml: 1 }}>{label}</Typography>
                                        </Box>
                                    }
                                    onClick={() => handleNavigate(path)}
                                    sx={{ fontWeight: value === v ? 'bold' : 'normal', color: '#fff' }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {/* ── Lado direito ── */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Switch dark/light — apenas md+ */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <MaterialUISwitch />
                        </Box>

                        {/* Avatar + menu de usuário — apenas md+ */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="Abrir configurações">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user?.name} src={user?.avatar || UIcon} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/perfil'); }}>
                                    <AccountCircleIcon fontSize="small" sx={{ mr: 1, color: '#BB8130' }} />
                                    <Typography textAlign="center">Meu Perfil</Typography>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <LogoutIcon fontSize="small" sx={{ mr: 1, color: '#EF9A9A' }} />
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* Hambúrguer — apenas xs/sm */}
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
                            aria-label="abrir menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* ── Drawer mobile ── */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{ sx: { width: 240, backgroundColor: '#1a1a2e', color: '#fff' } }}
                >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar alt={user?.name} src={user?.avatar || UIcon} sx={{ width: 36, height: 36 }} />
                        <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>{user?.name || 'Usuário'}</Typography>
                    </Box>
                    <Divider sx={{ borderColor: '#BB813044' }} />

                    <List>
                        {NAV_ITEMS.map(({ label, path, icon, value: v }) => (
                            <ListItem key={label} disablePadding>
                                <ListItemButton
                                    selected={value === v}
                                    onClick={() => handleNavigate(path)}
                                    sx={{
                                        '&.Mui-selected': { backgroundColor: '#BB813033', borderLeft: '3px solid #BB8130' },
                                        '&:hover': { backgroundColor: '#BB813022' },
                                        color: '#fff',
                                    }}
                                >
                                    <ListItemIcon sx={{ color: value === v ? '#BB8130' : '#ccc', minWidth: 36 }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{ fontSize: 14, fontFamily: '"Esteban", serif', fontWeight: value === v ? 'bold' : 'normal' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ borderColor: '#BB813044', mt: 'auto' }} />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => { handleNavigate('/perfil'); }}
                                sx={{ color: '#BB8130', '&:hover': { backgroundColor: '#BB813022' } }}
                            >
                                <ListItemIcon sx={{ color: '#BB8130', minWidth: 36 }}><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Meu Perfil" primaryTypographyProps={{ fontSize: 14, fontFamily: '"Esteban", serif' }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ justifyContent: 'center', py: 1 }}>
                            <MaterialUISwitch />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={logout} sx={{ color: '#EF9A9A', '&:hover': { backgroundColor: '#931C4A22' } }}>
                                <ListItemIcon sx={{ color: '#EF9A9A', minWidth: 36 }}><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 14 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </AppBar>
    );
}

export default ResponsiveAppBar;
