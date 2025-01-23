import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...templates.fonts.common,
    margin: 'auto',
    width: '100%',
    maxWidth: '1024px',
    border: 'none',
    borderRadius: '8px'
  },

  icon: {
    textAlign: 'right',
    margin: '8px'
  },

  button: {
    height: '10px'
  },

  box: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 8px 0'
  },

  head: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      ...templates.fonts.large
    },

    icon: {
      cursor: 'pointer'
    },

    close: {
      width: '100%',
      textAlign: 'right'
    },

    nib: {
      fontWeight: 'bold',
      margin: '0 0 0 16px',
      ...templates.fonts.large
    }
  },

  fio: {
    textAlign: 'center',
    marginTop: '10px',
    fontWeight: 'bold',
    ...templates.fonts.large
  },

  age: {
    textAlign: 'center',
    marginTop: '10px',
    fontWeight: 'bold',
    ...templates.fonts.common
  },

  popup: {
    container: {
      margin: '0 0 16px 0',
      borderBottom: 'none'
    },
    content: {
      ...templates.fonts.small,
      marginLeft: '16px',
      color: templates.colors.text
    },
    frame: {
      boxSizing: 'border-box',
      border: '1px solid ' + templates.colors.frame,
      borderRadius: '4px',
      padding: '8px',
      backgroundImage:
        'linear-gradient(to right, ' +
        templates.colors.window +
        ', ' +
        templates.colors.frame +
        ')'
    }
  }
}
