import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '16px 0 0 0',
    ...templates.fonts.small
  },
  number: {
    margin: '0 8px 0 0'
  },
  person: {
    margin: '0 8px 0 0'
  },
  text: {
    margin: '0 8px 0 0',
    color: templates.colors.border
  },
  period: {
    margin: '0 8px 0 0'
  },
  date: {},
  begin: {
    display: 'flex'
  }
}
