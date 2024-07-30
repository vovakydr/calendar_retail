// src/styles/LeaderSelectionModalStyles.js

export const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      maxWidth: '600px',
      height: 'auto',
      maxHeight: '80%',
      padding: '20px',
      backgroundColor: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      zIndex: 1001,
    },
  };

  export const customStyles2 = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '1200px',
      height: 'auto',
      maxHeight: '80%',
      padding: '20px',
      backgroundColor: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      zIndex: 1001,
    },
  };
  
  export const modalContent = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '80%',
    padding: '20px',
    backgroundColor: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    zIndex: 1001,
  };
  // Additional styles for the modal components
  export const modalHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  export const closeButton = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
};
  
export const searchBar = {
    display: 'block',
    width: '100%',
    marginTop: '20px',
};
  
export const searchInput = {
    display: 'block',
    width: '100%',
    marginRight: '10px',
    padding: '8px',
};;
  
  export const searchButton = {
    padding: '10px',
    border: 'none',
    backgroundColor: '#C00000',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
  };
  
  export const leaderList = {
    marginTop: '10px',
    listStyle: 'none',
    padding: '0',
    maxHeight: '200px',
    overflowY: 'auto',
    borderTop: '1px solid #C00000',
    paddingTop: '10px',
};
  
export const leaderListItem = {
    padding: '8px',
    cursor: 'pointer',
};
  
export const leaderListItemHover = {
    backgroundColor: '#f0f0f0',
};

export const errorMessageCss = {
  border: '2px solid red',
  borderRadius: '10px',
  padding: '10px',
  margin: '10px',
  textAlign: 'center',
  color: 'red',
  fontSize: '1.2em',
  fontWeight: '700',
}

export const employeeSearch = {
  border: '0',
  height: '31px',
  display: 'flex',
  borderRadius: '.75rem',
  alignItems: 'center',
  padding: '.75rem',
  margin: '0.3rem .25rem',
  verticalAlign: 'middle',
  width: '40%',
  backgroundColor: '#e9ecf1',
  cursor: 'pointer',
}

export const employeeResult = {
  display: 'inline-block',
  border: '0',
  height: '31px',
  borderRadius: '.75rem',
  padding: '.75rem',
  margin: '0.3rem .25rem',
  backgroundColor: '#e9ecf1',
  cursor: 'pointer',
}

export const employeeResultContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Располагает текст и кнопку по краям
  height: '100%',
}

export const employeeResultText = {
  marginRight: '0.5rem', // Отступ между текстом и кнопкой
}

export const employeeDelButton = {
  border: '0',
}

export const excelButton = {
  display: 'inline-flex',
  padding: '0.7rem 1.5rem',
  borderRadius: '.75rem',
  cursor: 'pointer',
  backgroundColor: '#e40038',
  color: "#fff",
  border: '0',
}
  