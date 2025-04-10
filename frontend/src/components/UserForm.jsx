import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../services/userService';
import Notification from './Notification';
import '../styles/Components.css';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        nome: '',
        anoNascimento: '',
        endereco: '',
        genero: '',
        cpf: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const fetchUser = async () => {
                    try {
                        setLoading(true);
                        const userData = await userService.getUser(id);
                        setFormData({
                            nome: userData.nome || '',
                            anoNascimento: userData.anoNascimento || '',
                            endereco: userData.endereco || '',
                            genero: userData.genero || '',
                            cpf: userData.cpf || '',
                        });
                    } catch (error) {
                        showNotification('Erro ao carregar dados do usuário', 'error');
                    } finally {
                        setLoading(false);
                    }
                };          

            fetchUser();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

   const validateForm = () => {
        const newErrors = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.anoNascimento) {
            newErrors.anoNascimento = 'Ano de nascimento é obrigatório';
        }
        
        if (!formData.genero.trim()) {
            newErrors.genero = 'Gênero é obrigatório';
        }
        if (formData.cpf && formData.cpf.trim()) {
            // Count only digits in CPF
            const cpfDigits = formData.cpf.replace(/\D/g, '');
            if (cpfDigits.length !== 11) {
                newErrors.cpf = 'CPF deve ter 11 dígitos';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
        setLoading(true);

        // Create a clean copy of form data (remove empty fields)
        const cleanedFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => 
                value !== null && value !== undefined && value !== ''
            )
        );

        if (isEditMode) {
            // Log the update attempt
            console.log('Attempting to update user:', id, cleanedFormData);
            await userService.updateUser(id, cleanedFormData);
            showNotification('Usuário atualizado com sucesso!', 'success');
        } else {
            await userService.createUser(cleanedFormData);
            showNotification('Usuário criado com sucesso!', 'success');
        }

        // Delay navigation to allow notification to be visible
        setTimeout(() => {
            navigate('/');
        }, 2000);
        
    } catch (error) {
        setLoading(false);
        
        // Detailed error handling
        let errorMessage = 'Erro ao processar requisição';
        
        if (error.response) {
            console.error('Server response:', error.response);
            // Try to extract useful error information
            errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Erro no servidor: ${error.response.status}`;
        }
        
        showNotification(errorMessage, 'error');
    }
};

    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    if (loading && isEditMode) {
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
                <h1>{isEditMode ? 'Editar Usuário' : 'Novo Usuário'}</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        {errors.nome && <p className="error-text">{errors.nome}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="anoNascimento">Ano de Nascimento</label>
                        <input
                            type="number"
                            id="anoNascimento"
                            name="anoNascimento"
                            value={formData.anoNascimento}
                            onChange={handleChange}
                        />
                        {errors.anoNascimento && <p className="error-text">{errors.anoNascimento}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                        {errors.endereco && <p className="error-text">{errors.endereco}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="genero">Gênero</label>
                        <input
                            type="text"
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                        />
                        {errors.genero && <p className="error-text">{errors.genero}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                        {errors.cpf && <p className="error-text">{errors.cpf}</p>}
                    </div>

                    <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : isEditMode ? 'Atualizar' : 'Salvar'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;