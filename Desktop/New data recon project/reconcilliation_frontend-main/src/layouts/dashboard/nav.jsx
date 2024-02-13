import PropTypes from 'prop-types';
import React, { useState, useEffect  } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';


export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, openNav, onCloseNav]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column'
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: active ? 'white' : 'text.primary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          backgroundColor: active ? '#5D100A' : 'transparent',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>
          <Box component="span">{item.title}</Box>
        </Box>
        {item.subMenus && (
          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </ListItemButton>

      {expanded && item.subMenus && (
        <Stack component="nav" spacing={0.5} sx={{ pl: 4 }}>
          {item.subMenus.map((subItem) => (
            <ListItemButton
              key={subItem.title}
              component={RouterLink}
              href={subItem.path}
              sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: active ? 'white' : 'text.primary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                backgroundColor: active ? '#5D100A' : 'transparent',
              }}
            >
              <Box component="span">{subItem.title}</Box>
            </ListItemButton>
          ))}
        </Stack>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
