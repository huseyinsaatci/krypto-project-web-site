import './style.css';
import coin_image from './coin_img.jpg';

function MobileappStand() {
    return (
        <section className="">
            <img className="img-fluid rounded" src={coin_image} alt="Coin Represention"></img>
        </section>
    );
}

export default MobileappStand;