import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="ログイン" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='mx-10'>
                <div className="text-4xl mt-8 mb-10">
                    ログイン
                </div>

                <form onSubmit={submit}>
                    <div className='flex justify-between items-center'>
                        <InputLabel className='text-xl' htmlFor="email" value="メールアドレス" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-96 text-xl"
                            autoComplete="username"
                            isFocused={true}
                            onChange={handleOnChange}
                            placeholder="テキストを追加"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex justify-between mt-10 items-center">
                        <InputLabel className='text-xl' htmlFor="password" value="パスワード" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-96 text-xl"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                            placeholder="テキストを追加"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />

                    <div className="block mt-10">
                        <div className="flex items-center">
                            <Checkbox  
                                className="flex items-center focus:ring-transparent" 
                                name="remember" 
                                value={data.remember} 
                                onChange={handleOnChange}
                            />
                            <span className="ml-2 text-lg text-gray-600">ログインしたままにする</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-end my-5">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline underline-offset-8 decoration-blue-400 text-xl text-blue-700 hover:text-gray-700 hover:decoration-gray-400"
                            >
                                パスワードをお忘れの場合
                            </Link>
                        )}

                        <PrimaryButton className="ml-10 w-48" disabled={processing}>
                            <span className='text-lg m-auto leading-10'>ログイン</span>
                        </PrimaryButton>
                    </div>

                    <SecondaryButton 
                        className="my-10 px-0 py-0 w-full border-solid border-2 border-blue-500"
                        style={{padding:'0px'}}
                    >
                        <Link 
                            className='text-lg leading-10 py-4 w-full text-blue-700' 
                            href={route('register')}
                        >
                            ユーザ登録する
                        </Link>
                    </SecondaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
