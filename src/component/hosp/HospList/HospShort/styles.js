import { templates } from 'styles'

export default {
  container: {
    width: '420px',
    margin: '8px 0 0 8px',
    borderRadius: '8px',
    padding: '8px',
    border: `3px solid ${templates.colors.frame}`,
    cursor: 'pointer'
  },

  first: {
    border: `3px solid green`
  },

  last: {
    border: `3px solid red`
  },

  ward: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 8px 0 8px',
    color: templates.colors.border,
    ...templates.fonts.common
  },

  patient: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px 8px 0 8px',
    color: templates.colors.border,
    ...templates.fonts.common
  },

  age: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 8px 0 8px',
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

  stay: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 8px 0 8px',
    color: templates.colors.border,
    ...templates.fonts.small
  }
}
