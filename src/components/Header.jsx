function Header({name = 'Mahek'}) {
    return (
    <header className="header">
        <h1>
        {name}'s Portfolio
        </h1>
    </header>
    );
}

export default Header;