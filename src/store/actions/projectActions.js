export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      //get profile info to assign it to the project
      const userId = getState().firebase.auth.uid;
      const userInfo = getState().firebase.profile;

      firestore.collection('projects').add({
        ...project,
        authorFirstName: userInfo.firstName,
        authorLastName: userInfo.lastName,
        authorId: userId,
        createdAt: new Date()
      }).then( ()=>{
          dispatch({ type: 'CREATE_PROJECT', project });
      }).catch( (err)=>{
          dispatch({type: 'CREATE_PROJECT_ERR', err})
      })
    }
  };