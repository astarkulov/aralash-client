import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import MenuIcon from "../../UI/Icons/MenuIcon.tsx";

const StyledLink = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const Burger = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <div>
            <List>
                <ListItem button onClick={() => { navigate('/resumes'); setMobileOpen(false); }}>
                    <StyledLink primary="Resumes" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/template'); setMobileOpen(false); }}>
                    <StyledLink primary="Template" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/criterion'); setMobileOpen(false); }}>
                    <StyledLink primary="Criterion" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                    <StyledLink primary="Войти" />
                </ListItem>
                <ListItem button onClick={() => { navigate('/register'); setMobileOpen(false); }}>
                    <StyledLink primary="Регистрация" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'ltr' ? 'left' : 'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                {drawerContent}
            </Drawer>
        </div>
    );
};

export default Burger;