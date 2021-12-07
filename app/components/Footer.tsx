import { Link } from 'remix';

type FooterProps = {
    userName: string | null;
};

export default function Footer({ userName }: FooterProps) {
    return (
        <footer className="footer">
            {userName ? (
                <div className="user-info">
                    <span>{`Hei, ${userName}`}</span>
                    <div>
                        <form action="/logout" method="post">
                            <button type="submit" className="button-link">
                                Logg ut
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <Link to="/login">Logg inn </Link>
            )}
            <p> Data fra https://norway-power.ffail.win </p>
        </footer>
    );
}
