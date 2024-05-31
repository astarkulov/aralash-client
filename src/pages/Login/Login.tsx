import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const loginSchema = z
    .object({
        username: z
            .string()
            .min(2, {message: 'Имя пользователя слишком короткое'})
            .max(20, 'Имя пользователя слишком длинное')
            .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
        password: z.string().min(6, 'Пароль слишком короткий'),
    });

type FormSchema = z.infer<typeof loginSchema>

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: {isDirty, isSubmitting, errors},
    } = useForm<FormSchema>({resolver: zodResolver(loginSchema)})

    const navigate = useNavigate();

    // обработчик отправки формы
    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        // просто выводим данные в консоль
        console.log(data)
        // сбрасываем состояние формы (очищаем поля)
        reset()
    }

    useEffect(() => {
        // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
        setFocus('username')
    }, [])

    return (
        <section className='bg-gray-50'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='title'>Вход</h1>
                        <form className='space-y-7' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4'>
                                <label htmlFor='username' className='label'>
                                    Имя пользователя *
                                </label>
                                <input
                                    {...register('username')}
                                    type='text'
                                    id='username'
                                    className='input'
                                    placeholder='Ваше имя'
                                    aria-invalid={errors.username ? 'true' : 'false'}
                                />
                                {errors.username && (
                                    <span role='alert' className='error'>
                    {errors.username?.message}
                  </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor='password' className='label'>
                                    Пароль *
                                </label>
                                <input
                                    {...register('password')}
                                    type='password'
                                    id='password'
                                    placeholder=''
                                    className='input'
                                    aria-invalid={errors.password ? 'true' : 'false'}
                                />
                                {errors.password && (
                                    <span role='alert' className='error'>
                    {errors.password?.message}
                  </span>
                                )}
                            </div>
                            <div className='flex gap-5 justify-center pt-2'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={!isDirty || isSubmitting}
                                >
                                    Войти
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-classic'
                                    disabled={!isDirty || isSubmitting}
                                    onClick={() => navigate('/register')}
                                >
                                    Еще нет аккаунта?
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;