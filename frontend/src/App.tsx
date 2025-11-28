import { useEffect, useState } from 'react';
import { login, register, logout, getToken } from './services/auth';
import { getItems, createItem, updateItem, deleteItem, type Item } from './services/items';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [nombreItem, setNombreItem] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

    useEffect(() => {
        const fetchItems = async () => {
            if (isLoggedIn) {
                try {
                    setIsLoading(true);
                    const items = await getItems();
                    setItems(Array.isArray(items) ? items : []);
                } catch (err) {
                    setError('Error al cargar los items');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchItems();
    }, [isLoggedIn]);

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await register(nombreUsuario, email, password);
            alert('Registro exitoso. Por favor inicia sesión.');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error en el registro');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await login(email, password);
            setIsLoggedIn(true);
        } catch (error) {
            setError('Credenciales incorrectas');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setItems([]);
    };

    const handleCreateItem = async () => {
        if (!nombreItem.trim()) {
            setError('El nombre del item no puede estar vacío');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            const newItem = await createItem(nombreItem);
            setItems(prevItems => [...prevItems, newItem]);
            setNombreItem('');
        } catch (error) {
            setError('Error al crear el item');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateItem = async (id: string, nuevoNombre: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedItem = await updateItem(id, nuevoNombre);
            setItems(prevItems =>
                prevItems.map(item => item._id === id ? updatedItem : item)
            );
        } catch (error) {
            setError('Error al actualizar el item');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!window.confirm('¿Estás seguro de eliminar este item?')) return;
        try {
            setIsLoading(true);
            setError(null);
            await deleteItem(id);
            setItems(prevItems => prevItems.filter(item => item._id !== id));
        } catch (error) {
            setError('Error al eliminar el item');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid bg-dark text-light min-vh-100 py-4">
            <h1 className="text-center mb-4 animate__animated animate__fadeIn">Gestión de Items</h1>

            {error && (
                <div className="alert alert-danger d-flex justify-content-between animate__animated animate__fadeIn">
                    <span>{error}</span>
                    <button className="btn btn-sm btn-light" onClick={() => setError(null)}>Cerrar</button>
                </div>
            )}

            {isLoading && (
                <div className="d-flex justify-content-center my-3 animate__animated animate__fadeIn">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            )}

            {!isLoggedIn ? (
                <div className="row">
                    <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft">
                        <h2>Registro</h2>
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Nombre" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} disabled={isLoading} />
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
                        <button className="btn btn-primary w-100" onClick={handleRegister} disabled={isLoading}>
                            {isLoading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>

                    <div className="col-md-6 mb-4 animate__animated animate__fadeInRight">
                        <h2>Login</h2>
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
                        <button className="btn btn-success w-100" onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? 'Iniciando sesión...' : 'Login'}
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button className="btn btn-secondary mb-3 animate__animated animate__fadeIn" onClick={handleLogout} disabled={isLoading}>
                        Cerrar sesión
                    </button>

                    <div className="mb-4 animate__animated animate__fadeInUp">
                        <h2>Crear Item</h2>
                        <input className="form-control mb-2 bg-secondary text-light" placeholder="Nombre del item" value={nombreItem} onChange={e => setNombreItem(e.target.value)} disabled={isLoading} onKeyPress={e => e.key === 'Enter' && handleCreateItem()} />
                        <button className="btn btn-primary" onClick={handleCreateItem} disabled={!nombreItem.trim() || isLoading}>
                            {isLoading ? 'Agregando...' : 'Agregar'}
                        </button>
                    </div>

                    <h2 className="animate__animated animate__fadeIn">Mis Items</h2>
                    {items.length === 0 ? (
                        <p>No hay items aún. ¡Crea uno nuevo!</p>
                    ) : (
                        <ul className="list-group">
                            {items.map(item => (
                                <li key={item._id} className="list-group-item bg-secondary text-light d-flex justify-content-between align-items-center animate__animated animate__fadeIn">
                                    <input
                                        type="text"
                                        defaultValue={item.nombre}
                                        className="form-control me-2 bg-dark text-light"
                                        onBlur={(e) => {
                                            const nuevoNombre = e.target.value.trim();
                                            if (nuevoNombre && nuevoNombre !== item.nombre) {
                                                handleUpdateItem(item._id, nuevoNombre);
                                            }
                                        }}
                                        disabled={isLoading}
                                    />
                                    <button className="btn btn-danger btn-sm animate__animated animate__fadeIn" onClick={() => handleDeleteItem(item._id)} disabled={isLoading}>
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
