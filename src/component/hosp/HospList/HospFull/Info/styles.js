import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  ward: {
    display: 'flex',
    justifyContent: 'center',
    color: templates.colors.border,
    ...templates.fonts.common
  },

  type: {
    display: 'flex',
    justifyContent: 'center',
    color: templates.colors.border,
    ...templates.fonts.common
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: '8px 0 0 0',
    color: templates.colors.border,
    ...templates.fonts.common
  },

  age: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 0 0',
    width: '100%',
    textAlign: 'right',
    color: templates.colors.border,
    ...templates.fonts.small
  },

  finance: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 0 0',
    width: '100%',
    textAlign: 'right',
    color: templates.colors.border,
    ...templates.fonts.small
  },

  nib: {
    display: 'flex',
    justifyContent: 'center',
    color: templates.colors.text,
    ...templates.fonts.common
  },

  fio: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: templates.colors.text,
    ...templates.fonts.common
  },

  allergy: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 0 0',
    width: '100%',
    textAlign: 'right',
    color: templates.colors.text,
    ...templates.fonts.common
  }
}
