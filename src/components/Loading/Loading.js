import  ReactDOM  from 'react-dom';
import loaderImg from '../../assets/loader.gif';

const Loading = () => {
  
    return ReactDOM.createPortal(
    
        <div className="wrapper">
            <div className="loading">
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>,
    
        document.getElementById('loading')
    )
        
    }

    export default Loading