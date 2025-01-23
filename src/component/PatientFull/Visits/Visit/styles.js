import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0 16px 0'
  },

  expired: {
    opacity: '0.5'
  },

  active: {
    opacity: '1',
    border: templates.borders.light,
    borderRadius: '4px',
    padding: '8px'
  },

  box: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  date: {
    color: templates.colors.border,
    margin: '0 8px 0 0'
  },

  time: {
    color: templates.colors.border,
    margin: '0 8px 0 0'
  },

  doctor: {
    margin: '0 8px 0 0'
  },

  speciality: {
    fontStyle: 'italic',
    margin: '0 8px 0 0'
  },

  room: {
    fontStyle: 'italic',
    margin: '0 8px 0 0'
  },

  cancel: {
    container: {
      justifySelf: 'flex-end',
      borderRadius: '4px',
      ...templates.fonts.xSmall,
      padding: '4px'
    }
  }
}
