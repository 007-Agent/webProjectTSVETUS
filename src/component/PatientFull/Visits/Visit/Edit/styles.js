import { templates } from 'styles'

export default {
  form: {
    container: {
      padding: '8px 16px 8px 16px',
      maxWidth: '420px'
    },
    content: {},
    buttons: {
      continue: { color: '#131868' }
    }
  },
  content: {
    color: templates.colors.border,
    ...templates.fonts.small,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    width: '100%',
    margin: '8px 0 0 0',
    color: templates.colors.text,
    ...templates.fonts.common
  },
  date: {},
  time: {},
  speciality: {
    margin: '16px 0 0 0'
  },
  doctor: {
    margin: '4px 0 8px 0',
    textAlign: 'center',
    color: templates.colors.text,
    ...templates.fonts.common
  },
  text: {
    container: {
      margin: '8px 0 8px 0'
    },
    label: {}
  },
  group: {
    container: {
      margin: '8px 0 8px 0',
      width: '100%'
    },
    label: {},
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '4px'
    }
  },
  caption: {
    color: templates.colors.message,
    ...templates.fonts.common
  }
}
