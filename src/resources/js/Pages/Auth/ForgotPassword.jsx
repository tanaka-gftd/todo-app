import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className='mx-5'>
                <div className="text-4xl mt-8 mb-10">
                    パスワードの再設定
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <div className='flex justify-between items-center'>
                        <InputLabel className='text-xl' htmlFor="email" value="メールアドレス" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-96 text-xl"
                            isFocused={true}
                            onChange={onHandleChange}
                            placeholder="テキストを追加"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />

                    <PrimaryButton 
                        className="mt-20 mb-14 border-solid border-2 border-blue-400 w-full" 
                        disabled={processing}
                    >
                        <div className='text-lg leading-10 p-1 w-full'>
                            パスワード再設定リンクを送信
                        </div>
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
