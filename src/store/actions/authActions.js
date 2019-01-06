//SIGN IN ACTION
export const signIn = (cords)=>{
    return (dispatch, getState, { getFirebase }) =>{
        const firebase = getFirebase();
        //get data first
        firebase.auth().signInWithEmailAndPassword(
            cords.email,
            cords.password
        ).then(()=>{
            dispatch({ type: 'SIGN_IN_SUCCESS' })
        }).catch((err)=>{
            dispatch({ type: 'SIGN_IN_ERR', err });
        })
    }
}
//SIGN OUT ACTION
export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' })
      }).catch((err)=>{
        dispatch({type:'LOGOUT_FAILED'})
    });
    }
  }
//SIGN UP ACTION
    export const signUp = (newUser) => {
        return (dispatch, getState, {getFirebase, getFirestore}) => {
          const firebase = getFirebase();
          const firestore = getFirestore();
      
          firebase.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password
          ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              initials: newUser.firstName[0] + newUser.lastName[0]
            });
          }).then(() => {
            dispatch({ type: 'SIGN_UP_SUCCESS' });
          }).catch((err) => {
            dispatch({ type: 'SIGN_UP_FAILED', err});
          });
        }
      }