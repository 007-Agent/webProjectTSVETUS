import { templates } from 'styles'

export default {
  group: {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      flex: '1',
      border: templates.borders.light,
      borderRadius: '8px 22px 22px 8px',
      padding: '8px'
    },

    label: {
      margin: '0 0 -16px 8px',
      padding: '4px'
    }
  },

  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px 0 8px 0'
  },

  text: {
    container: {
      width: '100%'
    },
    edit: {},
    label: {},
    icon: {}
  },

  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px 0 0 0'
  },

  iconDelete: {
    color: '#d22',
    flexShrink: '0',
    width: '32px',
    height: '32px',
    cursor: 'pointer'
  },

  ref: {
    container: {
      width: '100%',
      border: 'none',
      cursor: 'pointer',
      backgroundImage:
        'linear-gradient(to right, ' +
        templates.colors.shadow +
        ', ' +
        templates.colors.window +
        ')',
      backgroundColor: templates.colors.shadow,
      borderRadius: '4px 16px 16px 4px'
    },

    edit: {
      border: 'none'
    },

    label: {
      cursor: 'pointer',
      ...templates.fonts.common
    },

    item: {
      ...templates.fonts.common
    },

    icon: {
      flexShrink: '0',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      color: 'green'
    }
  }
}
