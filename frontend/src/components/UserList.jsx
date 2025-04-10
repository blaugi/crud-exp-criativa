import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import Notification from './Notification';
import '../styles/Components.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            showNotification('Erro ao carregar usuários', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
                showNotification('Usuário excluído com sucesso', 'success');
            } catch (error) {
                showNotification('Erro ao excluir usuário', 'error');
            }
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading) {
        return <div className="container">Carregando...</div>;
    }

    return (
        <div className="container">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="page-header">
            <h1>Lista de Usuários - Matheus Girardi</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={fetchUsers} 
                    className="btn btn-secondary"
                    disabled={loading}
                >
                    {loading ? 'Atualizando...' : 'Atualizar'}
                    </button>
                    <Link to="/users/new" className="btn btn-primary">
                        Novo Usuário
                    </Link>
                </div>
            </div>

            {users.length === 0 ? (
                <div className="card">
                    <p>Nenhum usuário encontrado.</p>
                </div>
            ) : (
                <div className="card">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ano Nasc.</th>
                                <th>Gênero</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.anoNascimento}</td>
                                    <td>{user.genero}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.email}</td>
                                    <td className="action-buttons">
                                        <Link to={`/users/${user.id}`} className="btn btn-secondary">
                                            Ver
                                        </Link>
                                        <Link to={`/users/edit/${user.id}`} className="btn btn-primary">
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="btn btn-danger"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;