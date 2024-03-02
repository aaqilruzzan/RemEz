import React from 'react';


const WelcomeVideo = () => {
    
    return (
        <div>
            
            <video autoPlay muted loop width="50%">
                <source src="/loading.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default WelcomeVideo;
