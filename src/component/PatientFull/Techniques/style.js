import { GiApc } from 'react-icons/gi'

export default {
  main_content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  contentDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '0 20px',
    justifyContent: 'content'
  },
  textTitile: {
    color: 'rgb(189, 122, 81',
    fontSize: '21px'
  },
  buttonDate: {
    flex: 1,
    outline: 'none', // Note: React Native doesn't support outline directly; this may not apply
    overflow: 'hidden',
    height: 22,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
    borderWidth: 1,
    borderColor: 'rgb(189, 149, 133)',
    color: 'rgb(189, 122, 81',
    textAlign: 'left',
    fontFamily: 'Arial',
    fontSize: 21,
    borderRadius: 4,
    flexDirection: 'row', // Assuming default for display: flex
    alignItems: 'stretch',
    width: '150px',
    justifyContent: 'space-between',
    marginLeft: '10px'
  },
  label: {
    fontSize: '21px',
    color: 'rgb(189, 122, 81'
  },
  ButtonConfirm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255, 251, 199, 0.35)',
    color: 'rgb(0, 0, 0)',
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgb(189, 149, 133)',
    fontFamily: 'Arial',
    fontSize: 20,
    padding: '3px 12px;',
    cursor: 'pointer'
  }
}
