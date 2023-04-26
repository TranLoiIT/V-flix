const { Switch, withStyles } = require('@material-ui/core');

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 28,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(24px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: 'rgb(229, 9, 20)',
        borderColor: 'rgb(229, 9, 20)',
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${'rgb(229, 9, 20)'}`,
    borderRadius: 28 / 2,
    opacity: 1,
    backgroundColor: 'rgb(229, 9, 20)',
  },
  checked: {},
}))(Switch);

export default CustomSwitch;
