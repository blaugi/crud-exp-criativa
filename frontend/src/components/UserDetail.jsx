import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import userService from '../services/userService';
import Notification from './Notification';
import '../styles/Components.css';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await userService.getUser(id);
                setUser(userData);
            } catch (error) {
                showNotification('Erro ao carregar informações do usuário', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await userService.deleteUser(id);
                showNotification('Usuário excluído com sucesso', 'success');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                showNotification('Erro ao excluir usuário', 'error');
            }
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    if (loading) {
        return <div className="container">Carregando...</div>;
    }

    if (!user) {
        return (
            <div className="container">
                <div className="card">
                    <p>Usuário não encontrado</p>
                    <Link to="/" className="btn btn-primary">Voltar à Lista</Link>
                </div>
            </div>
        );
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
                <h1>Detalhes do Usuário</h1>
                <div className="action-buttons">
                    <Link to="/" className="btn btn-secondary">
                        Voltar
                    </Link>
                    <Link to={`/users/edit/${id}`} className="btn btn-primary">
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                    >
                        Excluir
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="detail-item">
                    <div className="detail-label">ID</div>
                    <div className="detail-value">{user.id}</div>
                </div>

                <div className="detail-item">
                    <div className="detail-label">Nome</div>
                    <div className="detail-value">{user.nome}</div>
                </div>

                <div className="detail-item">
                    <div className="detail-label">Ano de Nascimento</div>
                    <div className="detail-value">{user.anoNascimento}</div>
                </div>

                <div className="detail-item">
                    <div className="detail-label">Endereço</div>
                    <div className="detail-value">{user.endereco}</div>
                </div>

                <div className="detail-item">
                    <div className="detail-label">Gênero</div>
                    <div className="detail-value">{user.genero}</div>
                </div>

                <div className="detail-item">
                    <div className="detail-label">CPF</div>
                    <div className="detail-value">{user.cpf}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;