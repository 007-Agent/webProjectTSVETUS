import { templates } from 'styles'

export default {
  container: {
    width: '100%',
    margin: '8px 0 16px 0'
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },

  left: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'flex-start'
  },

  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: templates.colors.border,
    ...templates.fonts.small
  },

  date: {
    container: {
      borderBottom: 'none',
      width: '100px'
    },
    edit: {
      textAlign: 'left',
      minHeight: '0',
      color: templates.colors.border,
      ...templates.fonts.small
    }
  },

  time: {
    container: {
      borderBottom: 'none',
      width: '52px'
    },
    edit: {
      textAlign: 'right',
      minHeight: '0',
      color: templates.colors.border,
      ...templates.fonts.small
    }
  },

  day: {
    container: {
      borderBottom: 'none',
      width: '172px'
    },
    edit: {
      minHeight: '0',
      color: templates.colors.border,
      ...templates.fonts.small,
      border: 'none',
      textAlign: 'center'
    },
    label: {
      minHeight: '0',
      color: templates.colors.border,
      ...templates.fonts.small
    }
  },

  group: {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flex: '1',
      padding: '16px'
    }
  },

  memo: {
    container: {}
  },

  show: {
    width: '100%',
    textAlign: 'center',
    color: templates.colors.border
  },

  table: {
    container: {
      tableLayout: 'fixed',
      width: '100%',
      borderCollapse: 'collapse',
      margin: '8px 0 0 0'
    },
    head: {
      color: templates.colors.border,
      ...templates.fonts.tiny
    },
    caption: {
      textAlign: 'center',
      border: templates.borders.light,
      padding: '4px 0 4px 0',
      fontWeight: 'bold'
    },
    body: {
      color: templates.colors.border,
      ...templates.fonts.xSmall
    },
    data: {
      textAlign: 'center',
      border: templates.borders.light,
      padding: '4px 0 4px 0'
    }
  },

  param: {
    container: {
      borderBottom: 'none'
    },
    edit: {
      minHeight: '28px',
      color: templates.colors.text,
      ...templates.fonts.small,
      border: 'none',
      textAlign: 'center'
    }
  }
}
