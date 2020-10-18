import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: '100%',
    boxSizing: 'border-box'
  },
  submit: {
    display: 'block',
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));
