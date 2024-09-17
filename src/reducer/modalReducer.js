export const modalReducer = (state, { type, payload }) => {
    switch (type) {
      case "OPEN_SIGNIN_MODAL":
        return {
          ...state,
          isSignUpModalOpen :false,
          isSignInModalOpen: true
        };
      case "OPEN_SIGNUP_MODAL":
        return {
          ...state,
          isSignUpModalOpen : true,
          isSignInModalOpen:false 
        };

      case "OPEN_SUCCESS_MODAL":
        return{
          ...state,
          isSignUpSuccessfull:!state.isSignUpSuccessfull
        }
      default:
        return state;
    }
  };
  