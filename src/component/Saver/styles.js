import { templates } from 'styles'
export default {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    justifyContent: 'space-around',
    marginTop: '16px',
    width: '100%',
    opacity: '0.8',
    zIndex: '9'
  },

  show: {
    display: 'flex'
  },

  hidden: {
    display: 'none'
  },

  save: {
    container: {
      opacity: '1',
      color: '#fff',
      backgroundColor: '#3d3',
      borderRadius: '8px'
    },

    wait: {
      opacity: '1',
      color: '#ff3',
      backgroundColor: '#9698d6',
      borderRadius: '8px'
    }
  },

  cancel: {
    container: {
      opacity: '1',
      color: '#ff3',
      backgroundColor: '#d33',
      borderRadius: '8px'
    },

    wait: {
      opacity: '1',
      color: '#ff3',
      backgroundColor: '#9698d6',
      borderRadius: '8px'
    }
  },
  textChange: {
    width: '400px',
    margin: '0 0 0 16px',
    opacity: '1',
    color: '#f00',
    backgroundColor: '#FFFFFF'
  },
  containerSave: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '8px',
    opacity: '1'
  },

  form: {
    container: {
      borderRadius: '16px',
      width: '420px'
    }
  },
  text: {
    container: {
      width: '400px',
      margin: '0 0 0 16px',
      opacity: '1',
      color: '#ff0'
    }
  },
  buttons: {
    close: {
      width: '120px',
      ...templates.fonts.common
    }
  },
  buttonSave: {
    margin: '32px',
    maxWidth: '380px',
    borderRadius: '16px',
    padding: '16px',
    ...templates.fonts.common
  },
  formSave: {
    container: {
      borderRadius: '16px',
      width: '420px'
    },

    caption: {
      ...templates.fonts.common
    },

    content: {
      ...templates.fonts.common,
      textAlign: 'center'
    },

    buttons: {
      close: {
        width: '120px',
        ...templates.fonts.common
      }
    }
  }
}
