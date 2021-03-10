import './style.css';

function Footer() {
    return (
        <footer className="footer font">
            <div className="container-md py-3">
                <div className="pb-2 mb-2 border-bottom border-white border-3">
                    <div className="row">
                        <div className="col">
                            <span className="fs-3 text-decoration-underline">About Us</span>
                            <p className="mt-3 fs-4_5 lh-base">Krypto-Project is a project that displays the most used crypto currency values.<br /> This project is developed by three students and you can contact them with their contact informations.</p>
                        </div>
                        <div className="list-group col-3">
                            <ul>
                                <li className="fs-3 mb-2 text-decoration-underline" key="0">Contact Us</li>
                                <li key="1"><span className="fs-4_5">Ozan Uslan</span> <a href="https://github.com/ozanuslan" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x m-1" ></i></a><a href="https://www.linkedin.com/in/ozan-uslan-5611461a0" target="_blank" rel="noreferrer"><i className="fab fa-linkedin fa-2x m-1"></i></a></li>
                                <li key="2"><span className="fs-4_5">Oğuz Akif Tüfekçioğlu</span> <a href="https://github.com/oguzakif" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x m-1" ></i></a> <a href="https://www.linkedin.com/in/oğuz-akif-tüfekcioğlu-123bb2197" target="_blank" rel="noreferrer"><i className="fab fa-linkedin fa-2x m-1"></i></a></li>
                                <li key="3"><span className="fs-4_5">Hüseyin Saatçi</span> <a href="https://github.com/huseyinsaatci" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x m-1" ></i></a> <a href="https://www.linkedin.com/in/huseyin-saatci" target="_blank" rel="noreferrer"><i className="fab fa-linkedin fa-2x m-1"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright lh-base">
                    <div className="row">
                        <div className="col">
                            <p className="fs-5">Krypto-Project </p>
                            <p >Copyright &copy; {new Date().getFullYear()}</p>
                        </div>
                        <div className="col text-end">
                            <p>TradingView Lightweight Charts</p>
                            <a href="https://www.tradingview.com">Copyright (с) {new Date().getFullYear()} TradingView, Inc.</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;