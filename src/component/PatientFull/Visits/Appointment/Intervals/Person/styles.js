import { templates } from 'styles'

export default {
  container: {
    borderTop: templates.borders.light,
    margin: '24px 0 0 0'
  },

  caption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '16px 0 16px 0',
    cursor: 'pointer'
  },

  fio: {
    color: templates.colors.text,
    fontWeight: 'bold'
  },

  branch: {
    margin: '0 0 0 8px'
  },

  date: {
    container: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0',
      padding: '8px',
      width: '100%',
      // borderRadius: '8px',
      backgroundImage:
        'linear-gradient(to right, ' +
        templates.colors.window +
        ', ' +
        templates.colors.menu +
        ')'
    },
    caption: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      fontWeight: 'bold',
      width: '100%'
    },
    content: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%'
    },
    short: {
      margin: '4px',
      fontWeight: 'bold',
      backgroundColor: templates.colors.window,
      borderRadius: '4px',
      padding: '6px 8px 6px 8px',
      cursor: 'pointer'
    },
    text: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      margin: '4px 0 6px 0',
      width: '100%',
      ...templates.fonts.Small
    },
    intervals: {
      boxSizing: 'border-box',
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: templates.colors.window,
      margin: '8px',
      borderRadius: '8px',
      padding: '8px 0 8px 0'
    }
  },

  time: {}
}
