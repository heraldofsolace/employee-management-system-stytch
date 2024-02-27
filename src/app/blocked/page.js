const BlockedPage = () => {
    return (
        <div className="hero min-h-[calc(100vh-60px)] bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-mono">Blocked Request</h1>
                    <p className="py-6">This action is currently blocked. Please contact support.</p>
                    <a href="/">
                    <button className="btn btn-primary">Go Home</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BlockedPage;
