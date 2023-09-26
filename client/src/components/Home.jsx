import React from 'react';

function Home() {
    return (
        <div className="container mt-5">

            {/* Hero Section */}
            <header className="mb-4 text-center">
                <h1>FamConnect</h1>
                <p>Together, No Matter the Miles</p>
                <button className="btn btn-primary">Sign in <i className="bi bi-person-fill"></i></button>
            </header>

            {/* Three Columns Features Section */}
            <section className="row mb-4">
                <div className="col-md-4">
                    <h2>Feature 1</h2>
                    <p>Some description about this feature.</p>
                </div>
                <div className="col-md-4">
                    <h2>Feature 2</h2>
                    <p>Some description about this feature.</p>
                </div>
                <div className="col-md-4">
                    <h2>Feature 3</h2>
                    <p>Some description about this feature.</p>
                </div>
            </section>

            {/* Full-width Call-to-action */}
            <section className="bg-light p-4 rounded mb-4">
                <h2>Join us now!</h2>
                <p>Don't miss out on our special offers for new members. Register today.</p>
                <button className="btn btn-success">Sign Up</button>
            </section>

            {/* Footer */}
            <footer>
                <p>&copy; 2023 My Website. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default Home;
