import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...templates.fonts.small,
    margin: '8px 0 0 0px'
  },

  date: {
    color: templates.colors.border,
    margin: '0 8px 0 0'
  },

  fio: {
    //    flex: '1 1 100%',
    margin: '0 8px 0 0'
  },

  diagnosis: {
    fontStyle: 'italic',
    //    flex: '1 1 100%',
    margin: '0 8px 0 0'
  },

  iconBox: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  icon: {
    container: {
      cursor: 'pointer',
      width: '22px',
      height: '22px'
    }
  }
}
