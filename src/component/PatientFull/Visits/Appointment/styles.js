import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 8px 6px 8px',
    margin: '16px 0 6px 0',
    color: templates.colors.border,
    border: templates.borders.light,
    borderRadius: '8px'
  },

  button: {
    cursor: 'pointer'
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
    margin: '6px 0 6px 0',
    width: '100%'
  },

  date: {
    icon: {
      height: '28px',
      width: '28px'
    }
  },

  list: {}
}
