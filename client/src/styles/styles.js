import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#fafbfa',
    marginLeft: '20vh',
    display: 'flex',
    justifySelf: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: '3vh',
    fontSize: '3vh',
  },
  image: {
    marginLeft: '15px',
  },
  button: {
    color: 'blue',
    margin: '2px',
    display: 'flex',
  },
  mainPage: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000011',
    overFlowY: 'hidden',
    alignItems: 'center'
  },
  getAudioDiv: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: '10vh',
    maxHeight: '10vh',
    width: '30%',
    backgroundColor: 'inherit',
    alignItems: 'center',
    justifyContent: 'center'
  },
  getAudioCaption: {
    marginleft: '2vh',
    color: '#f3f3f3',
    fontSize: '3vh'
  },
  audioContainer: {
    marginTop: '7vh',
    width: '50%',
    height: '40vh',
    overflow: 'auto',
    backgroundColor: 'inherit',
  },
  audioDock: {
    height: '10vh',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
    marginTop: '5vh'
  }

}));