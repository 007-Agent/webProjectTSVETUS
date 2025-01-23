import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  block: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  title: {
    margin: '8px 0 0 8px',
    ...templates.fonts.xSmall
  },

  phone: {
    margin: '8px 0 0 8px',
    ...templates.fonts.small
  },

  fio: {
    margin: '8px 0 0 8px',
    ...templates.fonts.small
  }
}
