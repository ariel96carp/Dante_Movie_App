const RouteLoader = () => {
    const renderCircles = () => {
        const circles = []
        for (let i = 0; i <= 11; i++) {
            circles.push(
                <div
                    key={i}
                    className="absolute top-0 left-0 w-full h-full rotate-[calc(30deg*var(--num))]"
                    style={{ '--num': i }}
                >
                    <div className="loader-animation" />
                </div>
            )
        }

        return circles
    }
    return (
        <div
            className="w-full h-[100vh] flex items-center justify-center"
        >
            <div className="w-16 h-16 relative">
                {renderCircles()}
            </div>
        </div>
    )
}

export default RouteLoader
