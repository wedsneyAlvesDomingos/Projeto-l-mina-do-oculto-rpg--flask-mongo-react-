import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppFooter from '../../componentes/Footer/Footer';
import {
    Box, Typography, Avatar, IconButton, TextField, Button,
    InputAdornment, Divider, Snackbar, Alert, CircularProgress,
    Paper, Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { colors, derived, gradients } from '../../componentes/themes/tokens';

const BASE_URL = process.env.REACT_APP_LISTEN_ADDRESS;

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

/* ── Estilos reutilizáveis ─────────────────────────────────────────────────── */
const sectionCard = {
    p: 3,
    mb: 3,
    borderRadius: '12px',
    border: `1px solid ${colors.olive}55`,
    background: 'var(--surface-paper, transparent)',
    backgroundColor: 'background.paper',
};

const sectionTitle = {
    fontFamily: '"Esteban", serif',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: colors.gold,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
};

export default function ProfilePage() {
    const storedUser  = JSON.parse(localStorage.getItem('user') || '{}');
    const userId      = storedUser?.id;

    /* ── Estado global ── */
    const [profile, setProfile] = useState({ name: '', email: '', avatar: null });
    const [loading, setLoading] = useState(true);

    /* ── Avatar ── */
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarDirty,   setAvatarDirty]   = useState(false);
    const [avatarSaving,  setAvatarSaving]  = useState(false);
    const [dragging, setDragging]           = useState(false);
    const fileInputRef = useRef(null);

    /* ── Nome ── */
    const [nameEdit,    setNameEdit]    = useState(false);
    const [nameValue,   setNameValue]   = useState('');
    const [nameSaving,  setNameSaving]  = useState(false);
    const [nameError,   setNameError]   = useState('');

    /* ── Senha ── */
    const [currentPwd,  setCurrentPwd]  = useState('');
    const [newPwd,      setNewPwd]      = useState('');
    const [confirmPwd,  setConfirmPwd]  = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew,     setShowNew]     = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pwdSaving,   setPwdSaving]   = useState(false);
    const [pwdError,    setPwdError]    = useState('');

    /* ── Snackbar ── */
    const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });
    const showSnack = (msg, severity = 'success') =>
        setSnack({ open: true, msg, severity });

    /* ── Carrega perfil ── */
    useEffect(() => {
        if (!userId) return;
        fetch(`${BASE_URL}/users/${userId}`)
            .then(r => r.json())
            .then(data => {
                setProfile(data);
                setNameValue(data.name || '');
                setAvatarPreview(data.avatar || null);
            })
            .catch(() => showSnack('Erro ao carregar perfil', 'error'))
            .finally(() => setLoading(false));
    }, [userId]);

    /* ── Drag & Drop ── */
    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        const b64 = await fileToBase64(file);
        setAvatarPreview(b64);
        setAvatarDirty(true);
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const b64 = await fileToBase64(file);
        setAvatarPreview(b64);
        setAvatarDirty(true);
    };

    /* ── Salvar avatar ── */
    const handleSaveAvatar = async () => {
        setAvatarSaving(true);
        try {
            const res = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar: avatarPreview }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao salvar avatar');

            setProfile(p => ({ ...p, avatar: data.avatar }));
            setAvatarDirty(false);
            // Sincroniza localStorage para o Navbar refletir o novo avatar
            const stored = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...stored, avatar: data.avatar }));
            window.dispatchEvent(new Event('userProfileUpdated'));
            showSnack('Avatar atualizado com sucesso!');
        } catch (err) {
            showSnack(err.message, 'error');
        } finally {
            setAvatarSaving(false);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview(null);
        setAvatarDirty(true);
    };

    /* ── Salvar nome ── */
    const handleSaveName = async () => {
        setNameError('');
        if (!nameValue.trim()) {
            setNameError('O nome não pode estar vazio');
            return;
        }
        setNameSaving(true);
        try {
            const res = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameValue.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao atualizar nome');

            setProfile(p => ({ ...p, name: data.name }));
            // Sincroniza o localStorage para o Navbar refletir a mudança
            const stored = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...stored, name: data.name }));
            window.dispatchEvent(new Event('userProfileUpdated'));
            setNameEdit(false);
            showSnack('Nome atualizado com sucesso!');
        } catch (err) {
            showSnack(err.message, 'error');
        } finally {
            setNameSaving(false);
        }
    };

    /* ── Salvar senha ── */
    const handleSavePassword = async () => {
        setPwdError('');
        if (!currentPwd || !newPwd || !confirmPwd) {
            setPwdError('Preencha todos os campos');
            return;
        }
        if (newPwd !== confirmPwd) {
            setPwdError('A nova senha e a confirmação não conferem');
            return;
        }
        if (newPwd.length < 6) {
            setPwdError('A nova senha deve ter no mínimo 6 caracteres');
            return;
        }
        setPwdSaving(true);
        try {
            const res = await fetch(`${BASE_URL}/users/${userId}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ current_password: currentPwd, new_password: newPwd }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao atualizar senha');

            setCurrentPwd('');
            setNewPwd('');
            setConfirmPwd('');
            showSnack('Senha alterada com sucesso!');
        } catch (err) {
            setPwdError(err.message);
        } finally {
            setPwdSaving(false);
        }
    };

    /* ── Render ── */
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress sx={{ color: colors.gold }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-page, transparent)',
                backgroundColor: 'background.default',
            }}
        >
            <Box sx={{ flex: 1, pt: 4, pb: 4, px: { xs: 2, sm: 4 } }}>
            {/* ── Cabeçalho ── */}
            <Box
                sx={{
                    background: gradients.header,
                    borderRadius: '12px',
                    p: { xs: 2, md: 3 },
                    mb: 4,
                    maxWidth: 720,
                    mx: 'auto',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Esteban", serif',
                        color: '#fff',
                        letterSpacing: 1,
                    }}
                >
                    Meu Perfil
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: derived.textOnDarkMuted, mt: 0.5 }}
                >
                    Gerencie suas informações pessoais
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 720, mx: 'auto' }}>

                {/* ══ Seção Avatar ══ */}
                <Paper elevation={2} sx={sectionCard}>
                    <Typography sx={sectionTitle}>
                        <PhotoCameraIcon fontSize="small" /> Avatar
                    </Typography>

                    {/* Área de drop */}
                    <Box
                        onDragOver={e => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            p: 3,
                            border: `2px dashed ${dragging ? colors.gold : colors.olive + '88'}`,
                            borderRadius: '12px',
                            transition: 'border-color 0.2s',
                            cursor: 'pointer',
                        }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Avatar
                            src={avatarPreview || undefined}
                            sx={{
                                width: 100,
                                height: 100,
                                border: `3px solid ${colors.gold}`,
                                fontSize: '2.5rem',
                                bgcolor: colors.midnight,
                                color: colors.gold,
                                pointerEvents: 'none',
                            }}
                        >
                            {!avatarPreview && (profile.name?.[0]?.toUpperCase() || '?')}
                        </Avatar>

                        <Typography
                            variant="caption"
                            sx={{ color: derived.textMuted, textAlign: 'center' }}
                        >
                            Clique ou arraste uma imagem aqui
                        </Typography>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            onClick={e => e.stopPropagation()}
                        />
                    </Box>

                    {/* Botões de ação do avatar */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                        {avatarPreview && (
                            <Tooltip title="Remover avatar">
                                <IconButton
                                    size="small"
                                    onClick={handleRemoveAvatar}
                                    sx={{ color: colors.garnet }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={avatarSaving ? <CircularProgress size={14} color="inherit" /> : <SaveIcon />}
                            disabled={!avatarDirty || avatarSaving}
                            onClick={handleSaveAvatar}
                            sx={{
                                background: colors.gold,
                                color: '#fff',
                                '&:hover': { background: colors.bronze },
                                '&:disabled': { opacity: 0.5 },
                            }}
                        >
                            Salvar avatar
                        </Button>
                    </Box>
                </Paper>

                {/* ══ Seção Nome ══ */}
                <Paper elevation={2} sx={sectionCard}>
                    <Typography sx={sectionTitle}>
                        <PersonIcon fontSize="small" /> Nome de usuário
                    </Typography>

                    {nameEdit ? (
                        <Box>
                            <TextField
                                fullWidth
                                label="Novo nome"
                                value={nameValue}
                                onChange={e => { setNameValue(e.target.value); setNameError(''); }}
                                error={!!nameError}
                                helperText={nameError}
                                variant="outlined"
                                size="small"
                                autoFocus
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<CancelIcon />}
                                    onClick={() => { setNameEdit(false); setNameValue(profile.name); setNameError(''); }}
                                    sx={{
                                        borderColor: colors.olive,
                                        color: derived.textMuted,
                                        '&:hover': { borderColor: colors.gold, color: colors.gold },
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={nameSaving ? <CircularProgress size={14} color="inherit" /> : <SaveIcon />}
                                    disabled={nameSaving}
                                    onClick={handleSaveName}
                                    sx={{
                                        background: colors.gold,
                                        color: '#fff',
                                        '&:hover': { background: colors.bronze },
                                    }}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography
                                sx={{
                                    fontFamily: '"Esteban", serif',
                                    fontSize: '1.15rem',
                                    flex: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {profile.name}
                            </Typography>
                            <Tooltip title="Editar nome">
                                <IconButton
                                    size="small"
                                    onClick={() => setNameEdit(true)}
                                    sx={{ color: colors.gold }}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    <Divider sx={{ my: 1.5, borderColor: colors.olive + '44' }} />
                    <Typography variant="caption" sx={{ color: derived.textMuted }}>
                        E-mail: {profile.email}
                    </Typography>
                </Paper>

                {/* ══ Seção Senha ══ */}
                <Paper elevation={2} sx={sectionCard}>
                    <Typography sx={sectionTitle}>
                        <LockIcon fontSize="small" /> Alterar senha
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Senha atual"
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPwd}
                            onChange={e => { setCurrentPwd(e.target.value); setPwdError(''); }}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setShowCurrent(v => !v)}>
                                            {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Nova senha"
                            type={showNew ? 'text' : 'password'}
                            value={newPwd}
                            onChange={e => { setNewPwd(e.target.value); setPwdError(''); }}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setShowNew(v => !v)}>
                                            {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirmar nova senha"
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPwd}
                            onChange={e => { setConfirmPwd(e.target.value); setPwdError(''); }}
                            error={!!pwdError}
                            helperText={pwdError}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setShowConfirm(v => !v)}>
                                            {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={pwdSaving ? <CircularProgress size={14} color="inherit" /> : <LockIcon />}
                            disabled={pwdSaving || (!currentPwd && !newPwd && !confirmPwd)}
                            onClick={handleSavePassword}
                            sx={{
                                background: colors.midnight,
                                border: `1px solid ${colors.olive}`,
                                color: '#fff',
                                '&:hover': { background: colors.moss },
                                '&:disabled': { opacity: 0.5 },
                            }}
                        >
                            Alterar senha
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* ── Snackbar global ── */}
            <Snackbar
                open={snack.open}
                autoHideDuration={4000}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnack(s => ({ ...s, open: false }))}
                    severity={snack.severity}
                    variant="filled"
                    sx={{ fontFamily: '"Esteban", serif' }}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
            </Box>{/* end inner padded Box */}
            <AppFooter />
        </Box>
    );
}
