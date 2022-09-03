import { darken } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const themeDark = createTheme({
  color: {
    banner: {
      background: {
        high: '#0A1929',
        low: '#556275',
        top: 'linear-gradient(to bottom right, #0A1929, #556275)',
        bottom: 'linear-gradient(to bottom right, #556275, #0A1929)',
      },
      foreground: {
        base: '#E1CCAA',
        strong: '#AF9B7B',
      },
      control: {
        background: '#303E4F',
        base: '#AF9B7B',
      },
      boxShadow: `0 0 4px 1px ${darken('#AF9B7B', .8)}`,
    },
    background: {
      base: '#0A1929',
      paper: '#303E4F',
    },
    foreground: {
      base: '#E1CCAA',
    },
    control: {
      base: '#AF9B7B',
    },
  },
  icon: {
    check: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24">' +
        '<path fill="rgb(48,62,79)" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>' +
        '</svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24">' +
        '<path fill="rgb(48,62,79)" d="M19,13H5V11H19V13Z" />' +
        '</svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" ' +
        'stroke="rgb(48,62,79)" fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>' +
        '<circle cx="12" cy="7" r="4"></circle>' +
        '</svg>',
    monitor: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" ' +
        'stroke="rgb(48,62,79)" fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' +
        '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>' +
        '<line x1="8" y1="21" x2="16" y2="21"></line>' +
        '<line x1="12" y1="17" x2="12" y2="21"></line>' +
        '</svg>',
    sun: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" ' +
        'stroke="rgb(175,155,123)" fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' +
        '<circle cx="12" cy="12" r="5"></circle>' +
        '<line x1="12" y1="1" x2="12" y2="3"></line>' +
        '<line x1="12" y1="21" x2="12" y2="23"></line>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>' +
        '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>' +
        '<line x1="1" y1="12" x2="3" y2="12"></line>' +
        '<line x1="21" y1="12" x2="23" y2="12"></line>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>' +
        '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' +
        '</svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" viewBox="0 0 24 24" ' +
        'stroke="rgb(175,155,123)" fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' +
        '</svg>',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
});

export { themeDark };
