import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="ユーザ登録" />

            <div className='mx-10'>
                <div className="text-4xl mt-8 mb-10">
                    ユーザ登録
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel className='text-xl' htmlFor="name" value="氏名" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full text-xl"
                            autoComplete="name"
                            isFocused={true}
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel className='text-xl' htmlFor="email" value="メールアドレス" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full text-xl"
                            autoComplete="username"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel className='text-xl' htmlFor="password" value="パスワード" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full text-xl"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel className='text-xl' htmlFor="password_confirmation" value="パスワードを再入力" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full text-xl"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end my-10">
                        <PrimaryButton className="w-48" disabled={processing}>
                            <span className='text-lg m-auto leading-10'>登録</span>
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
