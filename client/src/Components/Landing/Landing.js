import React from 'react';

const Landing = () => {
    return (
        <div className="landing page">
            <div className="mt-5">
                Landing

                <form action='/api/images' method="post" encType="multipart/form-data">
                    <input type='file' name='image' />
                    <input type="submit" />>
                </form>
            </div>
        </div>
    );
};

export default Landing;