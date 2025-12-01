import React from "react";

const Items: React.FC = () => {
    // Aquí en el futuro traerás los items desde tu API
    const items: any[] = []; // Simulación de lista vacía

    return (
        <div className="container mt-4">
            <h1>Lista de Items</h1>
    {items.length === 0 ? (
        <div className="alert alert-info mt-3">
            No hay items disponibles.
    <button className="btn btn-primary ms-3">
            ➕ Añadir nuevo
    </button>
    </div>
    ) : (
        <ul className="list-group mt-3">
            {items.map((item, index) => (
                    <li key={index} className="list-group-item">
                    {item.nombre}
                    </li>
    ))}
        </ul>
    )}
    </div>
);
};

export default Items;
