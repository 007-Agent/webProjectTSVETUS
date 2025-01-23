import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px 0 8px 0'
  },

  block: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  nib: {
    fontWeight: 'bold',
    textAlign: 'left',
    ...templates.fonts.large
  },

  fio: {
    fontWeight: 'bold',
    textAlign: 'center',
    ...templates.fonts.common
  },

  tip: {
    fontWeight: 'bold',
    textAlign: 'right',
    ...templates.fonts.large
  },

  age: {
    fontWeight: 'normal',
    textAlign: 'center',
    ...templates.fonts.small
  }
}
