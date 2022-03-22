import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  footer: {
    height: '8em',
    color: 'rgb(161, 161, 170)',
    background: 'rgb(75, 85, 99)',
    bottom: '0',
    width: '100%',
    position: 'absolute',
    '& p': {
      display: 'inline',
      width: 'fit-content',
      padding: '0',
      marginRight: '5px',
    },
  },
  copyright: {
    padding: '2em 1em',
    float: 'left',
  },
  socials: {
    padding: '2em 1em',
    float: 'right',
  },
  socialsLink: {
    color: 'rgb(161, 161, 170)',
    display: 'inline',
    width: 'fit-content',
    padding: '0',
    marginRight: '5px',
  },
}));
