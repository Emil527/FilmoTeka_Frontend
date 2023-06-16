import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export const Login = () => {
	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	});

	const onSubmit = async values => {
		const data = await dispatch(fetchAuth(values));
		console.log(data);
		if (!data.payload) {
			return alert('Не удалось авторизоваться!');
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label='E-Mail'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Укажите почту' })}
					fullWidth
				/>
				<TextField
					type={values.showPassword ? 'text' : 'password'}
					className={styles.field}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', { required: 'Укажите пароль' })}
					label='Пароль'
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
