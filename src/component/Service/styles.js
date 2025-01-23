import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid ' + templates.colors.frame,
    borderRadius: '8px',
    padding: '8px'
  },

  service: {
    container: {
      borderBottom: 'none'
    },
    edit: {
      border: 'none',
      whiteSpace: 'wrap'
    }
  },

  material: {
    container: {
      margin: '16px 0 0 0',
      border: 'none',
      cursor: 'pointer'
    },
    edit: {
      border: 'none'
    },
    label: {
      padding: '4px 8px 4px 8px',
      borderRadius: '4px',
      backgroundImage:
        'linear-gradient(to right, ' +
        templates.colors.shadow +
        ', ' +
        templates.colors.window +
        ')',
      backgroundColor: templates.colors.shadow,
      width: '100%'
    }
  },

  department: {
    container: {
      margin: '16px 0 0 0',
      borderBottom: 'none'
    },
    edit: {
      flex: '1 0 0%',
      whiteSpace: 'normal',
      height: 'auto'
    },
    label: {}
  },

  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '4px 0 4px 0'
  },

  pay: {
    container: {
      width: '120px',
      margin: '0 4px 0 16px',
      border: templates.borders.lightDash
    },
    edit: {
      textAlign: 'center',
      ...templates.fonts.small,
      minHeight: '18px',
      border: 'none'
    }
  },

  reason: {
    container: {
      // width: '260px',
      margin: '0 4px 0 16px',
      border: templates.borders.lightDash,
      flex: '1 1 100%'
    },
    edit: {
      textAlign: 'center',
      ...templates.fonts.xSmall,
      minHeight: '18px',
      border: 'none',
      whiteSpace: 'normal'
    }
  },

  count: {
    container: {
      width: '52px',
      margin: '0 4px 0 16px',
      alignItems: 'center',
      border: templates.borders.lightDash
    },
    edit: {
      textAlign: 'center',
      ...templates.fonts.small,
      minHeight: '18px',
      border: 'none'
    }
  },

  cost: {
    container: {
      width: '52px',
      margin: '0 4px 0 4px',
      alignItems: 'center',
      border: 'none'
    },
    edit: {
      textAlign: 'center',
      ...templates.fonts.small,
      minHeight: '18px'
    }
  },

  text: {
    ...templates.fonts.small
  }
}
