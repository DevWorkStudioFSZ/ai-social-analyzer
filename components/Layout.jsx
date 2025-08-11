export default function Layout({ children }) {
  return (
    <>
      {/* *********************Navbar ********/}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand d-flex align-items-center" href="/">
      <img src="/logo.png" alt="MarketMate Logo" width="60" height="60" className="me-4 rounded" />
      <span className="fs-4">MarketMate</span>
    </a>

    <div className="d-flex">
      <a className="nav-link text-white me-4" href="#about">About</a>
      <a className="nav-link text-white me-4" href="#contact">Contact</a>
    </div>
  </div>
</nav>



      {/* *************Main Content **************8*/}
      <main className="flex-grow-1 animated-bg py-5" style={{ minHeight: '85vh' }}>

        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container d-flex justify-content-between align-items-center">
          <span>&copy; {new Date().getFullYear()} MarketMate</span>
          

        </div>
      </footer>
    </>
  );
}




