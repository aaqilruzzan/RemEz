
import './WelcomeVideo.css';

const WelcomeVideo = () => {
    

    return (
        <div className="welcome-video-container">
            <video autoPlay muted loop width="680" height="400" overflow="hidden">
                <source src="/loading.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default WelcomeVideo;
