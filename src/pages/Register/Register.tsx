import {z} from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../store/api/authApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";

const formSchema = z
    .object({
        username: z
            .string()
            .min(2, {message: 'Имя пользователя слишком короткое'})
            .max(20, 'Имя пользователя слишком длинное')
            .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
        password: z.string().min(6, 'Пароль слишком короткий'),
        lastname: z.string(),
        firstname: z.string(),
        patronymic: z.string(),
        confirmPassword: z.string().min(6, 'Повторите пароль'),
        terms: z.literal(true, {
            errorMap: () => ({message: 'Примите условия использования'}),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Введенные пароли не совпадают',
    })

type FormSchema = z.infer<typeof formSchema>

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: {isDirty, isSubmitting, errors},
    } = useForm<FormSchema>({resolver: zodResolver(formSchema)})

    const [registerUser, {isLoading: registerLoading, reset: registerReset}] = useRegisterMutation();

    const navigate = useNavigate()

    // обработчик отправки формы
    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        registerUser(data)
        registerReset();
        reset()
    }

    useEffect(() => {
        // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
        setFocus('username')
    }, [])

    if(registerLoading) {
        return <Loader/>
    }

    return (
        <section className='bg-gray-50'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='title'>Создание аккаунта</h1>
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
                                <label htmlFor='firstname' className='label'>
                                    Имя
                                </label>
                                <input
                                    {...register('firstname')}
                                    type='firstname'
                                    id='firstname'
                                    className='input'
                                    aria-invalid={errors.firstname ? 'true' : 'false'}
                                />
                                {errors.firstname && (
                                    <span role='alert' className='error'>
                    {errors.firstname?.message}
                  </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor='lastname' className='label'>
                                    Фамилия
                                </label>
                                <input
                                    {...register('lastname')}
                                    type='lastname'
                                    id='lastname'
                                    className='input'
                                    aria-invalid={errors.lastname ? 'true' : 'false'}
                                />
                                {errors.lastname && (
                                    <span role='alert' className='error'>
                    {errors.lastname?.message}
                  </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor='patronymic' className='label'>
                                    Отчество
                                </label>
                                <input
                                    {...register('patronymic')}
                                    type='patronymic'
                                    id='patronymic'
                                    className='input'
                                    aria-invalid={errors.patronymic ? 'true' : 'false'}
                                />
                                {errors.patronymic && (
                                    <span role='alert' className='error'>
                    {errors.patronymic?.message}
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
                                    placeholder='Не менее 6 символов'
                                    className='input'
                                    aria-invalid={errors.password ? 'true' : 'false'}
                                />
                                {errors.password && (
                                    <span role='alert' className='error'>
                    {errors.password?.message}
                  </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor='confirmPassword' className='label'>
                                    Подтверждение пароля *
                                </label>
                                <input
                                    {...register('confirmPassword')}
                                    type='password'
                                    id='confirmPassword'
                                    placeholder='Не менее 6 символов'
                                    className='input'
                                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                                />
                                {errors.confirmPassword && (
                                    <span role='alert' className='error'>
                    {errors.confirmPassword?.message}
                  </span>
                                )}
                            </div>
                            <div className='flex items-center relative'>
                                <input
                                    {...register('terms')}
                                    id='terms'
                                    aria-describedby='terms'
                                    type='checkbox'
                                    className='w-4 h-4 border border-gray-300 bg-gray-50 accent-primary-500 focus:outline-2 focus:outline-primary-500 outline-none'
                                    aria-invalid={errors.terms ? 'true' : 'false'}
                                />
                                <label
                                    htmlFor='terms'
                                    className='font-light text-gray-500 text-sm ml-3 cursor-pointer select-none'
                                >
                                    Я принимаю{' '}
                                    <a
                                        className='font-medium text-primary-500 hover:text-primary-700 focus:text-primary-700 transition-colors outline-none'
                                        href='#'
                                    >
                                        Условия использования
                                    </a>
                                </label>
                                {errors.terms && (
                                    <span className='error top-5'>{errors.terms?.message}</span>
                                )}
                            </div>
                            <div className='flex gap-5 justify-center pt-2'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={!isDirty || isSubmitting}
                                >
                                    Создать аккаунт
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-classic'
                                    disabled={!isDirty || isSubmitting}
                                    onClick={() => navigate('/login')}
                                >
                                    Уже есть аккаунт?
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;