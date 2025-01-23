import { templates } from 'styles'
export default {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...templates.fonts.small,
    margin: '8px 0 0 0px'
  },
  fio: {
    //    flex: '1 1 100%',
    margin: '0 8px 0 0',
    fontStyle: 'italic'
  },
  icon: {
    cursor: 'pointer',
    height: '22px',
    width: '22px'
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 8px 0'
  },
  obs: {
    cursor: 'pointer'
  }
}
