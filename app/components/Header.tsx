import { Link } from 'remix';

export default function Header() {
    return (
        <header className="app-header">
            <Link to="/" className="app-logo">
                <h1>
                    <span className="app-logo-lines"></span>
                    <span className="app-logo-text">
                        Str<span className="lightning">⚡</span>mpris
                    </span>
                    <span className="app-logo-lines"></span>
                </h1>
            </Link>
            <p className="slogan"> Planlegg ditt strømforbruk </p>
        </header>
    );
}
