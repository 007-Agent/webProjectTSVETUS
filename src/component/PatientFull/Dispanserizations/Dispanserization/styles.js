import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...templates.fonts.xSmall
  },

  item: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '12px 0 0 0',
    border: `1px solid ${templates.colors.border}`,
    borderRadius: '8px',
    padding: '4px'
  },

  box: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 16px 0 0'
  },

  caption: {
    fontStyle: 'italic',
    color: templates.colors.border
  },

  value: {
    margin: '4px 0 0 0'
  }
}
