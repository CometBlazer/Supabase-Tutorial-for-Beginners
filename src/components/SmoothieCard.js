const SmoothieCard = ({ smoothie }) => {
    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">     
                <p>{smoothie.rating} Stars</p>
            </div>

        </div>
    )
}

export default SmoothieCard