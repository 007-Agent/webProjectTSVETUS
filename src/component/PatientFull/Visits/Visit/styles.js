import { templates } from 'styles'

export default {
  container: {
    display: 'flex',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0 16px 0',
    fontSize: '20px',
    height: '30px'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0px',

    gap: '0 10px'
  },
  date: {
    color: 'rgb(189, 122, 81)'
  },
  time: {
    color: 'rgb(189, 122, 81)'
  },
  doctor: {
    fontStyle: 'italic',

    fontFamily: 'Arial',
    fontSize: '18px'
  },
  room: {
    fontStyle: 'italic',
    margin: '0 8px 0 0'
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

  // box: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start'
  // },

  // date: {
  //   color: templates.colors.border,
  //   margin: '0 8px 0 0',
  //   color: 'black'
  // },

  // time: {
  //   color: templates.colors.border,
  //   margin: '0 8px 0 0'
  // },

  // doctor: {
  //   margin: '0 8px 0 0'
  // },

  speciality: {
    fontStyle: 'italic'
  },

  // room: {
  //   fontStyle: 'italic',
  //   margin: '0 8px 0 0'
  // },

  // cancel: {
  //   container: {
  //     justifySelf: 'flex-end',
  //     borderRadius: '4px',
  //     ...templates.fonts.xSmall,
  //     padding: '4px'
  //   }
  // },
  cancel: {
    display: 'flex',
    justifySelf: 'flex-end',
    borderRadius: '4px',
    padding: '4px'
  },
  icon: {
    width: '25px',
    height: '25px',
    cursor: 'pointer'
  }
}
