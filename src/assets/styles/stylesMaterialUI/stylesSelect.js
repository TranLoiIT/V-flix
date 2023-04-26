export const stylesSelectFilterAdmin = {
  container: (styles) => ({
    ...styles,
    flex: '1',
    ':not(:last-child)': {
      marginRight: '1rem',
    },
  }),
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: '#333',
    border: 'none',
    outline: isFocused ? 'none' : 'none',
    borderRadius: '0.375rem',
    minHeight: '43px',
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? 'rgb(229, 9, 20)' : 'rgb(156,163,175)',
    fontSize: '20px',
    backgroundColor: '#333',
    ':hover': {
      backgroundColor: '#555',
    },
    ':checked': {
      color: 'rgb(229, 9, 20)',
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#333',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0 0 0 1.5rem',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'rgb(156,163,175)',
    fontSize: '20px',
    fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
    lineHeight: '2rem',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'rgb(156,163,175)',
    fontSize: '20px',
    fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
    lineHeight: '2rem',
  }),
  multiValue: (styles) => ({
    ...styles,
    fontSize: '14px',
    margin: '0 0 0 4px',
    backgroundColor: 'white',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  indicatorContainer: (styles) => ({
    ...styles,
    ':hover': {
      backgroundColor: 'hsl(0, 0%, 40%)',
    },
  }),
};

export const stylesSelectCreateEditFilm = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: '#333',
    border: 'none',
    outline: isFocused ? 'none' : 'none',
    borderRadius: '0.375rem',
    minHeight: '43px',
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? 'rgb(229, 9, 20)' : 'rgb(156,163,175)',
    fontSize: '16px',
    backgroundColor: '#333',
    ':hover': {
      backgroundColor: '#555',
    },
    ':checked': {
      color: 'rgb(229, 9, 20)',
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#333',
    borderRadius: '0.375rem',
    overflow: 'hidden',
  }),
  input: (styles) => ({
    ...styles,
    color: 'white',
    fontSize: '16px',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0 0 0 2rem',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'rgb(156,163,175)',
    fontSize: '16px',
    fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
    lineHeight: '2.4rem',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'rgb(156,163,175)',
    fontSize: '16px',
    fontFamily: '"Netflix Sans", Arial, Helvetica, sans-serif',
    lineHeight: '2.4rem',
  }),
  multiValue: (styles) => ({
    ...styles,
    fontSize: '14px',
    margin: '0 0 0 4px',
    backgroundColor: 'white',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    ':hover': {
      backgroundColor: 'transparent',
    },
    padding: '17px',
  }),
};
