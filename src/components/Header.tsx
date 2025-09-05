import React from 'react';

const Header = () => {
    const videoUrl = "https://res.cloudinary.com/dse70o2yh/video/upload/f_auto:video,q_auto/fg64mnchurwji2nqvswt";

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
