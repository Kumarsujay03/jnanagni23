import React from 'react';

const Header = () => {
    const videoUrl = "https://firebasestorage.googleapis.com/v0/b/jnanagni-react-ee7df.appspot.com/o/video%2Fbackground_video.mp4?alt=media&token=73a7291a-3e56-4e73-8be0-0f4e163d67d9";

    return (
        <>
            <header>
                <div className="relative inset-x-0 overflow-hidden">
                    {/* Use the videoUrl in the <video> tag to embed the video */}
                    <video
                        autoPlay
                        loop
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ position: 'fixed', width: '100%', height: '100vh', objectFit: 'cover', zIndex: -1, opacity: 0.3 }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
            </header>
        </>
    );
};

export default Header;
