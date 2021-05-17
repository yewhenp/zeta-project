const styles = {
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  button: {
    padding: 0,
  },
  upVote: {
    width: 0,
    height: 0,
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: '20px solid #cecece',
  },
  downVote: {
    width: 0,
    height: 0,
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderTop: '20px solid #cecece',
  },
  count: {
    borderColor: 'transparent',
    fontSize: '20px',
    color: 'red',
  },
}

export default styles
