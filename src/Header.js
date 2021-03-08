import './style.css';

function Header() {
    return (
        <header className="font container py-3">
            <div className="row text-center">

                <div className="col-1 align-middle">
                    <button type="button" className="btn btn-dark btn-lg">
                        <a href="/">Home</a>
                    </button>
                </div>

                <div className="col-11 text-center">
                    <span className="fs-1">
                        Welcome to the Krypto Project
                    </span>

                </div>

            </div>
        </header>
    );
}

export default Header;